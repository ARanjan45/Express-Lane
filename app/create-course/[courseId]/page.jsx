"use client"
import { useUser } from '@clerk/nextjs';
import React, { use, useEffect, useState } from 'react';
import { db } from '../../../configs/db';
import { Chapters, CourseList } from '../../../configs/schema';
import { and, eq } from 'drizzle-orm';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList'
import { Button } from '../../../components/ui/button';
import LoadingDialog from '../_components/LoadingDialog';
import { GenerateChapterContent_AI } from '../../../configs/AiModel';
import service from '../../../configs/service';
import { useRouter } from 'next/navigation';

function CourseLayout({ params }) {
    const resolvedParams = use(params);
    const courseId = resolvedParams.courseId;
    const { user } = useUser();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [generationProgress, setGenerationProgress] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (courseId && user) {
            GetCourse();
        }
    }, [courseId, user]);

    const GetCourse = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await db.select().from(CourseList)
                .where(and(
                    eq(CourseList.courseId, courseId),
                    eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
                ));

            if (result.length > 0) {
                setCourse(result[0]);
                console.log('Course loaded:', result[0]);
            } else {
                setError('Course not found or you do not have access to this course.');
            }
        } catch (error) {
            console.error('Error fetching course:', error);
            setError('Failed to load course. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    // Helper function to clean and validate JSON
    const cleanAndParseJSON = (text) => {
        try {
            // First, try parsing as-is
            return JSON.parse(text);
        } catch (initialError) {
            console.log('Initial parse failed, attempting cleanup...');
            
            try {
                let cleanText = text.trim();
                
                // Remove any markdown code blocks
                cleanText = cleanText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
                
                // Extract JSON object if there's extra text
                const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    cleanText = jsonMatch[0];
                }
                
                // Only fix actual JSON syntax issues, don't destroy valid structure
                cleanText = cleanText
                    // Remove trailing commas before closing brackets/braces
                    .replace(/,(\s*[}\]])/g, '$1')
                    // Fix any control characters that might break parsing
                    .replace(/[\x00-\x1F\x7F-\x9F]/g, '');
                    
                return JSON.parse(cleanText);
                
            } catch (cleanupError) {
                console.error('JSON cleanup failed:', cleanupError);
                console.error('Problematic text preview:', text.substring(0, 500));
                
                // Try manual extraction as last resort
                const manuallyExtracted = extractJSONManually(text);
                if (manuallyExtracted) {
                    return manuallyExtracted;
                }
                
                // Final fallback - use correct field names that match AI output
                return {
                    title: "Content Generation Error",
                    explanation: "There was an error processing the generated content. Please try regenerating this chapter.",
                    codeExample: "// Error occurred during content generation",
                    keyPoints: ["Please regenerate this content"],
                    practicalExercise: "Try regenerating this chapter content"
                };
            }
        }
    };

    // Manual JSON extraction for severely malformed responses
    const extractJSONManually = (text) => {
        try {
            const result = {};
            
            // Extract title
            const titleMatch = text.match(/"title":\s*"([^"]*(?:\\.[^"]*)*)"/);
            if (titleMatch) {
                result.title = titleMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
            }
            
            // Extract explanation/description
            const explanationMatch = text.match(/"(?:explanation|description)":\s*"([^"]*(?:\\.[^"]*)*)"/s);
            if (explanationMatch) {
                result.explanation = explanationMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
            }
            
            // Extract codeExample
            const codeMatch = text.match(/"codeExample":\s*"([^"]*(?:\\.[^"]*)*)"/s);
            if (codeMatch) {
                result.codeExample = codeMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
            }
            
            // Extract keyPoints array
            const keyPointsMatch = text.match(/"keyPoints":\s*\[([\s\S]*?)\]/);
            if (keyPointsMatch) {
                const pointsContent = keyPointsMatch[1];
                const points = [];
                const pointMatches = pointsContent.matchAll(/"([^"]*(?:\\.[^"]*)*)"/g);
                for (const match of pointMatches) {
                    points.push(match[1].replace(/\\"/g, '"'));
                }
                if (points.length > 0) {
                    result.keyPoints = points;
                }
            }
            
            // Extract practicalExercise or practicalTips
            const exerciseMatch = text.match(/"(?:practicalExercise|practicalTips)":\s*(?:"([^"]*(?:\\.[^"]*)*)"|(\[[\s\S]*?\]))/s);
            if (exerciseMatch) {
                if (exerciseMatch[1]) {
                    // String value
                    result.practicalExercise = exerciseMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
                } else if (exerciseMatch[2]) {
                    // Array value
                    try {
                        result.practicalExercise = JSON.parse(exerciseMatch[2]);
                    } catch {
                        result.practicalExercise = "Practice exercises available in course material";
                    }
                }
            }
            
            // Return if we have enough content
            if (Object.keys(result).length >= 3) {
                return result;
            }
            
            return null;
        } catch (error) {
            console.error('Manual extraction failed:', error);
            return null;
        }
    };

    // Generate video search query with multiple strategies for variety
    const generateVideoSearchQuery = (course, chapter, index) => {
        // Create multiple search strategies for variety
        const strategies = [
            // Strategy 1: Topic + Chapter + Tutorial
            `${course?.topic || course?.category} ${chapter?.chapterName || chapter?.name} tutorial`,
            
            // Strategy 2: Course + Chapter + Learn
            `learn ${chapter?.chapterName || chapter?.name} ${course?.topic || course?.category}`,
            
            // Strategy 3: Chapter + Course + Explained
            `${chapter?.chapterName || chapter?.name} ${course?.name} explained`,
            
            // Strategy 4: Topic + Chapter + Guide  
            `${course?.topic || course?.category} ${chapter?.chapterName || chapter?.name} guide`,
            
            // Strategy 5: Chapter + About content + Tutorial
            `${chapter?.chapterName || chapter?.name} ${chapter?.about ? chapter.about.split(' ').slice(0, 3).join(' ') : ''} tutorial`,

            // Strategy 6: Level-specific search
            `${course?.level} ${chapter?.chapterName || chapter?.name} ${course?.topic || course?.category}`,

            // Strategy 7: How-to format
            `how to ${(chapter?.chapterName || chapter?.name).toLowerCase()} ${course?.topic || course?.category}`,

            // Strategy 8: Course + Chapter + Examples
            `${course?.topic || course?.category} ${chapter?.chapterName || chapter?.name} examples`
        ];
        
        // Use different strategy for each chapter to ensure variety
        const selectedStrategy = strategies[index % strategies.length];
        
        // Clean and optimize the query
        return selectedStrategy
            .replace(/undefined/g, '') // Remove undefined values
            .replace(/\s+/g, ' ') // Remove extra spaces
            .replace(/[^\w\s]/g, '') // Remove special characters
            .trim()
            .substring(0, 80); // YouTube search works better with shorter queries
    };

    // Add retry mechanism for AI requests
    const callAIWithRetry = async (prompt, maxRetries = 3) => {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                setGenerationProgress(`Attempt ${attempt}/${maxRetries}...`);
                
                // Increased timeout for complex content generation
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Request timeout')), 60000); // 60 second timeout
                });
                
                const aiPromise = GenerateChapterContent_AI.sendMessage(prompt);
                const result = await Promise.race([aiPromise, timeoutPromise]);
                
                return result;
            } catch (error) {
                console.error(`Attempt ${attempt} failed:`, error);
                lastError = error;
                
                if (attempt < maxRetries) {
                    // Wait before retrying (exponential backoff)
                    const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        throw lastError;
    };

    const GenerateChapterContent = async () => {
        setLoading(true);
        setGenerationProgress('Preparing chapters...');
        const chapters = course?.courseOutput?.course?.chapters;
        
        if (!chapters || chapters.length === 0) {
            setLoading(false);
            setError('No chapters found in course');
            return;
        }

        let successfulChapters = 0;
        let failedChapters = [];

        try {
            // Process chapters sequentially
            for (let index = 0; index < chapters.length; index++) {
                const chapter = chapters[index];
                const chapterName = chapter?.chapterName || chapter?.name;
                setGenerationProgress(`Processing chapter ${index + 1}/${chapters.length}: ${chapterName}`);
                
                // Improved prompt with strict JSON requirements
                const PROMPT = `Generate comprehensive educational content for:
Course: "${course?.name}"
Chapter: "${chapterName}"

Return ONLY a valid JSON object with this EXACT structure (no additional text):
{
  "title": "Chapter title here",
  "explanation": "Detailed explanation (500+ words) covering concepts, principles, applications, examples, and best practices. Use \\n for line breaks within the text.",
  "codeExample": "Comprehensive code examples with comments, or practical case studies if not programming-related. Use \\n for line breaks.",
  "keyPoints": [
    "Key takeaway 1",
    "Key takeaway 2", 
    "Key takeaway 3",
    "Key takeaway 4"
  ],
  "practicalExercise": "Hands-on exercise or challenge for students to practice the concepts learned in this chapter."
}

CRITICAL: Return only the JSON object. No markdown, no explanatory text, no code blocks.`;
                
                try {
                    let videoId = '';
                    let content;
                    
                    // Generate AI content with improved error handling
                    try {
                        const result = await callAIWithRetry(PROMPT, 3);
                        const responseText = result.response?.text();
                        
                        if (!responseText) {
                            throw new Error('Empty response from AI');
                        }
                        
                        console.log(`Chapter ${index + 1} AI Response Length:`, responseText.length);
                        console.log(`Chapter ${index + 1} AI Response Preview:`, responseText.substring(0, 200) + '...');
                        
                        content = cleanAndParseJSON(responseText);
                        
                        // Validate that we have the required fields
                        if (!content.title || !content.explanation) {
                            throw new Error('Invalid content structure from AI');
                        }
                        
                    } catch (aiError) {
                        console.error(`AI generation failed for chapter ${index + 1}:`, aiError);
                        // Use improved fallback content
                        content = {
                            title: chapterName || `Chapter ${index + 1}`,
                            explanation: `This chapter covers ${chapterName || 'important concepts'}. The content explores fundamental principles, practical applications, and real-world examples that will help you understand and apply the concepts effectively. Key topics include theoretical foundations, implementation strategies, best practices, and common challenges you may encounter. Through detailed explanations and practical exercises, you'll gain the knowledge and skills needed to master this subject area.`,
                            codeExample: chapter?.about ? `// Example related to: ${chapter.about}\\n// Practical implementation will be covered in detail\\n// including step-by-step explanations and best practices` : "// Practical examples and case studies will be provided\\n// covering implementation details and best practices",
                            keyPoints: [
                                `Understanding the core concepts of ${chapterName || 'this topic'}`,
                                "Practical applications and real-world examples", 
                                "Implementation strategies and best practices",
                                "Common challenges and how to overcome them"
                            ],
                            practicalExercise: `Complete a hands-on project applying the concepts learned in ${chapterName || 'this chapter'}. Practice the key techniques covered and experiment with different approaches to reinforce your understanding.`
                        };
                    }
                    
                    // Generate Video URL with enhanced specificity
                    try {
                        // Create more specific search query
                        const searchQuery = generateVideoSearchQuery(course, chapter, index);
                        
                        console.log(`Chapter ${index + 1} video search query:`, searchQuery);
                        
                        const resp = await service.getVideos(searchQuery);
                        console.log(`Videos for chapter ${index + 1}:`, resp?.length || 0, 'results');
                        
                        // Select video based on relevance (not just first result)
                        if (resp && resp.length > 0) {
                            // Try to find the most relevant video by checking title relevance
                            let selectedVideo = resp[0]; // Default to first
                            
                            // Look for videos that contain chapter-specific keywords
                            const chapterKeywords = (chapterName || '').toLowerCase().split(' ');
                            
                            for (let video of resp.slice(0, 5)) { // Check first 5 results
                                const videoTitle = video.title?.toLowerCase() || '';
                                const keywordMatches = chapterKeywords.filter(keyword => 
                                    keyword.length > 3 && videoTitle.includes(keyword.toLowerCase())
                                ).length;
                                
                                // If this video has more keyword matches, prefer it
                                if (keywordMatches > 0) {
                                    selectedVideo = video;
                                    break;
                                }
                            }
                            
                            videoId = selectedVideo?.id?.videoId || selectedVideo?.videoId || '';
                            console.log(`Selected video for chapter ${index + 1}:`, selectedVideo?.title);
                        } else {
                            console.log(`No videos found for chapter ${index + 1}`);
                            videoId = '';
                        }
                        
                    } catch (videoError) {
                        console.error(`Video generation failed for chapter ${index + 1}:`, videoError);
                        videoId = ''; // Continue without video
                    }
                    
                    // Save Chapter Content
                    await db.insert(Chapters).values({
                        chapterId: index,
                        courseId: course?.courseId,
                        content: content,
                        videoId: videoId
                    });
                    
                    successfulChapters++;
                    console.log(`Chapter ${index + 1} saved successfully:`, chapterName);
                    
                } catch (chapterError) {
                    console.error(`Error processing chapter ${index + 1}:`, chapterError);
                    failedChapters.push({
                        index: index + 1,
                        name: chapterName,
                        error: chapterError.message
                    });
                }
                
                // Delay between chapters to avoid rate limiting
                if (index < chapters.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
                }
            }
            
            // Update course publish status
            try {
                await db.update(CourseList).set({
                    publish: true
                }).where(eq(CourseList.courseId, course?.courseId));
            } catch (updateError) {
                console.error('Error updating course status:', updateError);
            }
            
            // Show results summary
            if (successfulChapters > 0) {
                console.log(`Successfully generated ${successfulChapters}/${chapters.length} chapters`);
                if (failedChapters.length > 0) {
                    console.warn('Failed chapters:', failedChapters);
                    setError(`Generated ${successfulChapters}/${chapters.length} chapters. Some chapters failed: ${failedChapters.map(f => f.name).join(', ')}`);
                }
                
                // Navigate to finish page
                router.replace('/create-course/' + course?.courseId + "/finish");
            } else {
                setError('Failed to generate any chapter content. Please try again.');
            }
            
        } catch (error) {
            console.error('Error in GenerateChapterContent:', error);
            setError('Failed to generate course content. Please try again.');
        } finally {
            setLoading(false);
            setGenerationProgress('');
        }
    };

    // Loading State
    if (loading) {
        return (
            <div className='min-h-screen bg-background'>
                <div className='pt-20 px-7 md:px-20 lg:px-44'>
                    <div className='flex flex-col items-center justify-center min-h-[400px]'>
                        <div className='relative'>
                            <div className='w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin'></div>
                            <div className='absolute inset-0 w-16 h-16 border-4 border-transparent border-t-chart-2 rounded-full animate-spin'></div>
                        </div>
                        <div className='mt-6 text-center'>
                            <h3 className='text-xl font-semibold text-foreground mb-2'>
                                {generationProgress || 'Loading your course...'}
                            </h3>
                            <p className='text-muted-foreground'>
                                {generationProgress ? 'Please wait while we generate content' : 'Please wait while we fetch your course content'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className='min-h-screen bg-background'>
                <div className='pt-20 px-7 md:px-20 lg:px-44'>
                    <div className='flex flex-col items-center justify-center min-h-[400px]'>
                        <div className='bg-card rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-border'>
                            <div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <svg className='w-8 h-8 text-destructive' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z' />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-foreground mb-2'>Oops! Something went wrong</h3>
                            <p className='text-muted-foreground mb-4'>{error}</p>
                            <button
                                onClick={() => {
                                    setError(null);
                                    GetCourse();
                                }}
                                className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-colors duration-300 mr-2'
                            >
                                Reload Course
                            </button>
                            {course && (
                                <button
                                    onClick={() => {
                                        setError(null);
                                        GenerateChapterContent();
                                    }}
                                    className='bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 px-6 rounded-lg transition-colors duration-300'
                                >
                                    Retry Generation
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main Content
    return (
        <div className='min-h-screen bg-background'>
            <div className='pt-10 px-7 md:px-20 lg:px-44 pb-20'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='inline-block bg-card rounded-full px-6 py-2 shadow-md border border-border mb-4'>
                        <span className='text-sm font-medium text-muted-foreground'>Course Overview</span>
                    </div>
                    <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight'>
                        <span className='bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent inline-block py-2'>
                            Your Learning Journey
                        </span>
                    </h1>
                    <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                        Dive deep into your personalized course content and start mastering new skills today
                    </p>
                </div>
                
                <LoadingDialog loading={loading}/>

                {/* Course Content */}
                <div className='max-w-6xl mx-auto'>
                    <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
                </div>
                <div className='max-w-6xl mx-auto'>
                    <CourseDetail course={course} />
                </div>
                <div className='max-w-6xl mx-auto'>
                    <ChapterList course={course} refreshData={() => GetCourse()} />
                </div>
                <div className='flex justify-center mt-8'>
                    <Button 
                        onClick={GenerateChapterContent} 
                        disabled={loading}
                        className='bg-gradient-to-r from-primary via-chart-2 to-chart-3 hover:from-primary/90 hover:via-chart-2/90 hover:to-chart-3/90 text-white font-bold py-4 px-8 rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                    >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                        </svg>
                        {loading ? 'Generating...' : 'Generate Course Content'}
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CourseLayout;