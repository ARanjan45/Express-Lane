"use client"
import { useEffect, use, useState } from 'react'
import { eq } from 'drizzle-orm'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Chapters, CourseList } from '../../../../configs/schema'
import { db } from '../../../../configs/db'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { and } from 'drizzle-orm'

function CourseStart({ params }) {
    // Unwrap the params Promise
    const resolvedParams = use(params);
    const router = useRouter();
    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [chapterContent, setChapterContent] = useState(null);

    useEffect(() => {
        if (resolvedParams?.courseId) {
            GetCourse();
        }
    }, [resolvedParams]);

    const GetCourse = async () => {
        try {
            const result = await db.select().from(CourseList)
                .where(eq(CourseList.courseId, resolvedParams.courseId));
            setCourse(result[0]);
        }
        catch (error) {
            console.error('Error fetching course:', error);
        }
    }

    // Updated function to also set the selected chapter state
    const GetSelectedChapterContent = async (chapter) => {
        // Set the selected chapter object from the list
        setSelectedChapter(chapter);

        const result = await db.select().from(Chapters)
            .where(and(
                eq(Chapters.chapterId, course.courseOutput.course.chapters.indexOf(chapter)),
                eq(Chapters.courseId, resolvedParams.courseId)
            ));
        setChapterContent(result[0]);
        console.log(result);
    }

    return (
        <div className="bg-background min-h-screen">
            {/*Enhanced Chapter List Side Bar*/}
            <div className='fixed md:w-80 hidden md:block h-screen bg-sidebar shadow-xl border-r border-sidebar-border/50 backdrop-blur-sm'>
                {/* Course Header with Gradient Background */}
                <div className='relative overflow-hidden bg-gradient-to-r from-sidebar-primary to-sidebar-accent shadow-lg'>
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent'></div>
                    <div className='relative p-4 backdrop-blur-sm'>
                        {/* Back to Dashboard Button */}
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className='group flex items-center gap-1.5 mb-3 px-2 py-1.5 text-xs font-medium text-sidebar-primary-foreground/70 hover:text-sidebar-primary-foreground bg-sidebar-primary-foreground/5 hover:bg-sidebar-primary-foreground/15 border border-sidebar-primary-foreground/10 hover:border-sidebar-primary-foreground/30 rounded-md transition-all duration-300 ease-in-out'
                        >
                            <svg className='w-3 h-3 transition-transform duration-300 group-hover:-translate-x-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            Dashboard
                        </button>

                        <div className='flex items-center gap-2 mb-2'>
                            <div className='flex items-center justify-center w-6 h-6 rounded-lg bg-sidebar-primary-foreground/10 backdrop-blur-sm'>
                                <svg className='w-4 h-4 text-sidebar-primary-foreground' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' />
                                </svg>
                            </div>
                            <div className='text-sidebar-primary-foreground/70 text-xs font-medium tracking-wide uppercase'>
                                Course Content
                            </div>
                        </div>
                        <h2 className='font-semibold text-base text-sidebar-primary-foreground leading-tight tracking-tight'>
                            {course?.courseOutput?.course?.name || 'Loading Course...'}
                        </h2>
                        <p className='text-sidebar-primary-foreground/80 text-xs mt-1 font-medium'>
                            {course?.courseOutput?.course?.chapters?.length || 0} Chapters
                        </p>
                    </div>
                </div>

                {/* Chapter List with Enhanced Styling */}
                <div className='overflow-y-auto h-full pb-20 chat-scrollable'>
                    <div className='p-2'>
                        {course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                            <div
                                key={index}
                                className={`
                                    group cursor-pointer transition-all duration-300 ease-in-out 
                                    hover:scale-[1.02] hover:shadow-md
                                    mb-2 rounded-lg border border-transparent
                                    ${selectedChapter?.chapterName === chapter?.chapterName 
                                        ? 'bg-gradient-to-r from-sidebar-primary/20 to-sidebar-accent/10 border-sidebar-primary/30 shadow-lg scale-[1.02]' 
                                        : 'hover:bg-sidebar-accent/10 hover:border-sidebar-border'
                                    }
                                `}
                                onClick={() => {
                                    GetSelectedChapterContent(chapter);
                                }}
                            >
                                <div className='relative overflow-hidden rounded-lg'>
                                    {/* Active Chapter Indicator */}
                                    {selectedChapter?.chapterName === chapter?.chapterName && (
                                        <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sidebar-primary to-sidebar-accent rounded-r-full'></div>
                                    )}
                                    
                                    {/* Enhanced Chapter Card */}
                                    <div className='p-4 flex items-center gap-4'>
                                        {/* Chapter Number with Enhanced Styling */}
                                        <div className={`
                                            relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                                            font-bold text-sm transition-all duration-300
                                            ${selectedChapter?.chapterName === chapter?.chapterName
                                                ? 'bg-gradient-to-br from-sidebar-primary to-sidebar-accent text-sidebar-primary-foreground shadow-lg' 
                                                : 'bg-sidebar-accent/20 text-sidebar-foreground group-hover:bg-sidebar-primary group-hover:text-sidebar-primary-foreground'
                                            }
                                        `}>
                                            <span className='relative z-10'>{index + 1}</span>
                                            {selectedChapter?.chapterName === chapter?.chapterName && (
                                                <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-sidebar-primary/50 to-sidebar-accent/50 animate-pulse'></div>
                                            )}
                                        </div>
                                        
                                        {/* Chapter Content */}
                                        <div className='flex-1 min-w-0'>
                                            <h3 className={`
                                                font-medium leading-tight mb-1 transition-colors duration-300
                                                ${selectedChapter?.chapterName === chapter?.chapterName
                                                    ? 'text-sidebar-foreground' 
                                                    : 'text-sidebar-foreground group-hover:text-sidebar-primary'
                                                }
                                            `}>
                                                {chapter?.chapterName}
                                            </h3>
                                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                                <div className='flex items-center gap-1'>
                                                    <div className='w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center'>
                                                        <div className='w-2 h-2 rounded-full bg-muted-foreground/60'></div>
                                                    </div>
                                                    <span>{chapter?.duration}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Indicator */}
                                        <div className={`
                                            flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300
                                            ${selectedChapter?.chapterName === chapter?.chapterName
                                                ? 'bg-sidebar-primary animate-pulse' 
                                                : 'bg-muted-foreground/30 group-hover:bg-sidebar-primary/60'
                                            }
                                        `}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Gradient Fade */}
                <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-sidebar to-transparent pointer-events-none'></div>
            </div>

            {/*Main Content with Enhanced Styling*/}
            <div className='md:ml-80 min-h-screen bg-background'>
                {selectedChapter ? (
                    <ChapterContent
                        chapter={selectedChapter}
                        content={chapterContent}
                    />
                ) : (
                    <div className='flex items-center justify-center h-screen'>
                        <div className='text-center'>
                            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                                <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse'></div>
                            </div>
                            <h3 className='text-lg font-medium text-foreground mb-2'>Select a Chapter</h3>
                            <p className='text-muted-foreground'>Choose a chapter from the sidebar to begin learning</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseStart