"use client"
import { useUser } from '@clerk/nextjs'
import React, { useContext, useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link';
import { UserCourseListContext } from '../../_context/UserCourseListContext';

function AddCourse() {
  const { user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }
  }, [user]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-between p-8 bg-gradient-to-br from-card via-accent/5 to-primary/5 rounded-xl border border-border shadow-lg backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="space-y-3 z-10">
          <h2 className='text-3xl text-foreground'>
            Hello, {fullName ? (
              <span className='font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                {fullName}
              </span>
            ) : null}
          </h2>
          <p className='text-base text-muted-foreground max-w-md'>
            Create new course with AI, Share with friends and start your learning journey
          </p>        
        </div>
        
        <div className="z-10">
          <Link href={userCourseList >= 5 ? '/dashboard/upgrade' : '/create-course'}>
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-8">
              <span className="mr-2">✨</span>
              Create AI Course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddCourse;
