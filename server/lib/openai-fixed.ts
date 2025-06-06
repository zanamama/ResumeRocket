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
          content: `You are a resume optimization AI. Transform the resume into a professionally formatted, plain text resume. Follow these rules exactly:

CRITICAL FORMATTING RULES:
• Output PLAIN TEXT ONLY - NO markdown formatting (no **, *, _, etc.)
• PRESERVE EXACT original contact information (phone, email, location) - NEVER add placeholders
• All section headers in BOLD ALL CAPS format
• Use • for bullet points
• Job titles and dates must be bold
• NO placeholder data like 555-555-5555 or fake emails

STRUCTURE ORDER:
1. FULL NAME (centered, bold)
2. Contact info (use ONLY original contact details - phone, email, location)
3. EDUCATION
4. PROFESSIONAL SUMMARY
5. TECHNICAL SKILLS
6. PROFESSIONAL EXPERIENCE
7. CERTIFICATIONS
8. AREAS OF EXPERTISE

CONTENT PRESERVATION:
• Keep ALL original factual content
• Only enhance language and formatting
• Never invent companies, dates, or contact info
• Professional Summary: 3-4 sentences with job title, experience years, key skills

Respond with JSON:
{
  "optimizedContent": "Complete reformatted resume in plain text",
  "improvements": ["List of improvements made"]
}`
        },
        {
          role: "user",
          content: `Optimize this resume preserving ALL original contact information:\n\n${resumeContent}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response content received from AI");
    }

    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      throw new Error("Invalid JSON response from AI optimization");
    }

    if (!result.optimizedContent) {
      throw new Error("AI failed to generate optimized content");
    }

    // Clean any remaining markdown formatting
    let cleanedContent = result.optimizedContent
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove ** bold markdown
      .replace(/\*(.*?)\*/g, '$1')      // Remove * italic markdown
      .replace(/__(.*?)__/g, '$1')      // Remove __ bold markdown
      .replace(/_(.*?)_/g, '$1');       // Remove _ italic markdown
    
    return {
      optimizedContent: cleanedContent,
      improvements: result.improvements || ["Resume structure and formatting enhanced"],
    };
  } catch (error) {
    console.error("Resume optimization error:", error);
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
          content: `You are a resume optimization AI. Transform the resume to be tailored for the specific job while preserving original contact information.

CRITICAL FORMATTING RULES:
• Output PLAIN TEXT ONLY - NO markdown formatting (no **, *, _, etc.)
• PRESERVE EXACT original contact information (phone, email, location) - NEVER add placeholders
• All section headers in BOLD ALL CAPS format
• Use • for bullet points
• Job titles and dates must be bold
• NO placeholder data like 555-555-5555 or fake emails

TAILORING RULES:
• Emphasize skills and experience relevant to the job requirements
• Use keywords from the job description naturally
• Quantify achievements where possible
• Maintain original factual content while optimizing presentation

Respond with JSON:
{
  "optimizedContent": "Complete tailored resume in plain text",
  "improvements": ["List of tailoring improvements made"],
  "keywordMatch": 85
}`
        },
        {
          role: "user",
          content: `Tailor this resume for the job position while preserving ALL original contact information:

RESUME:
${resumeContent}

JOB DESCRIPTION:
Position: ${jobDescription.title}
Company: ${jobDescription.company}
Location: ${jobDescription.location}
Requirements: ${jobDescription.requirements?.join(', ')}
Description: ${jobDescription.description}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response content received from AI");
    }

    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      throw new Error("Invalid JSON response from AI optimization");
    }

    if (!result.optimizedContent) {
      throw new Error("AI failed to generate optimized content");
    }

    // Clean any remaining markdown formatting
    let cleanedContent = result.optimizedContent
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove ** bold markdown
      .replace(/\*(.*?)\*/g, '$1')      // Remove * italic markdown
      .replace(/__(.*?)__/g, '$1')      // Remove __ bold markdown
      .replace(/_(.*?)_/g, '$1');       // Remove _ italic markdown
    
    return {
      optimizedContent: cleanedContent,
      improvements: result.improvements || ["Resume tailored for position"],
      keywordMatch: result.keywordMatch || 75,
    };
  } catch (error) {
    console.error("Resume tailoring error:", error);
    throw new Error("Failed to tailor resume: " + (error as Error).message);
  }
}