"use client"
import React, { useEffect, use, useState } from 'react'
import CourseBasicInfo from '../../create-course/[courseId]/_components/CourseBasicInfo'
import Header from '../../dashboard/_components/Header';
import CourseDetail from '../../create-course/[courseId]/_components/CourseDetail'
import ChapterList from '../../create-course/[courseId]/_components/ChapterList';

function Course({ params }) {
    const resolvedParams = use(params);
    const [course, setCourse] = useState();

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

    return (
        <div>
            <Header />
            <div className='px-10 p-10 md:px-20 lg:px-44'>
                <CourseBasicInfo course={course} edit={false} />
            </div>
            <CourseDetail course={course} />
            <ChapterList course={course} edit={false} />
        </div>
    )
}

export default Course