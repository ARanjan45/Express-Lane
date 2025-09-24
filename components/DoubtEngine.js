// components/DoubtEngine.js
"use client";

import { useState } from 'react';
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import ChatUI from './ChatUI';

export default function DoubtEngine() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg">
          Academic Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-md h-[80vh] p-0 flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-center text-lg font-bold text-blue-600">
            Academic Assistant
          </DialogTitle>
        </DialogHeader>
        
        <div style={{ flex: 1, minHeight: 0 }}>
          <ChatUI />
        </div>
      </DialogContent>
    </Dialog>
  );
}