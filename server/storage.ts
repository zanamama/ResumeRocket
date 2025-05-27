import { resumeJobs, type ResumeJob, type InsertResumeJob, type UpdateResumeJob } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  createResumeJob(job: InsertResumeJob): Promise<ResumeJob>;
  getResumeJob(id: number): Promise<ResumeJob | undefined>;
  updateResumeJob(id: number, updates: UpdateResumeJob): Promise<ResumeJob | undefined>;
  getResumeJobsByEmail(email: string): Promise<ResumeJob[]>;
}

export class MemStorage implements IStorage {
  private resumeJobs: Map<number, ResumeJob>;
  private currentId: number;

  constructor() {
    this.resumeJobs = new Map();
    this.currentId = 1;
  }

  async createResumeJob(insertJob: InsertResumeJob): Promise<ResumeJob> {
    const id = this.currentId++;
    const job: ResumeJob = { 
      ...insertJob,
      email: insertJob.email || null,
      jobDescriptions: insertJob.jobDescriptions || null,
      outputFiles: insertJob.outputFiles || null,
      status: insertJob.status || "pending",
      id,
      createdAt: new Date(),
      completedAt: null,
    };
    this.resumeJobs.set(id, job);
    return job;
  }

  async getResumeJob(id: number): Promise<ResumeJob | undefined> {
    return this.resumeJobs.get(id);
  }

  async updateResumeJob(id: number, updates: UpdateResumeJob): Promise<ResumeJob | undefined> {
    const existingJob = this.resumeJobs.get(id);
    if (!existingJob) {
      return undefined;
    }

    const updatedJob: ResumeJob = {
      ...existingJob,
      ...updates,
      ...(updates.status === 'completed' && { completedAt: new Date() }),
    };

    this.resumeJobs.set(id, updatedJob);
    return updatedJob;
  }

  async getResumeJobsByEmail(email: string): Promise<ResumeJob[]> {
    return Array.from(this.resumeJobs.values()).filter(
      (job) => job.email === email,
    );
  }
}

export const storage = new MemStorage();
