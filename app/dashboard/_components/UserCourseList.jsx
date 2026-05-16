"use client"
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import { UserCourseListContext } from '../../_context/UserCourseListContext';

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const { user } = useUser();

  useEffect(() => {
    user && getUserCourses()
  }, [user])

  const getUserCourses = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const res = await fetch(`/api/courses?email=${encodeURIComponent(email)}`);

    const text = await res.text(); // read as text first
    console.log('API response:', text); // check what's coming back

    if (!text) {
      console.error('Empty response from API');
      return;
    }

    const result = JSON.parse(text);
    setCourseList(result);
    setUserCourseList(result);
  }

  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-4'>
        {courseList?.length > 0 ? courseList?.map((course, index) => (
          <CourseCard course={course} key={index} refreshData={() => getUserCourses()} />
        ))
          : [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-slate-200 animate-pulse rounded-lg h-[270px]'></div>
          ))
        }
      </div>
    </div>
  )
}

export default UserCourseList