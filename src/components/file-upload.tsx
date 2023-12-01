/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

export function FileUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    // Add your logic for handling the upload here
    // Set isUploading to true to show the spinner
    setIsUploading(true);

    // Simulate an asynchronous action (e.g., API call)
    setTimeout(() => {
      // Set isUploading to false when the upload is complete
      setIsUploading(false);
    }, 2000); // Adjust the time as needed
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Upload className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Your Data</SheetTitle>
          <SheetDescription>
            Make our AI Model more intelligent
          </SheetDescription>
        </SheetHeader>

        <br />

        <br />

        {/* UPLOAD PDF */}
        <div className="flex-grow">
          <Input type="file" id="file" accept=".pdf" className="hidden" />
          <div className="mt-2 border-dashed border-gray-300 p-2 rounded-md">
            {/* Dotted outline */}
            <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
              {isUploading ? (
                // Spinner when uploading
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                // Upload button
                <Button onClick={handleUpload} disabled={isUploading}>
                  Upload
                </Button>
              )}
            </div>
          </div>
        </div>

        <br />
        <Button className="w-full">
          Submit
        </Button>
        <br />
        <div className="block items-center space-x-4 p-4">
          <div className="flex-shrink-0">
            {/* Notion-style image */}
            <div className="w-100 h-100  rounded-md overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src="https://miro.medium.com/v2/resize:fit:1100/1*c1RCTH91LGEatDAEHcCibw.png"
                alt="Preview"
              />
            </div>
          </div>
        </div>

        <label className="text-red-500 absolute bottom-10 left-0 right-0 text-center">
          Information subject to verification.
        </label>

        <SheetFooter>
          <SheetClose asChild>
            {/* You can add a close button here if needed */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
