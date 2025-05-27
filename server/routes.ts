import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeJobSchema, updateResumeJobSchema, type JobDescription } from "@shared/schema";
import { parseFileContent, validateFileUpload } from "./lib/file-parser";
import { optimizeResumeStandard, tailorResumeToJob } from "./lib/openai";
import { createGoogleDoc, createMultipleGoogleDocs, generateDownloadZipUrl } from "./lib/google-docs";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create resume optimization job (standard mode)
  app.post("/api/resume/optimize/standard", upload.single('resume'), async (req, res) => {
    try {
      const { email } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      // Create file upload object
      const fileUpload = {
        fileName: file.originalname,
        fileContent: file.buffer.toString('base64'),
        fileType: (file.mimetype === 'application/pdf' ? 'pdf' : 'docx') as 'pdf' | 'docx',
      };

      // Validate file
      const validation = validateFileUpload(fileUpload);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.error });
      }

      // Parse resume content
      const resumeContent = await parseFileContent(fileUpload);

      // Create job record
      const job = await storage.createResumeJob({
        email: email || null,
        resumeFileName: file.originalname,
        resumeContent,
        jobDescriptions: null,
        mode: "standard",
        status: "pending",
        outputFiles: null,
      });

      res.json({ jobId: job.id, status: "created" });

      // Process in background
      processStandardOptimization(job.id);

    } catch (error) {
      console.error("Error creating standard optimization job:", error);
      res.status(500).json({ message: "Failed to create optimization job" });
    }
  });

  // Create resume optimization job (advanced mode)
  app.post("/api/resume/optimize/advanced", upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'jobDescriptions', maxCount: 20 }
  ]), async (req, res) => {
    try {
      const { email } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files.resume || files.resume.length === 0) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      if (!files.jobDescriptions || files.jobDescriptions.length === 0) {
        return res.status(400).json({ message: "At least one job description is required" });
      }

      const resumeFile = files.resume[0];
      const jobFiles = files.jobDescriptions;

      // Parse resume
      const resumeFileUpload = {
        fileName: resumeFile.originalname,
        fileContent: resumeFile.buffer.toString('base64'),
        fileType: (resumeFile.mimetype === 'application/pdf' ? 'pdf' : 'docx') as 'pdf' | 'docx',
      };

      const resumeContent = await parseFileContent(resumeFileUpload);

      // Parse job descriptions
      const jobDescriptions: JobDescription[] = [];
      for (const jobFile of jobFiles) {
        const jobFileUpload = {
          fileName: jobFile.originalname,
          fileContent: jobFile.buffer.toString('base64'),
          fileType: (jobFile.mimetype === 'application/pdf' ? 'pdf' : 'docx') as 'pdf' | 'docx',
        };

        const jobContent = await parseFileContent(jobFileUpload);
        jobDescriptions.push({
          title: jobFile.originalname.replace(/\.(pdf|docx)$/i, ''),
          description: jobContent,
        });
      }

      // Create job record
      const job = await storage.createResumeJob({
        email: email || null,
        resumeFileName: resumeFile.originalname,
        resumeContent,
        jobDescriptions,
        mode: "advanced",
        status: "pending",
        outputFiles: null,
      });

      res.json({ jobId: job.id, status: "created", jobCount: jobDescriptions.length });

      // Process in background
      processAdvancedOptimization(job.id);

    } catch (error) {
      console.error("Error creating advanced optimization job:", error);
      res.status(500).json({ message: "Failed to create optimization job" });
    }
  });

  // Get job status
  app.get("/api/resume/job/:id/status", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getResumeJob(jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json({
        id: job.id,
        status: job.status,
        mode: job.mode,
        outputFiles: job.outputFiles,
        createdAt: job.createdAt,
        completedAt: job.completedAt,
      });
    } catch (error) {
      console.error("Error getting job status:", error);
      res.status(500).json({ message: "Failed to get job status" });
    }
  });

  // Get completed job results
  app.get("/api/resume/job/:id/results", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getResumeJob(jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.status !== "completed") {
        return res.status(400).json({ message: "Job is not completed yet" });
      }

      res.json({
        id: job.id,
        mode: job.mode,
        outputFiles: job.outputFiles,
        completedAt: job.completedAt,
      });
    } catch (error) {
      console.error("Error getting job results:", error);
      res.status(500).json({ message: "Failed to get job results" });
    }
  });

  // Background processing functions
  async function processStandardOptimization(jobId: number) {
    try {
      await storage.updateResumeJob(jobId, { status: "processing" });

      const job = await storage.getResumeJob(jobId);
      if (!job) return;

      // Optimize resume
      const result = await optimizeResumeStandard(job.resumeContent);

      // Create Google Doc
      const docExport = await createGoogleDoc(
        result.optimizedContent,
        `Optimized_${job.resumeFileName.replace(/\.(pdf|docx)$/i, '')}`
      );

      // Update job with results
      await storage.updateResumeJob(jobId, {
        status: "completed",
        outputFiles: {
          type: "standard",
          googleDoc: docExport,
          improvements: result.improvements,
        },
      });

    } catch (error) {
      console.error("Error processing standard optimization:", error);
      await storage.updateResumeJob(jobId, { status: "failed" });
    }
  }

  async function processAdvancedOptimization(jobId: number) {
    try {
      await storage.updateResumeJob(jobId, { status: "processing" });

      const job = await storage.getResumeJob(jobId);
      if (!job || !job.jobDescriptions) return;

      const jobDescriptions = job.jobDescriptions as JobDescription[];
      const tailoredResumes = [];

      // Process each job description
      for (let i = 0; i < jobDescriptions.length; i++) {
        const jobDesc = jobDescriptions[i];
        
        // Tailor resume to job
        const result = await tailorResumeToJob(job.resumeContent, jobDesc);
        
        tailoredResumes.push({
          content: result.optimizedContent,
          title: `${jobDesc.title}_${job.resumeFileName.replace(/\.(pdf|docx)$/i, '')}`,
          jobTitle: jobDesc.title,
          company: jobDesc.company,
          keywordMatch: result.keywordMatch,
          improvements: result.improvements,
        });

        // Update progress
        const progress = Math.round(((i + 1) / jobDescriptions.length) * 100);
        await storage.updateResumeJob(jobId, { 
          status: "processing",
          outputFiles: { progress, completed: i + 1, total: jobDescriptions.length }
        });
      }

      // Create Google Docs for all tailored resumes
      const docExports = await createMultipleGoogleDocs(
        tailoredResumes.map(resume => ({
          content: resume.content,
          title: resume.title,
        }))
      );

      // Generate ZIP download URL
      const zipUrl = generateDownloadZipUrl(docExports);

      // Update job with final results
      await storage.updateResumeJob(jobId, {
        status: "completed",
        outputFiles: {
          type: "advanced",
          resumes: tailoredResumes.map((resume, index) => ({
            ...resume,
            googleDoc: docExports[index],
          })),
          zipDownloadUrl: zipUrl,
          totalResumes: tailoredResumes.length,
          averageKeywordMatch: Math.round(
            tailoredResumes.reduce((sum, r) => sum + (r.keywordMatch || 0), 0) / tailoredResumes.length
          ),
        },
      });

    } catch (error) {
      console.error("Error processing advanced optimization:", error);
      await storage.updateResumeJob(jobId, { status: "failed" });
    }
  }

  const httpServer = createServer(app);
  return httpServer;
}
