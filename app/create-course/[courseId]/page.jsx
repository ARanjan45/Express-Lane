"use client"
import { useUser } from '@clerk/nextjs';
import React, { use, useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
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
            const email = user?.primaryEmailAddress?.emailAddress;
            const res = await fetch(`/api/courses/${courseId}?email=${encodeURIComponent(email)}`);
            const result = await res.json();
            if (result.length > 0) {
                setCourse(result[0]);
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

    const cleanAndParseJSON = (text) => {
        try {
            return JSON.parse(text);
        } catch {
            try {
                let cleanText = text.trim();
                cleanText = cleanText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
                const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
                if (jsonMatch) cleanText = jsonMatch[0];
                cleanText = cleanText
                    .replace(/,(\s*[}\]])/g, '$1')
                    .replace(/[\x00-\x1F\x7F-\x9F]/g, '');
                return JSON.parse(cleanText);
            } catch {
                return {
                    title: "Content Generation Error",
                    explanation: "There was an error processing the generated content. Please try regenerating.",
                    codeExample: "// Error occurred during content generation",
                    keyPoints: ["Please regenerate this content"],
                    practicalExercise: "Try regenerating this chapter content"
                };
            }
        }
    };

    const generateVideoSearchQuery = (course, chapter, index) => {
        const strategies = [
            `${course?.topic || course?.category} ${chapter?.chapterName || chapter?.name} tutorial`,
            `learn ${chapter?.chapterName || chapter?.name} ${course?.topic || course?.category}`,
            `${chapter?.chapterName || chapter?.name} ${course?.name} explained`,
            `${course?.topic || course?.category} ${chapter?.chapterName || chapter?.name} guide`,
        ];
        return strategies[index % strategies.length]
            .replace(/undefined/g, '').replace(/\s+/g, ' ').trim().substring(0, 80);
    };

    const callAIWithRetry = async (prompt, maxRetries = 3) => {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                setGenerationProgress(`Attempt ${attempt}/${maxRetries}...`);
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Request timeout')), 60000)
                );
                const result = await Promise.race([GenerateChapterContent_AI.sendMessage(prompt), timeoutPromise]);
                return result;
            } catch (error) {
                lastError = error;
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt - 1), 10000)));
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
            for (let index = 0; index < chapters.length; index++) {
                const chapter = chapters[index];
                const chapterName = chapter?.chapterName || chapter?.name;
                setGenerationProgress(`Processing chapter ${index + 1}/${chapters.length}: ${chapterName}`);

                const PROMPT = `Generate comprehensive educational content for:
Course: "${course?.name}"
Chapter: "${chapterName}"

Return ONLY a valid JSON object with this EXACT structure:
{
  "title": "Chapter title here",
  "explanation": "Detailed explanation (500+ words)",
  "codeExample": "Code examples with comments",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "practicalExercise": "Hands-on exercise description"
}`;

                try {
                    let videoId = '';
                    let content;

                    try {
                        const result = await callAIWithRetry(PROMPT, 3);
                        const responseText = result.response?.text();
                        if (!responseText) throw new Error('Empty response from AI');
                        content = cleanAndParseJSON(responseText);
                        if (!content.title || !content.explanation) throw new Error('Invalid content structure');
                    } catch {
                        content = {
                            title: chapterName || `Chapter ${index + 1}`,
                            explanation: `This chapter covers ${chapterName || 'important concepts'}.`,
                            codeExample: "// Practical examples will be covered in detail",
                            keyPoints: ["Core concepts", "Practical applications", "Best practices", "Common challenges"],
                            practicalExercise: `Practice the concepts from ${chapterName || 'this chapter'}.`
                        };
                    }

                    try {
                        const searchQuery = generateVideoSearchQuery(course, chapter, index);
                        const resp = await service.getVideos(searchQuery);
                        if (resp && resp.length > 0) {
                            videoId = resp[0]?.id?.videoId || resp[0]?.videoId || '';
                        }
                    } catch {
                        videoId = '';
                    }

                    // Save chapter via API
                    await fetch('/api/chapters', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chapterId: index,
                            courseId: course?.courseId,
                            content: content,
                            videoId: videoId
                        })
                    });

                    successfulChapters++;
                } catch (chapterError) {
                    failedChapters.push({ index: index + 1, name: chapterName, error: chapterError.message });
                }

                if (index < chapters.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }

            // Mark course as published
            await fetch('/api/courses', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId: course?.courseId })
            });

            if (successfulChapters > 0) {
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

    if (loading) {
        return (
            <div className='min-h-screen bg-background'>
                <div className='pt-20 px-7 md:px-20 lg:px-44'>
                    <div className='flex flex-col items-center justify-center min-h-[400px]'>
                        <div className='w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin'></div>
                        <div className='mt-6 text-center'>
                            <h3 className='text-xl font-semibold text-foreground mb-2'>
                                {generationProgress || 'Loading your course...'}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen bg-background'>
                <div className='pt-20 px-7 md:px-20 lg:px-44'>
                    <div className='flex flex-col items-center justify-center min-h-[400px]'>
                        <div className='bg-card rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-border'>
                            <h3 className='text-xl font-semibold text-foreground mb-2'>Something went wrong</h3>
                            <p className='text-muted-foreground mb-4'>{error}</p>
                            <button onClick={() => { setError(null); GetCourse(); }}
                                className='bg-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg mr-2'>
                                Reload Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-background'>
            <div className='pt-10 px-7 md:px-20 lg:px-44 pb-20'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
                        <span className='bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent inline-block py-2'>
                            Your Learning Journey
                        </span>
                    </h1>
                </div>
                <LoadingDialog loading={loading} />
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
                    <Button onClick={GenerateChapterContent} disabled={loading}
                        className='bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-white font-bold py-4 px-8 rounded-xl'>
                        {loading ? 'Generating...' : 'Generate Course Content'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CourseLayout;