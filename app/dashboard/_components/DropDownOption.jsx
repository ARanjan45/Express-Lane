import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { HiOutlineTrash } from 'react-icons/hi2'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../components/ui/alert-dialog"
function DropDownOption({ children, handleOnDelete }) {
    const [openAlert,setopenAlert]=useState(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={()=>setopenAlert(true)}>
                        <div className='flex items-center gap-2'>
                            <HiOutlineTrash /> Delete
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={openAlert}>
                
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={()=>setopenAlert(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>{handleOnDelete();setopenAlert(false)}}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DropDownOption