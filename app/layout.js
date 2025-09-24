import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import DoubtEngine from "../components/DoubtEngine";
import { Toaster } from 'sonner';
import ClientGoogleOneTap from './_components/ClientGoogleOneTap';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ExpressLane",
  description: "Your AI course generator",
  

};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" className="dark" suppressHydrationWarning>
      

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientGoogleOneTap />
        {children}
        <Toaster 
          position="bottom-right" 
          expand={true}
          richColors={true}
        />
         
      </body>
    </html>
    </ClerkProvider>
  );
}
