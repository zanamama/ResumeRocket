import { apiRequest } from "./queryClient";
import type { FileUploadData, JobStatus } from "./types";

export const api = {
  // Standard mode optimization
  optimizeResumeStandard: async (resumeFile: File, email?: string): Promise<{ jobId: number; status: string }> => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    if (email) {
      formData.append('email', email);
    }

    const response = await fetch('/api/resume/optimize/standard', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to start optimization');
    }

    return response.json();
  },

  // Advanced mode optimization
  optimizeResumeAdvanced: async (
    resumeFile: File, 
    jobFiles: File[], 
    email?: string
  ): Promise<{ jobId: number; status: string; jobCount: number }> => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    
    jobFiles.forEach(file => {
      formData.append('jobDescriptions', file);
    });
    
    if (email) {
      formData.append('email', email);
    }

    const response = await fetch('/api/resume/optimize/advanced', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to start optimization');
    }

    return response.json();
  },

  // Get job status
  getJobStatus: async (jobId: number): Promise<JobStatus> => {
    const response = await apiRequest('GET', `/api/resume/job/${jobId}/status`);
    return response.json();
  },

  // Get job results
  getJobResults: async (jobId: number): Promise<any> => {
    const response = await apiRequest('GET', `/api/resume/job/${jobId}/results`);
    return response.json();
  },
};
