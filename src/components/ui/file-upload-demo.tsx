"use client";
import React, { useState } from "react";
import { FileUpload } from "./file-upload";

export default function FileUploadDemo() {
  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload = (file: File) => {
    setFile(file);
    console.log(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-gray-900 dark:bg-black border-purple-500/30 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
} 