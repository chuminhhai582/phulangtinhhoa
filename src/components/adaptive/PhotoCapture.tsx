"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Camera, UploadCloud, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";

interface PhotoCaptureProps {
  onCapture: (file: File) => void;
  isProcessing?: boolean;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  label?: string;
}

export function PhotoCapture({ 
  onCapture, 
  isProcessing = false, 
  maxSizeMB = 0.4, 
  maxWidthOrHeight = 1600,
  label = "Chụp hoặc chọn ảnh"
}: PhotoCaptureProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      
      // Revoke old URL before creating new one
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      
      // Tạo preview tạm thời
      const previewUrl = URL.createObjectURL(file);
      previewUrlRef.current = previewUrl;
      setPreview(previewUrl);

      // Nén ảnh theo cấu hình (mặc định ≤ 1600px, ≤ 400KB)
      const options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      
      onCapture(compressedFile);
    } catch (error) {
      console.error("Lỗi nén ảnh:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleClear = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {!preview ? (
        <div 
          onClick={triggerInput}
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors bg-card h-48"
        >
          <div className="hidden lg:flex flex-col items-center">
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="font-medium text-foreground">Kéo thả hoặc click để chọn ảnh</p>
            <p className="text-xs text-muted-foreground mt-1">Hỗ trợ JPG, PNG (tối đa 10MB, sẽ nén còn 400KB)</p>
          </div>
          
          <div className="flex lg:hidden flex-col items-center text-center">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground mb-3 shadow-lg">
              <Camera className="w-6 h-6" />
            </div>
            <p className="font-medium">{label}</p>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border bg-black/5 flex items-center justify-center h-48 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-contain"
          />
          
          {(isProcessing || isCompressing) && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 font-medium">Đang xử lý...</span>
            </div>
          )}
          
          {!isProcessing && !isCompressing && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-lg"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
