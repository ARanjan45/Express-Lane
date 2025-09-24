"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

// Dynamically import UserButton from Clerk, disabling SSR
const UserButton = dynamic(
  () => import('@clerk/nextjs').then(mod => mod.UserButton),
  { ssr: false }
);

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm bg-card border-b border-border'>
      <Image src={'/logo_spect.png'} width={40} height={40} alt="Logo"/>
      <div className="flex items-center gap-4">
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
            }
          }}
        />
      </div>
    </div>
  )
}

export default Header;
