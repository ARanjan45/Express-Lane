// To run this code, you need to install the following dependencies:
// npm install @google/generative-ai

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
}

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate A course Tutorial on Following Details with this EXACT JSON structure:
          {
            "course": {
              "name": "Course Title Here",
              "description": "Detailed course description here",
              "category": "Programming/Creative/Business/etc",
              "level": "Beginner/Intermediate/Advanced",
              "includeVideo": "Yes/No",
              "duration": "X Hours",
              "noOfChapters": number,
              "chapters": [
                {
                  "chapterName": "Chapter title here",
                  "about": "Chapter description here", 
                  "duration": "X Minutes"
                }
              ]
            }
          }
          
          IMPORTANT: Always use "course" as root key, "name" for course name, "chapterName" for chapter titles, and "includeVideo" field. Follow this structure exactly.`
        }
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
            "course": {
              "name": "Introduction to JavaScript Programming",
              "description": "A comprehensive beginner course covering JavaScript fundamentals, syntax, and basic programming concepts. Perfect for those starting their web development journey.",
              "category": "Programming",
              "level": "Beginner",
              "includeVideo": "Yes",
              "duration": "3 Hours",
              "noOfChapters": 4,
              "chapters": [
                {
                  "chapterName": "JavaScript Basics and Syntax",
                  "about": "Learn the fundamental concepts of JavaScript including variables, data types, and basic syntax rules.",
                  "duration": "45 Minutes"
                },
                {
                  "chapterName": "Functions and Control Structures",
                  "about": "Understand how to create functions, use conditional statements, and implement loops in JavaScript.",
                  "duration": "50 Minutes"
                },
                {
                  "chapterName": "DOM Manipulation",
                  "about": "Explore how to interact with HTML elements using JavaScript and create dynamic web pages.",
                  "duration": "40 Minutes"
                },
                {
                  "chapterName": "Events and Interactivity",
                  "about": "Learn to handle user interactions, create event listeners, and build interactive web applications.",
                  "duration": "45 Minutes"
                }
              ]
            }
          }`
        }
      ],
    },
  ],
})

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate comprehensive, detailed chapter content for the given topic and chapter. Create educational content that is thorough, engaging, and practical. Return content in this EXACT JSON structure:
          {
            "title": "Chapter Title Here",
            "explanation": "Very detailed explanation (500-800 words minimum). Include: 1) Clear introduction to the concept, 2) Step-by-step breakdown of key concepts, 3) Real-world applications and use cases, 4) Best practices and common pitfalls, 5) How it relates to other concepts, 6) Practical tips for implementation",
            "codeExample": "Multiple comprehensive code examples with comments explaining each part. Include basic, intermediate, and advanced examples where applicable.",
            "keyPoints": [
              "Important takeaway 1",
              "Important takeaway 2", 
              "Important takeaway 3"
            ],
            "practicalExercise": "A hands-on exercise or challenge for students to practice the concept"
          }
          
          IMPORTANT: 
          - Make explanation very detailed and educational (500+ words)
          - Include multiple code examples with thorough comments
          - Add 3-5 key takeaway points
          - Provide a practical exercise
          - Use "title", "explanation", "codeExample", "keyPoints", "practicalExercise" keys exactly as shown`
        }
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
            "title": "CSS Selectors and Properties",
            "explanation": "CSS selectors are the foundation of styling web pages, acting as patterns that allow you to target and style specific HTML elements. Understanding selectors is crucial for creating maintainable, efficient, and well-organized stylesheets. There are several categories of selectors, each serving different purposes and offering varying levels of specificity.\n\nBasic selectors form the core of CSS targeting. Element selectors target all instances of a specific HTML tag, such as 'p' for paragraphs or 'h1' for main headings. Class selectors, denoted by a dot (.), target elements with specific class attributes, making them highly reusable across multiple elements. ID selectors, marked with a hash (#), target unique elements with specific ID attributes and have the highest specificity among basic selectors.\n\nAdvanced selectors provide more precise targeting capabilities. Attribute selectors can target elements based on their attributes and values, such as selecting all input elements of type 'email'. Pseudo-classes like ':hover', ':focus', and ':nth-child()' allow styling based on element states or positions. Pseudo-elements like '::before' and '::after' enable styling of specific parts of elements.\n\nCombinators help create relationships between selectors. The descendant combinator (space) selects nested elements, while the child combinator (>) selects direct children only. The adjacent sibling combinator (+) targets elements immediately following another, and the general sibling combinator (~) selects all siblings that follow.\n\nCSS properties define how selected elements should appear and behave. Layout properties like 'display', 'position', 'margin', and 'padding' control element positioning and spacing. Typography properties such as 'font-family', 'font-size', and 'line-height' manage text appearance. Color and background properties including 'color', 'background-color', and 'background-image' control visual presentation.\n\nSelector specificity determines which styles apply when multiple rules target the same element. Inline styles have the highest specificity, followed by IDs, classes, and finally element selectors. Understanding specificity prevents conflicts and ensures predictable styling outcomes.\n\nBest practices include using classes for reusable styles, avoiding overly specific selectors that are hard to override, and organizing CSS in a logical, maintainable structure. Common pitfalls include relying too heavily on ID selectors, creating overly complex selector chains, and not considering specificity when styles don't apply as expected.",
            "codeExample": "/* Basic Element Selector - targets all paragraphs */\np {\n  color: #333;\n  line-height: 1.6;\n  margin-bottom: 16px;\n}\n\n/* Class Selector - reusable across multiple elements */\n.highlight {\n  background-color: #ffeb3b;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n\n/* ID Selector - targets unique element */\n#main-header {\n  font-size: 2.5rem;\n  text-align: center;\n  margin-bottom: 2rem;\n}\n\n/* Attribute Selector - targets specific input types */\ninput[type='email'] {\n  border: 2px solid #007bff;\n  padding: 10px;\n  border-radius: 5px;\n}\n\n/* Pseudo-class - styling based on state */\nbutton:hover {\n  background-color: #0056b3;\n  transform: translateY(-2px);\n  transition: all 0.3s ease;\n}\n\n/* Descendant Combinator - targets nested elements */\n.card p {\n  font-size: 0.9rem;\n  color: #666;\n}\n\n/* Child Combinator - targets direct children only */\n.navigation > li {\n  display: inline-block;\n  margin-right: 20px;\n}\n\n/* Advanced example - combining multiple selectors */\n.form-group input[type='text']:focus {\n  outline: none;\n  border-color: #28a745;\n  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);\n}",
            "keyPoints": [
              "CSS selectors determine which HTML elements receive styling, with different types offering varying levels of specificity and targeting precision",
              "Understanding selector specificity (inline > ID > class > element) is crucial for predictable styling and avoiding conflicts",
              "Combinators like descendant, child, and sibling selectors enable precise targeting of elements based on their relationships",
              "Best practices include using classes for reusable styles, avoiding overly specific selectors, and organizing CSS logically",
              "Modern CSS provides powerful pseudo-classes and pseudo-elements for dynamic styling based on user interactions and element states"
            ],
            "practicalExercise": "Create a webpage with a navigation menu, article content, and sidebar. Use different types of selectors to style: 1) All paragraphs with consistent typography, 2) Navigation links with hover effects, 3) The first paragraph of each article differently, 4) Input fields that change appearance on focus, 5) A specific sidebar element using an ID selector. Practice combining selectors to create a cohesive design while maintaining good specificity practices."
          }`
        }
      ]
    }
  ]
});

// Usage examples:
// const result = await GenerateCourseLayout_AI.sendMessage("Create a course on React.js for intermediate level");
// const chapterResult = await GenerateChapterContent_AI.sendMessage("Explain React Hooks in detail");