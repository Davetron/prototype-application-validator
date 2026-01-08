export enum ValidationStatus {
  PENDING = 'PENDING',
  COMPLIANT = 'COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  WARNING = 'WARNING',
  UNKNOWN = 'UNKNOWN'
}

export interface PlanningRule {
  id: string;
  name: string;
  description: string;
  benchmark: string;
}

export interface ValidationIssue {
  ruleId: string;
  ruleName: string; // Added to replace static DLR_RULES lookup
  status: ValidationStatus;
  message: string;
  detectedValue?: string;
  suggestion?: string;
  relatedFileNames?: string[]; 
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  content: string; // Base64
  status: 'uploading' | 'ready' | 'analyzing' | 'analyzed' | 'error';
}

export interface AnalysisResponse {
  summary: string;
  issues: ValidationIssue[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}