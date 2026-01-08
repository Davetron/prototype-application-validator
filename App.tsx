import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ValidationResults from './components/ValidationResults';
import Auth from './components/Auth';
import { UploadedFile, AnalysisResponse } from './types';
import { analyzeApplication } from './services/geminiService';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ANALYSIS_STAGES } from './constants';

// Main Application Logic
const DLRValidatorApp: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [selectedPreviewFileId, setSelectedPreviewFileId] = useState<string | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const { isAuthenticated, isLoading } = useAuth();

  // Progress Simulation Effect
  useEffect(() => {
    let interval: number;
    if (isAnalyzing) {
      setCurrentStageIndex(0);
      interval = window.setInterval(() => {
        setCurrentStageIndex(prev => (prev + 1) % ANALYSIS_STAGES.length);
      }, 3500); // Rotate message every 3.5 seconds
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleFilesAdded = (newFiles: UploadedFile[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRunAnalysis = async () => {
    if (files.length === 0) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSelectedPreviewFileId(null); 
    
    setFiles(prev => prev.map(f => ({ ...f, status: 'analyzing' })));

    try {
      const result = await analyzeApplication(files);
      setAnalysisResult(result);
      setFiles(prev => prev.map(f => ({ ...f, status: 'analyzed' })));
    } catch (err) {
      console.error(err);
      setFiles(prev => prev.map(f => ({ ...f, status: 'error' })));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (selectedPreviewFileId === id) setSelectedPreviewFileId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <Auth />
      </div>
    );
  }

  const selectedPreviewFile = files.find(f => f.id === selectedPreviewFileId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-0">
        
        {/* Empty State */}
        {files.length === 0 && (
          <div className="max-w-2xl mx-auto text-center mt-12 animate-fade-in flex-1">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
              Validate your planning application
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Upload your full application pack (plans, reports, elevations). The AI will analyze them as a group to check compliance with DLR regulations.
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
               <h3 className="font-semibold text-slate-900 mb-6">Start by uploading your documents</h3>
               <FileUpload onFileUpload={handleFilesAdded} isProcessing={false} />
            </div>
          </div>
        )}

        {/* Dashboard Layout */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-full min-h-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1 min-h-0">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                  <h3 className="font-semibold text-slate-900 text-sm lg:text-base">Pack Content ({files.length})</h3>
                  <button onClick={handleReset} className="text-xs text-red-500 hover:text-red-700 font-medium">Clear All</button>
                </div>
                
                <div className="overflow-y-auto p-2 space-y-2 flex-1 min-h-0 bg-slate-50/30">
                  {files.map(file => (
                    <div 
                      key={file.id}
                      onClick={() => setSelectedPreviewFileId(file.id)}
                      className={`
                        group flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                        ${selectedPreviewFileId === file.id 
                          ? 'bg-blue-50 border-blue-200 shadow-sm' 
                          : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                        }
                      `}
                    >
                      <div className="shrink-0">
                         {file.status === 'analyzed' ? (
                           <div className="h-8 w-8 bg-green-100 text-green-600 rounded flex items-center justify-center text-xs font-bold">PDF</div>
                         ) : (
                           <div className="h-8 w-8 bg-slate-100 text-slate-500 rounded flex items-center justify-center text-xs font-bold">DOC</div>
                         )}
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p className={`text-sm font-medium truncate ${selectedPreviewFileId === file.id ? 'text-blue-900' : 'text-slate-900'}`}>
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">
                           {(file.content.length * 0.75 / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <div className="pt-2">
                     <FileUpload onFileUpload={handleFilesAdded} isProcessing={isAnalyzing} />
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
                  <button
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing || files.length === 0}
                    className={`
                      w-full py-3 px-4 rounded-xl font-semibold shadow-sm
                      flex items-center justify-center gap-2
                      transition-all duration-200
                      ${isAnalyzing 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:transform active:scale-[0.98]'
                      }
                    `}
                  >
                    {isAnalyzing ? "Analyzing..." : "Validate Pack"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8 flex flex-col h-full min-h-0">
              <div className="flex gap-4 mb-4 shrink-0">
                <button 
                  onClick={() => setSelectedPreviewFileId(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${!selectedPreviewFileId ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                >
                  Validation Report
                </button>
              </div>

              <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative flex flex-col min-h-0">
                
                {/* REASSURING LOADING STATE */}
                {isAnalyzing && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 transition-all duration-500">
                      <div className="w-full max-w-md px-8 text-center">
                        <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
                          <div 
                            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-700 ease-in-out"
                            style={{ width: `${((currentStageIndex + 1) / ANALYSIS_STAGES.length) * 100}%` }}
                          />
                        </div>
                        
                        <div className="h-16 flex items-center justify-center">
                          <h3 className="text-lg font-medium text-slate-900 animate-pulse key={currentStageIndex}">
                            {ANALYSIS_STAGES[currentStageIndex]}
                          </h3>
                        </div>
                        
                        <p className="text-slate-400 text-xs mt-8 uppercase tracking-widest font-bold">
                          DLR Technical Validation in Progress
                        </p>
                      </div>
                   </div>
                )}

                {selectedPreviewFileId && selectedPreviewFile ? (
                   <div className="w-full h-full flex flex-col min-h-0">
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                        <span className="font-semibold text-slate-700 truncate">{selectedPreviewFile.name}</span>
                        <button onClick={() => setSelectedPreviewFileId(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-1 bg-slate-100 p-4 flex items-center justify-center overflow-hidden">
                        {selectedPreviewFile.type.startsWith('image/') ? (
                          <div className="w-full h-full flex items-center justify-center overflow-auto">
                            <img src={`data:${selectedPreviewFile.type};base64,${selectedPreviewFile.content}`} alt="Preview" className="max-w-full max-h-full shadow-lg rounded-sm" />
                          </div>
                        ) : (
                          <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                            <p className="text-slate-900 font-semibold">{selectedPreviewFile.name}</p>
                            <p className="text-slate-500 text-sm mt-1">PDF visualization is processed in the analysis layer.</p>
                          </div>
                        )}
                      </div>
                   </div>
                ) : (
                  analysisResult ? (
                    <ValidationResults report={analysisResult} />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-slate-50 p-8 text-center min-h-0">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-blue-100">
                        <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Technical Review</h3>
                      <p className="text-slate-500 max-w-sm mt-3 leading-relaxed">
                        Upload your application pack and click 'Validate' to perform a strict Article 17-26 compliance check.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

// Root App Component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <DLRValidatorApp />
    </AuthProvider>
  );
};

export default App;