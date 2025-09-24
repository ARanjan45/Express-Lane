import Image from 'next/image'
import React from 'react'
import { HiMiniEllipsisVertical, HiOutlineBookOpen } from 'react-icons/hi2'
import DropDownOption from './DropDownOption'
import { CourseList } from '../../../configs/schema'
import { db } from '../../../configs/db'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
function CourseCard({course,refreshData,displayUser=false}) {
  const handleOnDelete=async()=>{
    const resp=await db.delete(CourseList)
    .where(eq(CourseList?.id,course?.id))
    .returning({id:CourseList?.id});
    if(resp){
      refreshData();
    }
  } 
  return (
    <div className='shadow-sm rounded-lg border p-2 transition-all cursor-pointer hover:border-primary'>
      <Link href={'/course/' + course?.courseId}>
        <Image src={course?.courseBanner} width={300} height={200}
          className='w-full h-[200px] object-cover rounded-lg' alt='Coursebanner'
        />
      </Link>
      <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>
          {course?.courseOutput?.course?.name || course?.courseOutput?.course?.course_name||course?.courseOutput?.course?.courseName|| course?.name};
          
         {!displayUser && <DropDownOption handleOnDelete={()=>handleOnDelete()}>
            <HiMiniEllipsisVertical/>
          </DropDownOption>}
        </h2>
        <p className='text-sm text-gray-600 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between mt-2'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-950 text-primary rounded-sm'><HiOutlineBookOpen/>
            {course?.courseOutput?.course?.numberOfChapters||course.courseOutput?.course?.noOfChapters||course.courseOutput?.course?.NoOfChapters||course.courseOutput?.course?.number_of_chapters} Chapters
          </h2>
          <h2 className='text-sm bg-purple-950 text-primary p-1 rounded-sm'>
            {course?.level}
          </h2>

        </div>
       {displayUser && <div className='flex gap-2 items-center mt-2'>
          <Image src={course?.userProfileImage} alt='user' width={35} height={35} className='rounded-full'/>
          <h2 className='text-sm'>{course?.userName}</h2>
        </div>}
      </div>
    </div>
  )
}

export default CourseCard