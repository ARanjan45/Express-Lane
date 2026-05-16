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

function EditCourseBasicInfo({ course, refreshData }) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        if (course?.name) setName(course.name);
        if (course?.courseOutput?.course?.description) setDescription(course.courseOutput.course.description);
    }, [course]);

    const onUpdateHandler = async () => {
        course.name = name;
        course.courseOutput.course.description = description;
        await fetch('/api/courses', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: course?.id,
                fields: {
                    courseOutput: course?.courseOutput,
                    name: course?.name
                }
            })
        });
        refreshData(true);
    }

    return (
        <Dialog>
            <DialogTrigger>
                <HiPencilSquare />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Course Title and Description</DialogTitle>
                    <DialogDescription>
                        Make changes to your course information here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Course Title</label>
                        <Input defaultValue={course?.name} onChange={(e) => setName(e?.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            defaultValue={course?.courseOutput?.course?.description}
                            onChange={(e) => setDescription(e?.target.value)}
                            className="min-h-[200px]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={onUpdateHandler}>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseBasicInfo