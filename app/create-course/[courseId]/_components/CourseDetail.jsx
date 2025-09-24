import React from 'react'
import {HiOutlineChartBar} from "react-icons/hi"
import {HiOutlineBookOpen, HiOutlineClock, HiOutlinePlayCircle} from "react-icons/hi2"

function CourseDetail({course}) {
  return (
    <div className='bg-card rounded-2xl shadow-lg border border-border mt-8 overflow-hidden max-w-4xl mx-auto'>
        {/* Header */}
        <div className='bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10 px-8 py-6 border-b border-border'>
            <h2 className='text-2xl font-bold text-foreground'>Course Details</h2>
            <p className='text-muted-foreground text-sm mt-1'>
                Everything you need to know about this course
            </p>
        </div>

        {/* Details Grid */}
        <div className='p-6'>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='flex items-start gap-4 p-4 rounded-xl border border-border bg-gradient-to-br from-chart-1/5 to-chart-1/10 hover:from-chart-1/10 hover:to-chart-1/20 transition-all duration-200'>
                    <div className='bg-gradient-to-br from-chart-1 to-chart-1/80 p-3 rounded-xl shadow-md'>
                        <HiOutlineChartBar className='text-2xl text-primary-foreground'/>
                    </div>
                    <div className='flex-1'>
                        <h3 className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1'>Skill Level</h3>
                        <p className='font-semibold text-lg text-foreground'>{course?.level || 'Not specified'}</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 p-4 rounded-xl border border-border bg-gradient-to-br from-chart-2/5 to-chart-2/10 hover:from-chart-2/10 hover:to-chart-2/20 transition-all duration-200'>
                    <div className='bg-gradient-to-br from-chart-2 to-chart-2/80 p-3 rounded-xl shadow-md'>
                        <HiOutlineClock className='text-2xl text-primary-foreground'/>
                    </div>
                    <div className='flex-1'>
                        <h3 className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1'>Duration</h3>
                        <p className='font-semibold text-lg text-foreground'>{course?.courseOutput?.course?.duration || 'Not specified'}</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 p-4 rounded-xl border border-border bg-gradient-to-br from-chart-3/5 to-chart-3/10 hover:from-chart-3/10 hover:to-chart-3/20 transition-all duration-200'>
                    <div className='bg-gradient-to-br from-chart-3 to-chart-3/80 p-3 rounded-xl shadow-md'>
                        <HiOutlineBookOpen className='text-2xl text-primary-foreground'/>
                    </div>
                    <div className='flex-1'>
                        <h3 className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1'>Chapters</h3>
                        <p className='font-semibold text-lg text-foreground'>{course?.courseOutput?.course?.numberOfChapters||course?.courseOutput?.course?.noOfChapters||course?.courseOutput?.course?.number_Of_Chapters || 'Not specified'}</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 p-4 rounded-xl border border-border bg-gradient-to-br from-chart-4/5 to-chart-4/10 hover:from-chart-4/10 hover:to-chart-4/20 transition-all duration-200'>
                    <div className='bg-gradient-to-br from-chart-4 to-chart-4/80 p-3 rounded-xl shadow-md'>
                        <HiOutlinePlayCircle className='text-2xl text-primary-foreground'/>
                    </div>
                    <div className='flex-1'>
                        <h3 className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1'>Video Included</h3>
                        <p className='font-semibold text-lg text-foreground'>{course?.includeVideo || 'Not specified'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetail