"use client";

import React, { useCallback, useState } from "react";
// For the dropzone and cropper functionality, we'll use basic DOM methods since packages aren't installed
import { cn } from "../../lib/utils";

interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FileUploadProps {
  onChange: (file: File) => void;
  value?: File | null;
  className?: string;
  disabled?: boolean;
  cropOptions?: {
    aspect: number;
    onCropComplete: (croppedAreaPixels: Area) => void;
  };
}

export const FileUpload = ({
  onChange,
  value,
  className,
  disabled = false,
  cropOptions,
}: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        if (cropOptions) {
          setIsCropping(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onChange(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
          if (cropOptions) {
            setIsCropping(true);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onChange, cropOptions, disabled]);

  const preventDefaults = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    if (!disabled) setIsDragging(true);
  }, [preventDefaults, disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDragging(false);
  }, [preventDefaults]);

  const finishCropping = () => {
    setIsCropping(false);
  };

  // Handle mobile touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // This prevents scrolling during touch operations on the upload area
    e.stopPropagation();
  };

  return (
    <div className={cn("w-full", className)}>
      {isCropping && preview ? (
        <div className="relative h-60 sm:h-96 w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${preview})` }}></div>
          {/* Responsive cropper UI */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <p className="text-white text-center mb-4 px-4 text-sm sm:text-base">Adjust your image position and size</p>
            
            {/* Simple cropping controls for mobile */}
            <div className="flex items-center space-x-4 mb-4">
              <button 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white"
                onClick={() => setZoom(Math.min(3, zoom + 0.1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <button 
              onClick={finishCropping}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={preventDefaults}
          onDragLeave={handleDragLeave}
          onDrop={onDrop}
          onTouchStart={handleTouchStart}
          className={cn(
            "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors",
            "border-gray-300 dark:border-gray-600",
            isDragging ? "bg-gray-100 dark:bg-gray-800/50" : "hover:bg-gray-50 dark:hover:bg-gray-900/30",
            disabled && "opacity-50 cursor-default",
            "touch-manipulation" // Improves touch behavior
          )}
        >
          <label 
            htmlFor="upload" 
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
          >
            <input 
              type="file" 
              id="upload" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={disabled}
            />
            {preview ? (
              <div className="flex flex-col items-center gap-2">
                <img src={preview} alt="Preview" className="max-h-48 rounded-md" />
                <p className="text-sm text-gray-500">
                  Tap to change image
                </p>
              </div>
            ) : (
              <>
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Tap to upload
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF (MAX. 10MB)
                </p>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
}; 