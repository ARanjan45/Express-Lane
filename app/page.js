// app/page.js
"use client";

import React, { useState, useEffect } from 'react';
import RocketAnimation from './_components/RocketAnimation';
import CombinedHeaderHero from './_components/CombinedHeaderHero'; 

export default function HomePage() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 6000); // Hide animation after 6 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showAnimation ? (
        <RocketAnimation />
      ) : (
        <CombinedHeaderHero />
      )}
    </div>
  );
}