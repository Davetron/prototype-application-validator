import React, { useCallback } from 'react';
import { UploadedFile } from '../types';

interface FileUploadProps {
  onFileUpload: (files: UploadedFile[]) => void;
  isProcessing: boolean; // Kept for API compatibility, though individual file status is now tracked
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isProcessing }) => {
  
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const files: File[] = Array.from(fileList);
    const uploadedFiles: UploadedFile[] = [];

    const readFile = (file: File): Promise<UploadedFile> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const base64Content = result.split(',')[1];
          
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            content: base64Content,
            status: 'ready'
          });
        };
        reader.readAsDataURL(file);
      });
    };

    // Process all files
    const results = await Promise.all(files.map(readFile));
    onFileUpload(results);

    // Reset input
    event.target.value = '';
  }, [onFileUpload]);

  return (
    <div className="w-full">
      <label 
        className={`
          flex flex-col items-center justify-center w-full h-32 lg:h-48 
          border-2 border-dashed rounded-xl cursor-pointer 
          transition-colors duration-200
          ${isProcessing 
            ? 'bg-slate-50 border-slate-300 opacity-50' 
            : 'bg-white border-blue-300 hover:bg-blue-50 hover:border-blue-500'
          }
        `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 lg:w-10 lg:h-10 mb-3 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-1 text-sm text-slate-600 font-medium">Click to upload files</p>
          <p className="text-xs text-slate-500">Upload multiple PDF, PNG, or JPGs</p>
        </div>
        <input 
          id="dropzone-file" 
          type="file" 
          className="hidden" 
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;