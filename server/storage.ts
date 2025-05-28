import { resumeJobs, type ResumeJob, type InsertResumeJob, type UpdateResumeJob } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  createResumeJob(job: InsertResumeJob): Promise<ResumeJob>;
  getResumeJob(id: number): Promise<ResumeJob | undefined>;
  updateResumeJob(id: number, updates: UpdateResumeJob): Promise<ResumeJob | undefined>;
  getResumeJobsByEmail(email: string): Promise<ResumeJob[]>;
}

export class DatabaseStorage implements IStorage {
  async createResumeJob(insertJob: InsertResumeJob): Promise<ResumeJob> {
    const [job] = await db
      .insert(resumeJobs)
      .values({
        ...insertJob,
        email: insertJob.email || null,
        jobDescriptions: insertJob.jobDescriptions || null,
        outputFiles: insertJob.outputFiles || null,
        status: insertJob.status || "pending",
        createdAt: new Date(),
        completedAt: null,
      })
      .returning();
    return job;
  }

  async getResumeJob(id: number): Promise<ResumeJob | undefined> {
    const [job] = await db.select().from(resumeJobs).where(eq(resumeJobs.id, id));
    return job || undefined;
  }

  async updateResumeJob(id: number, updates: UpdateResumeJob): Promise<ResumeJob | undefined> {
    const [job] = await db
      .update(resumeJobs)
      .set({
        ...updates,
        ...(updates.status === 'completed' && { completedAt: new Date() }),
      })
      .where(eq(resumeJobs.id, id))
      .returning();
    return job || undefined;
  }

  async getResumeJobsByEmail(email: string): Promise<ResumeJob[]> {
    return await db.select().from(resumeJobs).where(eq(resumeJobs.email, email));
  }
}

export const storage = new DatabaseStorage();
