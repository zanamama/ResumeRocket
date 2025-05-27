export interface JobStatus {
  id: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  mode: 'standard' | 'advanced';
  outputFiles?: any;
  createdAt: string;
  completedAt?: string;
}

export interface StandardResult {
  type: 'standard';
  googleDoc: {
    docUrl: string;
    pdfUrl: string;
    docId: string;
  };
  improvements: string[];
}

export interface AdvancedResult {
  type: 'advanced';
  resumes: Array<{
    content: string;
    title: string;
    jobTitle: string;
    company?: string;
    keywordMatch?: number;
    improvements: string[];
    googleDoc: {
      docUrl: string;
      pdfUrl: string;
      docId: string;
    };
  }>;
  zipDownloadUrl: string;
  totalResumes: number;
  averageKeywordMatch: number;
}

export interface FileUploadData {
  fileName: string;
  fileContent: string; // base64
  fileType: 'pdf' | 'docx';
}

export interface ProcessingProgress {
  progress: number;
  completed: number;
  total: number;
  currentJob?: string;
}
