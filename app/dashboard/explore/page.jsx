"use client"
import React, { useEffect, useState } from 'react'
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
      const res = await fetch(`/api/explore?page=${pageIndex}`);
      const result = await res.json();
      setCourseList(result);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 mb-12 border border-border/50 backdrop-blur-sm">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary via-secondary-foreground to-primary bg-clip-text text-transparent leading-tight">
            Explore More Courses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Discover amazing projects built with ExpressLane AI
          </p>
        </div>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span className="text-lg font-medium">Loading courses...</span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {courseList.map((course, index) => (
            <CourseCard key={index} course={course} displayUser={true} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-16">
        <div className="flex items-center gap-3">
          {pageIndex !== 0 && (
            <Button onClick={() => setPageIndex(pageIndex - 1)} disabled={isLoading}
              className="bg-card hover:bg-accent border border-border/50 text-foreground px-6 py-3 rounded-2xl">
              <ChevronLeft className="h-5 w-5 mr-1" /> Previous
            </Button>
          )}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/30">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">Page {pageIndex + 1}</span>
          </div>
          <Button onClick={() => setPageIndex(pageIndex + 1)} disabled={isLoading}
            className="text-white px-6 py-3 rounded-2xl font-medium">
            Next <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Explore