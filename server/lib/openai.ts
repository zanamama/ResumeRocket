import OpenAI from "openai";
import type { JobDescription } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface ResumeOptimizationResult {
  optimizedContent: string;
  improvements: string[];
  keywordMatch?: number;
}

export async function optimizeResumeStandard(resumeContent: string): Promise<ResumeOptimizationResult> {
  try {
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
    
    return {
      optimizedContent: result.optimizedContent || resumeContent,
      improvements: result.improvements || [],
    };
  } catch (error) {
    throw new Error("Failed to optimize resume: " + (error as Error).message);
  }
}

export async function tailorResumeToJob(
  resumeContent: string, 
  jobDescription: JobDescription
): Promise<ResumeOptimizationResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional resume tailoring expert. Using the provided job description and resume, create a version that is perfectly tailored to the specific job.

Guidelines:
- Include relevant keywords from the job listing naturally
- Match skills with job requirements
- Highlight relevant accomplishments and experience
- Adjust the professional summary to align with the role
- Reorder or emphasize sections based on job priorities
- Maintain truthfulness - don't add false experience
- Calculate a keyword match percentage

Respond with JSON in this format:
{
  "optimizedContent": "The complete tailored resume text",
  "improvements": ["List of specific tailoring changes made"],
  "keywordMatch": 85
}`
        },
        {
          role: "user",
          content: `Job Title: ${jobDescription.title}
Company: ${jobDescription.company || "Not specified"}

Job Description:
${jobDescription.description}

Resume to tailor:
${resumeContent}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      optimizedContent: result.optimizedContent || resumeContent,
      improvements: result.improvements || [],
      keywordMatch: result.keywordMatch || 0,
    };
  } catch (error) {
    throw new Error("Failed to tailor resume: " + (error as Error).message);
  }
}
