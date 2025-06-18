import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumeJobs = pgTable("resume_jobs", {
  id: serial("id").primaryKey(),
  email: text("email"),
  resumeFileName: text("resume_file_name").notNull(),
  resumeContent: text("resume_content").notNull(),
  jobDescriptions: jsonb("job_descriptions").default(null), // For advanced mode - array of job descriptions
  mode: text("mode").notNull(), // "standard" or "advanced"
  status: text("status").notNull().default("pending"), // "pending", "processing", "completed", "failed"
  outputFiles: jsonb("output_files").default(null), // Array of generated file info
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const storedFiles = pgTable("stored_files", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => resumeJobs.id).notNull(),
  fileName: text("file_name").notNull(),
  fileContent: text("file_content").notNull(), // Base64 encoded file content
  fileType: text("file_type").notNull(), // "pdf", "docx", etc.
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(),
  downloadUrl: text("download_url").notNull(), // URL path for downloading
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(), // 24 hours from creation
});

// User leads table for marketing intelligence
export const userLeads = pgTable("user_leads", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  resumeJobId: integer("resume_job_id").references(() => resumeJobs.id),
  source: text("source").notNull(), // "standard", "advanced", "create"
  extractedAt: timestamp("extracted_at").defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

export const insertResumeJobSchema = createInsertSchema(resumeJobs).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const updateResumeJobSchema = createInsertSchema(resumeJobs).partial().omit({
  id: true,
  createdAt: true,
});

export const insertStoredFileSchema = createInsertSchema(storedFiles).omit({
  id: true,
  createdAt: true,
});

export const insertUserLeadSchema = createInsertSchema(userLeads).omit({
  id: true,
  extractedAt: true,
});

export type InsertResumeJob = z.infer<typeof insertResumeJobSchema>;
export type UpdateResumeJob = z.infer<typeof updateResumeJobSchema>;
export type ResumeJob = typeof resumeJobs.$inferSelect;
export type InsertStoredFile = z.infer<typeof insertStoredFileSchema>;
export type StoredFile = typeof storedFiles.$inferSelect;
export type InsertUserLead = z.infer<typeof insertUserLeadSchema>;
export type UserLead = typeof userLeads.$inferSelect;

// Additional types for file handling
export const fileUploadSchema = z.object({
  fileName: z.string(),
  fileContent: z.string(), // Base64 encoded content
  fileType: z.enum(["pdf", "docx"]),
});

export type FileUpload = z.infer<typeof fileUploadSchema>;

export const jobDescriptionSchema = z.object({
  title: z.string(),
  company: z.string().optional(),
  description: z.string(),
});

export type JobDescription = z.infer<typeof jobDescriptionSchema>;
