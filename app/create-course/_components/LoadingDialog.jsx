import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../../components/ui/alert-dialog"
import Image from 'next/image'

function LoadingDialog({ loading }) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="sr-only">
                        Loading Course Creation
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className='flex flex-col items-center py-10'>
                            <Image 
                                src={'/rocket.gif'} 
                                width={100} 
                                height={100}
                                alt="Loading animation"
                            />
                            <span className="text-lg font-semibold mt-4">
                                Please wait...AI working on your course
                            </span>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LoadingDialog