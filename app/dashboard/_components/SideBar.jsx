"use client"
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { SiWpexplorer } from "react-icons/si";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '../../../components/ui/progress'
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import UserCourseList from "./UserCourseList";
import { UserCourseListContext } from "../../_context/UserCourseListContext";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function SideBar() {
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
    const [courseCount, setCourseCount] = useState(0);
    const [isClient, setIsClient] = useState(false);

    // Handle client-side mounting
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Persist course count in localStorage and sync with context
    useEffect(() => {
        if (!isClient) return; // Skip during SSR

        if (userCourseList?.length) {
            // Update local state and persist to localStorage
            setCourseCount(userCourseList.length);
            localStorage.setItem('userCourseCount', userCourseList.length.toString());
        } else {
            // Try to get from localStorage if context is empty
            const savedCount = localStorage.getItem('userCourseCount');
            if (savedCount) {
                setCourseCount(parseInt(savedCount, 10));
            }
        }
    }, [userCourseList, isClient]);

    // Load course count on component mount (client-side only)
    useEffect(() => {
        if (!isClient) return; // Skip during SSR

        const savedCount = localStorage.getItem('userCourseCount');
        if (savedCount) {
            setCourseCount(parseInt(savedCount, 10));
        }
    }, [isClient]);

    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <FaHome />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Explore',
            icon: <SiWpexplorer />,
            path: '/dashboard/explore'
        },
    ];

    const pathname = usePathname();

    return (
        <div className='fixed h-full md:w-64 p-5 shadow-xl bg-sidebar border-r border-sidebar-border'>
            <div className="mb-4">
                <Image src={'/spect.png'} width={160} height={100} alt="Logo" />
            </div>
            <hr className='my-7 border-sidebar-border' />

            <ul className='space-y-2'>
                {Menu.map((item) => (
                    <li key={item.id}>
                        <Link href={item.path}>
                            <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer mb-2 group ${pathname === item.path
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-md'
                                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                                }`}>
                                <div className='text-2xl transition-transform duration-200 group-hover:scale-110'>
                                    {item.icon}
                                </div>
                                <h2 className='font-medium'>{item.name}</h2>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="absolute bottom-10 w-[calc(100%-2.5rem)]">
                <Progress value={(courseCount / 10) * 100} className="mb-3" />
                <h2 className='text-sm mb-2 text-sidebar-foreground font-medium'>
                    {courseCount} Out of 10 course created
                </h2>
                <h2 className='text-xs text-sidebar-foreground/60'>
                    You can generate 10 AI courses
                </h2>
            </div>
        </div>
    );
}

export default SideBar;