"use client"
import React, { useState } from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'
import UserCourseList from './_components/UserCourseList'
import { UserCourseListContext } from '../_context/UserCourseListContext'
function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);
  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div className="min-h-screen bg-background">
        {/* Sidebar - Fixed positioning */}
        <div className='md:w-64 hidden md:block'>
          <SideBar />
        </div>

        {/* Main content area */}
        <div className='md:ml-64'>
          {/* Header */}
          <Header />

          {/* Page content with proper theming */}
          <main className='p-6 lg:p-10 bg-background min-h-[calc(100vh-5rem)]'>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </UserCourseListContext.Provider>
  )
}

export default DashboardLayout