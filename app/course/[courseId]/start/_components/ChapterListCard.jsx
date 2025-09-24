import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'
import { Button } from '../../../../../components/ui/button'

function ChapterListCard({ chapter, index }) {
    return (
        <div className='grid grid-cols-5 p-4 items-center border-b border-sidebar-border'>
            <div>
                <h2 className='p-1 bg-primary w-8 h-8 text-center text-primary-foreground rounded-full'>{index + 1}</h2>
            </div>
            <div className='col-span-4'>
                <h2 className='font-medium text-sidebar-foreground'>{chapter?.chapterName}</h2>
                <h2 className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
                    <HiOutlineClock />{chapter?.duration}
                </h2>
            </div>
        </div>
    )
}

export default ChapterListCard