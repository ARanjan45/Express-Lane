"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../configs/db'
import { CourseList } from '../../../configs/schema' 
import CourseCard from '../_components/CourseCard';
import { Button } from '../../../components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);
  
  const GetAllCourse = async () => {
    setIsLoading(true);
    try {
      // Fetch courses from the database
      const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9);
      
      // Update the state with the fetched courses
      setCourseList(result);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 mb-12 border border-border/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="h-12 w-1 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
          </div>
          
          <h2 className="font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary via-secondary-foreground to-primary bg-clip-text text-transparent leading-tight">
            Explore More Courses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Discover amazing projects built with 
            <span className="magical-button inline-block px-3 py-1 mx-2 rounded-full text-sm font-semibold text-white">
              ExpressLane AI
            </span>
            and unlock your learning potential
          </p>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span className="text-lg font-medium">Loading amazing courses...</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {courseList.map((course, index) => (
            <div 
              key={index}
              className="group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            > 
              <CourseCard course={course} displayUser={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex justify-center items-center gap-4 mt-16">
        <div className="flex items-center gap-3">
          {pageIndex !== 0 && (
            <Button 
              onClick={() => setPageIndex(pageIndex - 1)}
              disabled={isLoading}
              className="group relative overflow-hidden bg-card hover:bg-accent border border-border/50 text-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 px-6 py-3 rounded-2xl backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2 font-medium">
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Previous
              </div>
            </Button>
          )}
          
          {/* Page indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/30">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">Page {pageIndex + 1}</span>
          </div>
          
          <Button 
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={isLoading}
            className="group relative overflow-hidden magical-button text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 px-6 py-3 rounded-2xl font-medium"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              Next
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Button>
        </div>
      </div>

      {/* Bottom decorative section */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground font-medium">
            Showing {courseList.length} courses • {courseList.length > 0 ? 'More available' : 'No courses found'}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}

export default Explore;