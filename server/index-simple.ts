import express from "express";
import { createServer } from "http";
import OpenAI from "openai";
import multer from "multer";

const app = express();
const server = createServer(app);

// Basic middleware
app.use(express.json());
app.use(express.static("client/dist"));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Initialize OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Simple in-memory storage
const jobs = new Map();
let jobIdCounter = 1;

// Standard optimization endpoint
app.post("/api/resume/optimize/standard", upload.single('resume'), async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const jobId = jobIdCounter++;
    
    // Store job
    jobs.set(jobId, {
      id: jobId,
      status: "pending",
      mode: "standard",
      email: email || null,
      fileName: file.originalname,
      createdAt: new Date(),
    });

    res.json({ jobId, status: "created" });

    // Process in background
    setTimeout(async () => {
      try {
        jobs.set(jobId, { ...jobs.get(jobId), status: "processing" });

        // Simple text extraction (placeholder for actual PDF/DOCX parsing)
        const resumeContent = file.buffer.toString('utf-8');

        // Call OpenAI
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a professional resume optimization expert. Take the provided resume and make it a 10/10 professional document. 

Guidelines:
- Add formal structure with clear sections
- Enhance weak phrasing with powerful action verbs
- Highlight results with specific metrics where possible
- Rewrite for clarity and impact
- Ensure ATS-friendly formatting
- Use professional language throughout
- Maintain truthfulness - don't add false information

Respond with JSON in this format:
{
  "optimizedContent": "The complete optimized resume text",
  "improvements": ["List of specific improvements made"]
}`
            },
            {
              role: "user",
              content: `Please optimize this resume:\n\n${resumeContent}`
            }
          ],
          response_format: { type: "json_object" },
        });

        const result = JSON.parse(response.choices[0].message.content || "{}");
        
        // Mock Google Doc creation
        const docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        jobs.set(jobId, {
          ...jobs.get(jobId),
          status: "completed",
          completedAt: new Date(),
          outputFiles: {
            type: "standard",
            googleDoc: {
              docUrl: `https://docs.google.com/document/d/${docId}/edit`,
              pdfUrl: `https://docs.google.com/document/d/${docId}/export?format=pdf`,
              docId: docId,
            },
            improvements: result.improvements || [],
          }
        });

      } catch (error) {
        console.error("Processing error:", error);
        jobs.set(jobId, { ...jobs.get(jobId), status: "failed" });
      }
    }, 2000);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create optimization job" });
  }
});

// Get job status
app.get("/api/resume/job/:id/status", (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.get(jobId);

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
});

// Get job results
app.get("/api/resume/job/:id/results", (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.get(jobId);

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
});

// Serve frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/client/dist/index.html");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});