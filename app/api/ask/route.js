// app/api/ask/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retry function with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      if (error.status === 503 || error.status === 429 || error.message?.includes('overloaded')) {
        const delay = baseDelay * Math.pow(2, i);
        console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// Function to format conversation history for the AI
function formatConversationHistory(messages) {
  if (!messages || messages.length === 0) return "";
  
  // Take last 10 messages to avoid token limits but maintain context
  const recentMessages = messages.slice(-10);
  
  return recentMessages
    .map(msg => `${msg.sender === 'user' ? 'Student' : 'Assistant'}: ${msg.text}`)
    .join('\n');
}

// Enhanced system prompt for better responses
function createSystemPrompt(conversationHistory, currentQuestion) {
  return `You are an advanced Academic Assistant with expertise across multiple disciplines. Your role is to provide comprehensive, well-researched, and detailed responses that help students truly understand concepts.

RESPONSE GUIDELINES:
1. **Comprehensive Coverage**: Provide detailed explanations that cover multiple aspects of the topic
2. **Multiple Perspectives**: When relevant, present different viewpoints, theories, or approaches
3. **Practical Examples**: Include real-world examples, case studies, or analogies to illustrate concepts
4. **Structured Response**: Organize your answer with clear sections, bullet points, or numbered lists when appropriate
5. **Context Awareness**: Reference previous parts of our conversation when relevant
6. **Academic Depth**: Go beyond surface-level answers - explain the 'why' and 'how', not just the 'what'
7. **Source Diversity**: Draw from various academic fields, historical context, current research, and practical applications
8. **Critical Thinking**: Encourage analytical thinking by presenting contrasting views or asking thought-provoking questions

CONVERSATION CONTEXT:
${conversationHistory ? `Previous conversation:\n${conversationHistory}\n` : 'This is the start of our conversation.\n'}

CURRENT QUESTION: ${currentQuestion}

Provide a thorough, educational response that demonstrates deep understanding and helps the student learn comprehensively. If the question builds on our previous discussion, acknowledge that connection and build upon it.`;
}

export async function POST(request) {
  try {
    const { question, conversationHistory } = await request.json();

    if (!question) {
      return NextResponse.json({ message: 'Question is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json({ message: 'API configuration error' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7, // Balanced creativity and consistency
        topP: 0.9,        // Allow for diverse vocabulary
        topK: 40,
        maxOutputTokens: 2048, // Increased for detailed responses
      }
    });

    // Create enhanced prompt with conversation context
    const conversationContext = formatConversationHistory(conversationHistory);
    const enhancedPrompt = createSystemPrompt(conversationContext, question);

    // Use retry logic for the API call
    const result = await retryWithBackoff(async () => {
      return await model.generateContent(enhancedPrompt);
    });

    const response = await result.response;
    const text = response.text();

    if (!text || text.trim() === '') {
      return NextResponse.json({ 
        answer: 'I apologize, but I couldn\'t generate a proper response. Please try rephrasing your question, and I\'ll provide a comprehensive answer.' 
      }, { status: 200 });
    }

    return NextResponse.json({ answer: text }, { status: 200 });
    
  } catch (error) {
    console.error('API Error:', error);

    // Handle specific error types
    if (error.status === 503) {
      return NextResponse.json({ 
        message: 'The AI service is temporarily overloaded. Please try again in a moment.' 
      }, { status: 503 });
    }
    
    if (error.status === 429) {
      return NextResponse.json({ 
        message: 'Too many requests. Please wait a moment before trying again.' 
      }, { status: 429 });
    }

    if (error.status === 400) {
      return NextResponse.json({ 
        message: 'Invalid request. Please check your question and try again.' 
      }, { status: 400 });
    }

    if (error.status === 401 || error.status === 403) {
      return NextResponse.json({ 
        message: 'Authentication error. Please check API configuration.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Failed to generate response. Please try again later.' 
    }, { status: 500 });
  }
}