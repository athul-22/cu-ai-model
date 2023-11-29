/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent } from "react";


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

export function FriendConnector() {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = () => {
    // Add your logic for handling the upload here
    // Access the form data from the state (formData)
    console.log("Form Data:", formData);

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
          <Users className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>AI Connector</SheetTitle>
          <SheetDescription>Connect with your perfect match </SheetDescription>
        </SheetHeader>

        {/* Form Section */}
        <form>
          <div className="mt-4">
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
             
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="additionalInfo">Additional Information:</Label>
            <Input
              type="text"
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>
        </form>

        {/* UPLOAD PDF */}
        <div className="flex-grow mt-6">
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
            <div className="w-50 h-50 flex justify-center items-center rounded-md overflow-hidden">
              <img
                className="object-cover w-60 h-60"
                src="https://notioly.com/wp-content/uploads/2022/07/152.Study-Group.png"
                alt="Preview"
               
              />
            </div>
          </div>
        </div>
        <label className="text-red-500 absolute bottom-5 left-0 right-0 text-center">
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
