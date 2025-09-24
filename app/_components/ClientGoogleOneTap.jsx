"use client"
// This component ensures GoogleOneTap is only rendered on the client.

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import GoogleOneTap with SSR disabled.
const GoogleOneTap = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.GoogleOneTap),
  { ssr: false }
);

const ClientGoogleOneTap = () => {
  return <GoogleOneTap />;
};

export default ClientGoogleOneTap;