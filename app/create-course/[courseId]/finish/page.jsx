"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, use } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { useRouter } from 'next/navigation';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animationDelay: Math.random() * 2,
      animationDuration: Math.random() * 3 + 2,
    }));
    setConfettiPieces(pieces);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div key={piece.id} className="absolute w-2 h-2"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.backgroundColor,
            animation: `fall ${piece.animationDuration}s linear ${piece.animationDelay}s infinite`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const resolvedParams = use(params);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (resolvedParams?.courseId && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [resolvedParams, user]);

  const GetCourse = async () => {
    try {
      const email = user.primaryEmailAddress.emailAddress;
      const res = await fetch(`/api/courses/${resolvedParams.courseId}?email=${encodeURIComponent(email)}`);
      const result = await res.json();
      setCourse(result[0] || null);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  }

  const handleCopy = async () => {
    const courseUrl = `${window.location.origin}/course/${course?.courseId}/start`;
    await navigator.clipboard.writeText(courseUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7 relative'>
      {showConfetti && <Confetti />}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center space-x-2 mb-4">
          <span className="text-4xl animate-bounce">🎉</span>
          <h2 className='font-bold text-3xl text-violet-400'>Congratulations!</h2>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</span>
        </div>
        <p className="text-xl text-gray-700 font-medium">Your Course is Generated Successfully!</p>
      </div>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <div className='my-8 flex flex-col items-center'>
        <h2 className='text-xl text-foreground font-semibold mb-2'>Course URL:</h2>
        <div className='w-full max-w-2xl bg-card rounded-md shadow-sm border border-border p-4 flex items-center justify-between space-x-4'>
          <p className='flex-1 truncate text-base text-muted-foreground'>
            {course ? `${window.location.origin}/course/${course.courseId}/start` : 'Loading...'}
          </p>
          <button onClick={handleCopy} className='p-2 rounded-full text-foreground/70 hover:bg-muted transition-colors'>
            {isCopied ? <span className="text-green-500">Copied!</span> : <HiOutlineClipboardDocumentCheck className='h-5 w-5' />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FinishScreen