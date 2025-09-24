"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '../../../../components/ui/textarea'
import { Button } from '../../../../components/ui/button'
import { CourseList } from '../../../../configs/schema'
import { db } from '../../../../configs/db'
import { eq } from 'drizzle-orm'

function EditChapters({ course, index, onCourseUpdate,refreshData }) {
    
    const Chapters = course?.courseOutput?.course?.chapters;
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (Chapters && Chapters[index]) {
            // Handle both possible property names
            const chapterName = Chapters[index]?.name || Chapters[index]?.chapterName || '';
            const chapterAbout = Chapters[index]?.about || '';
            
            setName(chapterName);
            setAbout(chapterAbout);
            
            console.log('Chapter data:', Chapters[index]); // Debug log
        }
    }, [course, index, Chapters]);

    const onUpdateHandler = async () => {
        try {
            // Create a deep copy and update both possible name properties
            const updatedCourse = {
                ...course,
                courseOutput: {
                    ...course.courseOutput,
                    course: {
                        ...course.courseOutput.course,
                        chapters: course.courseOutput.course.chapters.map((chapter, idx) => 
                            idx === index 
                                ? { 
                                    ...chapter, 
                                    name, 
                                    chapterName: name, // Update both properties
                                    about 
                                }
                                : chapter
                        )
                    }
                }
            };

            // Update the database
            await db.update(CourseList)
                .set({
                    courseOutput: updatedCourse.courseOutput
                })
                .where(eq(CourseList.id, course.id));

            // Call parent component's update handler if provided
            if (onCourseUpdate) {
                onCourseUpdate(updatedCourse);
            }

            console.log('Chapter updated successfully:', updatedCourse);
            setIsOpen(false);
            
        } catch (error) {
            console.error('Error updating chapter:', error);
            // You might want to show an error message to the user here
        }
        refreshData(true)
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)}>
                <HiPencilSquare />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Chapter Name</DialogTitle>
                    <DialogDescription>
                        Make changes to your chapter information here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            Chapter Title
                        </label>
                        <Input 
                            value={name} 
                            onChange={(event) => setName(event?.target.value)} 
                            placeholder="Enter chapter name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            value={about}
                            onChange={(event) => setAbout(event?.target.value)}
                            className="min-h-[200px]"
                            placeholder="Enter chapter description"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={onUpdateHandler}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditChapters