import React from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0,
    },
};

function ChapterContent({ chapter, content }) {
    const chapterContent = content?.content;

    if (!chapterContent) {
        return (
            <div className="p-10 flex items-center justify-center min-h-[500px]">
                <p className="text-muted-foreground">Select a chapter to view its content.</p>
            </div>
        );
    }

    return (
        <div className='p-8 md:p-10'>
            {/* Chapter Header */}
            <div className='border-b border-border pb-4 mb-6'>
                <h2 className='font-bold text-3xl md:text-4xl text-foreground mb-2'>
                    {chapter?.chapterName}
                </h2>
                <p className='text-muted-foreground text-base md:text-lg'>
                    {chapter?.about}
                </p>
            </div>

            {/* Video Player */}
            {content?.videoId && (
                <div className='flex justify-center mt-8 mb-10'>
                    <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-border">
                        <YouTube
                            videoId={content.videoId}
                            opts={opts}
                        />
                    </div>
                </div>
            )}

            {/* AI Generated Content */}
            <div className='space-y-8'>
                {/* Main Explanation */}
                <div className='bg-card p-6 rounded-xl shadow-md border border-border'>
                    <h3 className='font-bold text-2xl text-primary mb-3'>{chapterContent.title}</h3>
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground leading-relaxed">
                        <ReactMarkdown
                            components={{
                                p: ({ node, ...props }) => <p {...props} className="mb-4" />,
                                ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside space-y-2 mt-4" />,
                                li: ({ node, ...props }) => <li {...props} className="text-foreground" />,
                            }}
                        >
                            {chapterContent.explanation}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Code Example */}
                {chapterContent.codeExample && (
                    <div className='bg-accent text-accent-foreground p-6 rounded-xl shadow-md border border-border'>
                        <h4 className='font-bold text-lg mb-2'>Code Example:</h4>
                        <SyntaxHighlighter
                            style={vscDarkPlus}
                            language="javascript"
                            wrapLines={true}
                            customStyle={{
                                backgroundColor: 'transparent',
                                padding: '0',
                                margin: '0',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}
                        >
                            {chapterContent.codeExample}
                        </SyntaxHighlighter>
                    </div>
                )}

                {/* Key Points */}
                {chapterContent.keyPoints && chapterContent.keyPoints.length > 0 && (
                    <div className='p-6 bg-card rounded-xl shadow-md border-l-4 border-primary'>
                        <h4 className='font-bold text-xl mb-3 text-primary'>Key Takeaways:</h4>
                        <ul className='space-y-2 text-foreground'>
                            {chapterContent.keyPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-chart-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-muted-foreground">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Practical Exercise - UPDATED STYLING */}
                {chapterContent.practicalExercise && (
                    <div className='bg-background p-6 rounded-xl border border-dashed border-secondary shadow-md'>
                        <h4 className='font-bold text-2xl mb-2 flex items-center gap-3 text-secondary'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                            Practical Exercise
                        </h4>
                        <div className="space-y-4">
                            {chapterContent.practicalExercise.split('\n').map((line, index) => (
                                <p key={index} className="text-foreground leading-relaxed">
                                    <span className="font-semibold text-primary">{line.split(":")[0]}:</span>
                                    {line.split(":").slice(1).join(":")}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChapterContent;