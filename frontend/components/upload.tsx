"use client";

import type React from "react";

import { useState } from "react";
import { UploadIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadProps {
  onUpload: (file: File) => void;
  isTranslating: boolean;
  translatedFileURL: string;
}

export function Upload({
  onUpload,
  isTranslating,
  translatedFileURL,
}: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (translatedFileURL) {
      const link = document.createElement("a");
      link.href = translatedFileURL;
      const extension = file?.name.split(".").pop() || "docx";
      link.setAttribute("download", `translated_file.${extension}`);
      document.body.appendChild(link);
      link.click();
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center space-y-4 ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-3 bg-gray-100 rounded-full">
          <UploadIcon className="h-6 w-6 text-gray-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">
            Drag and drop your file here or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports Excel (.xlsx) and Word (.docx) files
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".docx,.xlsx"
          onChange={handleChange}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          Browse Files
        </Button>
      </div>

      {file && (
        <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md w-full">
          <FileText className="h-5 w-5 text-gray-500" />
          <span className="text-sm truncate">{file.name}</span>
          <Button
            variant="default"
            className="ml-auto"
            disabled={isTranslating}
            onClick={handleSubmit}
          >
            Translate
          </Button>
          <Button
            disabled={!translatedFileURL}
            onClick={handleDownload}
            className="ml-auto bg-green-600 text-white"
            style={{ marginLeft: "auto" }}
          >
            Download Translated File
          </Button>
        </div>
      )}
    </div>
  );
}
