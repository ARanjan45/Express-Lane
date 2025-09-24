"use client";

import { Button } from '../../components/ui/button';
import Image from 'next/image';
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CombinedHeaderHero() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const handleGetStartedClick = () => {
    if (!isLoaded) {
      // The auth state is still loading, do nothing for now.
      return;
    }

    if (isSignedIn) {
      // If the user is signed in, redirect to the dashboard.
      router.push('/dashboard');
    } else {
      // If the user is not signed in, redirect to the sign-in page.
      router.push('/sign-in');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      {/* Sticky Header with distinction */}
      <div className="sticky top-0 left-0 right-0 z-50 flex items-center h-20 justify-between p-5 text-foreground bg-card/90 backdrop-blur-xl border-b border-border/20 shadow-lg">
        <Image src={'/logo.png'} width={150} height={100} alt="Spectrum Logo" />
        <Button 
          variant="default" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </div>

      {/* Hero Content - adjusted for sticky header */}
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
                ExpressLane
              </span>
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground/90 font-light tracking-wide">
              The AI Course Generator
            </h2>
          </div>
          
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed opacity-90">
            Unlock personalized education with AI-driven course creation. Tailor your learning journey to fit your unique goals and pace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              className="magical-button px-12 py-4 font-medium text-white shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
            <Button
              variant="outline" 
              className="px-8 py-4 border-border/50 hover:bg-accent/30 backdrop-blur-sm transition-all hover:border-primary/50"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Optional: Add some subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default CombinedHeaderHero;