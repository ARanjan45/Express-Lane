"use client"
import React, { useContext, useEffect, useState } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquare2Stack } from "react-icons/hi2";
import { Button } from '../../components/ui/button';
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout_AI } from '../../configs/AiModel'
import LoadingDialog from '../create-course/_components/LoadingDialog'
import { useUser } from '@clerk/nextjs';
import { db } from '../../configs/db'; // Assuming this is your Drizzle DB import
import { CourseList } from '../../configs/schema'; // Assuming this is your Drizzle schema import
import { v4 as uuidv4 } from 'uuid'; // v4 is a named export, so it's a good practice to name it correctly
import { useRouter } from 'next/navigation';

function CreateCourse() {
    const StepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <HiMiniSquare2Stack />
        },
        {
            id: 2,
            name: 'Topic & Desc',
            icon: <HiLightBulb />
        },
        {
            id: 3,
            name: 'Other Informations',
            icon: <HiClipboardDocumentCheck />
        }
    ];

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { user } = useUser();
    const router=useRouter();

    useEffect(() => {
        console.log(userCourseInput);
    }, [userCourseInput]);

    const checkDisableNext = () => {
        if (activeIndex === 0) {
            return !userCourseInput.category;
        }
        if (activeIndex === 1) {
            return !userCourseInput.topic || !userCourseInput.description;
        }
        if (activeIndex === 2) {
            return !userCourseInput.Level || !userCourseInput.Duration || !userCourseInput.displayVideo || !userCourseInput.NoOfChapter;
        }
        return false;
    };

    const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = 'Create A Course Tutorial on Following Detail With Field as Course Name, Description, Along with Chapter Name, about, Duration: '
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ' , Topic:' + userCourseInput?.topic + ' , Level:' + userCourseInput?.Level + ', Duration:' + userCourseInput?.Duration + ', Display Video:' + userCourseInput?.displayVideo + ',NoOfChapters:' + userCourseInput?.NoOfChapter + ' ,in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);

    try {
        const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        const parsedResult = JSON.parse(result.response?.text());
        console.log(parsedResult);
        
        // Generate courseId here
        const courseId = uuidv4();
        await SaveCourseLayoutInDb(parsedResult, courseId);

    } catch (error) {
        console.error('Error generating course layout:', error);
        setLoading(false);
    }
}

    const SaveCourseLayoutInDb = async (courseLayout, courseId) => {
    try {
        const result = await db.insert(CourseList).values({
            courseId: courseId,
            name: userCourseInput?.topic,
            level: userCourseInput?.Level,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl,
            includeVideo: userCourseInput?.displayVideo
        });
        console.log("Course saved successfully with ID:", courseId);
        
        // Navigate to the course page
        router.replace('/create-course/' + courseId);
        
    } catch (error) {
        console.error("Error saving course to DB:", error);
    } finally {
        console.log("Saving process finished.");
        setLoading(false);
    }
}

    return (
        <div className="min-h-screen flex flex-col">
            {/*Title*/}
            <div className='flex justify-center items-center mt-8 mb-12'>
                <h2 className='text-5xl bg-gradient-to-r from-green-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-bold tracking-wide text-center'>
                    Create Course
                </h2>
            </div>

            {/*Stepper*/}
            <div className='flex justify-center items-center mb-16'>
                <div className='flex items-center'>
                    {StepperOptions.map((item, index) => (
                        <div key={item.id} className='flex items-center'>
                            {/* Step Circle and Text */}
                            <div className='flex flex-col items-center'>
                                <div className={`p-4 rounded-full text-white text-2xl transition-colors duration-300 ${
                                    activeIndex >= index
                                        ? 'bg-gradient-to-r from-green-500 to-blue-500'
                                        : 'bg-gray-400'
                                }`}>
                                    {item.icon}
                                </div>
                                <h2 className='hidden md:block md:text-sm text-gray-400 mt-3 text-center font-medium'>{item.name}</h2>
                            </div>

                            {/* Connector Line - only if not the last item */}
                            {index < StepperOptions.length - 1 && (
                                <div className={`h-1 w-[80px] md:w-[120px] lg:w-[150px] rounded-full mx-6 transition-colors duration-300 ${
                                    activeIndex > index
                                        ? 'bg-gradient-to-r from-green-600 to-blue-600'
                                        : 'bg-gray-300'
                                }`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/*Content Area - Placeholder for step content*/}
            <div className="flex-1 flex justify-center">
                <div className="text-center p-8">
                    <h3 className="text-2xl text-white mb-4 gap-20">Step {activeIndex + 1}: {StepperOptions[activeIndex].name}</h3>
                    {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : <SelectOption />}
                </div>
            </div>

            {/*Next Previous Button*/}
            <div className='flex justify-between items-center px-8 py-6 mt-auto'>
                <Button
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    variant="outline"
                    className={`px-6 py-2 ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </Button>
                <div className="text-sm text-gray-400">
                    Step {activeIndex + 1} of {StepperOptions.length}
                </div>
                <Button
                    disabled={checkDisableNext()}
                    onClick={() => activeIndex === StepperOptions.length - 1 ? GenerateCourseLayout() : setActiveIndex(activeIndex + 1)}
                    variant="accent"
                    className={`px-6 py-2 ${checkDisableNext() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {activeIndex === StepperOptions.length - 1 ? 'Generate' : 'Next'}
                </Button>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CreateCourse;