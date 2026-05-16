"use client"
import { useEffect, use, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({ params }) {
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
            const res = await fetch(`/api/courses/${resolvedParams.courseId}`);
            const result = await res.json();
            setCourse(result[0]);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }

    const GetSelectedChapterContent = async (chapter) => {
        setSelectedChapter(chapter);
        const chapterIndex = course.courseOutput.course.chapters.indexOf(chapter);
        const res = await fetch(`/api/chapters/${resolvedParams.courseId}?chapterId=${chapterIndex}`);
        const result = await res.json();
        setChapterContent(result[0]);
    }

    return (
        <div className="bg-background min-h-screen">
            <div className='fixed md:w-80 hidden md:block h-screen bg-sidebar shadow-xl border-r border-sidebar-border/50 backdrop-blur-sm'>
                <div className='relative overflow-hidden bg-gradient-to-r from-sidebar-primary to-sidebar-accent shadow-lg'>
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent'></div>
                    <div className='relative p-4 backdrop-blur-sm'>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className='group flex items-center gap-1.5 mb-3 px-2 py-1.5 text-xs font-medium text-sidebar-primary-foreground/70 hover:text-sidebar-primary-foreground bg-sidebar-primary-foreground/5 hover:bg-sidebar-primary-foreground/15 border border-sidebar-primary-foreground/10 hover:border-sidebar-primary-foreground/30 rounded-md transition-all duration-300'
                        >
                            <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            Dashboard
                        </button>
                        <h2 className='font-semibold text-base text-sidebar-primary-foreground leading-tight'>
                            {course?.courseOutput?.course?.name || 'Loading Course...'}
                        </h2>
                        <p className='text-sidebar-primary-foreground/80 text-xs mt-1'>
                            {course?.courseOutput?.course?.chapters?.length || 0} Chapters
                        </p>
                    </div>
                </div>

                <div className='overflow-y-auto h-full pb-20'>
                    <div className='p-2'>
                        {course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer transition-all duration-300 mb-2 rounded-lg border border-transparent
                                    ${selectedChapter?.chapterName === chapter?.chapterName
                                        ? 'bg-gradient-to-r from-sidebar-primary/20 to-sidebar-accent/10 border-sidebar-primary/30 shadow-lg'
                                        : 'hover:bg-sidebar-accent/10 hover:border-sidebar-border'
                                    }`}
                                onClick={() => GetSelectedChapterContent(chapter)}
                            >
                                <div className='p-4 flex items-center gap-4'>
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                                        ${selectedChapter?.chapterName === chapter?.chapterName
                                            ? 'bg-gradient-to-br from-sidebar-primary to-sidebar-accent text-sidebar-primary-foreground'
                                            : 'bg-sidebar-accent/20 text-sidebar-foreground'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <h3 className='font-medium leading-tight mb-1 text-sidebar-foreground'>
                                            {chapter?.chapterName}
                                        </h3>
                                        <span className='text-sm text-muted-foreground'>{chapter?.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='md:ml-80 min-h-screen bg-background'>
                {selectedChapter ? (
                    <ChapterContent chapter={selectedChapter} content={chapterContent} />
                ) : (
                    <div className='flex items-center justify-center h-screen'>
                        <div className='text-center'>
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