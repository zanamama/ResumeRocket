import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number; // in bytes
  className?: string;
  children?: React.ReactNode;
  multiple?: boolean;
}

export function FileUpload({
  onFilesChange,
  accept = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
  children,
  multiple = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = multiple ? [...files, ...acceptedFiles].slice(0, maxFiles) : acceptedFiles.slice(0, maxFiles);
    setFiles(newFiles);
    onFilesChange(newFiles);
  }, [files, maxFiles, multiple, onFilesChange]);

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    multiple,
  });

  return (
    <div className={className}>
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed p-12 text-center cursor-pointer transition-colors",
          isDragActive && !isDragReject && "border-ios-blue bg-ios-blue/5",
          isDragReject && "border-red-500 bg-red-50",
          !isDragActive && "border-gray-300 hover:border-ios-blue"
        )}
      >
        <input {...getInputProps()} />
        
        {children || (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <p className="text-ios-text mb-2">
                {isDragActive
                  ? "Drop files here..."
                  : "Drop your files here or click to browse"
                }
              </p>
              <p className="text-ios-secondary text-sm">
                Supports .PDF and .DOCX files up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        )}
      </Card>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-ios-blue" />
                <div>
                  <p className="text-sm font-medium text-ios-text">{file.name}</p>
                  <p className="text-xs text-ios-secondary">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {multiple && files.length < maxFiles && (
            <p className="text-xs text-ios-secondary text-center">
              {files.length} / {maxFiles} files uploaded
            </p>
          )}
        </div>
      )}
    </div>
  );
}
