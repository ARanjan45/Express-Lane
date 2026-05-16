"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "../../../../components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '../../../../components/ui/textarea'
import { Button } from '../../../../components/ui/button'

function EditChapters({ course, index, onCourseUpdate, refreshData }) {
    const Chapters = course?.courseOutput?.course?.chapters;
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (Chapters && Chapters[index]) {
            setName(Chapters[index]?.name || Chapters[index]?.chapterName || '');
            setAbout(Chapters[index]?.about || '');
        }
    }, [course, index, Chapters]);

    const onUpdateHandler = async () => {
        try {
            const updatedCourse = {
                ...course,
                courseOutput: {
                    ...course.courseOutput,
                    course: {
                        ...course.courseOutput.course,
                        chapters: course.courseOutput.course.chapters.map((chapter, idx) =>
                            idx === index
                                ? { ...chapter, name, chapterName: name, about }
                                : chapter
                        )
                    }
                }
            };

            await fetch('/api/courses', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: course.id,
                    fields: { courseOutput: updatedCourse.courseOutput }
                })
            });

            if (onCourseUpdate) onCourseUpdate(updatedCourse);
            setIsOpen(false);
        } catch (error) {
            console.error('Error updating chapter:', error);
        }
        refreshData(true);
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
                        <label className="text-sm font-medium">Chapter Title</label>
                        <Input value={name} onChange={(e) => setName(e?.target.value)} placeholder="Enter chapter name" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea value={about} onChange={(e) => setAbout(e?.target.value)} className="min-h-[200px]" placeholder="Enter chapter description" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={onUpdateHandler}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditChapters