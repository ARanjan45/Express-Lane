import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import EditChapters from './EditChapters'


function ChapterList({course,refreshData,edit=true}) {
  return (
    <div className='bg-card rounded-2xl shadow-lg border border-border mt-8 overflow-hidden max-w-4xl mx-auto'>
        {/* Header */}
        <div className='bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10 px-8 py-6 border-b border-border'>
            <h2 className='text-2xl font-bold text-foreground'>Course Chapters</h2>
            <p className='text-muted-foreground text-sm mt-1'>
                {course?.courseOutput?.course?.chapters?.length || 0} chapters to complete
            </p>
        </div>
        
        {/* Chapters List */}
        <div className='p-6'>
            {course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                <div key={index} className='flex gap-4 items-center p-4 rounded-xl border border-border bg-card hover:bg-accent/20 transition-all duration-200 mb-3 last:mb-0 justify-between'>
                    <div className='bg-gradient-to-br from-primary to-chart-2 h-10 w-10 text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm shadow-md flex-shrink-0'>
                        {index + 1}
                    </div>
                    <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-foreground text-lg mb-2 leading-tight'>
                            {chapter?.name|| chapter?.chapterName||chapter?.ChapterName}{edit &&<EditChapters course={course} index={index} refreshData={refreshData}/>}
                        </h3>
                        <p className='text-muted-foreground text-sm leading-relaxed mb-3'>
                            {chapter?.about}
                        </p>
                        <div className='flex items-center gap-2 text-chart-2'>
                            <HiOutlineClock className='text-base flex-shrink-0'/>
                            <span className='text-sm font-medium'>{chapter?.duration || chapter?.Duration}</span>
                        </div>
                    </div>
                    <HiOutlineCheckCircle className='text-3xl text-gray-300 '/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList