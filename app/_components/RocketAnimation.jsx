// RocketAnimation.jsx
import React from 'react';

const RocketAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-50 bg-background">
      <div className="rocket-container">
        {/* Simple div for the glowing orb */}
        <div className="rocket"></div>
        <div className="text-writing text-3xl md:text-5xl font-bold">
          <span className="text-foreground">Course generation just got easy</span>
        </div>
      </div>
    </div>
  );
};

export default RocketAnimation;