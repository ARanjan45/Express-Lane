import { SignIn, SignUp } from '@clerk/nextjs';
import React from 'react';

// This is a single, self-contained component.
// You will need to replace the placeholder form with your actual <SignIn /> component.

const Page = () => {
  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center font-sans">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-screen">
        {/* Left Side: Animated Text and Description */}
        <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-blue-900 to-pink-900 rounded-lg p-12 m-4 items-center justify-center text-center">
          <div className="relative">
            <h1 className="text-7xl md:text-8xl font-extrabold text-white leading-tight mb-4 animate-declutter">
              Declutter Learning
            </h1>
            <p className="text-xl text-gray-200 max-w-lg mx-auto">
              Welcome to ExpressLane. Get ready to streamline your education and focus on what truly matters.
            </p>
          </div>
        </div>

        {/* Right Side: Sign-In Form */}
        <div className="flex flex-col flex-1 items-center justify-center p-8 lg:p-4 m-4 bg-gray-900 rounded-lg shadow-2xl">
          <div className="w-full max-w-md justify-center">

            <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
