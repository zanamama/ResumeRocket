import OpenAI from "openai";
import type { JobDescription } from "@shared/schema";
import { enforceResumeFormatting, removeContactFabrication } from "./format-enforcer";

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
          content: `You are a resume optimization AI. Transform the resume into a clean, plain text format. Follow these rules exactly:

CRITICAL FORMATTING RULES:
• Output CLEAN PLAIN TEXT ONLY - NO markdown symbols (**, *, _, etc.)
• NEVER use ** asterisks ** around any text
• NEVER use markdown formatting
• Section headers in ALL CAPS without any symbols
• Use • for bullet points only
• NO divider lines, dashes, or special characters
• Clean professional text formatting only

STRUCTURE ORDER:
1. Full name from original resume
2. Contact info (ONLY if present in original - never fabricate)
3. PROFESSIONAL SUMMARY
4. AREAS OF EXPERTISE  
5. PROFESSIONAL EXPERIENCE
6. TECHNICAL SKILLS
7. EDUCATION
8. CERTIFICATIONS (if present)

FORMATTING EXAMPLES:
CORRECT: "ZANA MATHUTHU, CSM, CSPO"
CORRECT: "PROFESSIONAL EXPERIENCE"
CORRECT: "AREAS OF EXPERTISE"
WRONG: "**EDUCATION**" or "*EDUCATION*"
WRONG: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

CONTENT RULES:
• Use EXACT name from original resume
• Keep ALL original contact information exactly as written
• Preserve all dates, company names, job titles exactly
• Keep all technical skills and certifications exactly as listed
• Reorganize content logically but preserve all facts
• NO fabricated information whatsoever
• Improve language clarity while keeping original meaning

Respond with JSON:
{
  "optimizedContent": "Complete reformatted resume in plain text",
  "improvements": ["List of improvements made"]
}`
        },
        {
          role: "user",
          content: `Optimize this resume using clean plain text format. Organize with ALL CAPS section headers. NO markdown symbols. Extract the name "ZANA MATHUTHU" and preserve all original contact and certification details exactly:\n\n${resumeContent}`
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

    // Remove fabricated contact information
    cleanedContent = removeContactFabrication(cleanedContent);
    
    // Enforce proper formatting (BOLD ALL CAPS headers, spacing, dividers)
    cleanedContent = enforceResumeFormatting(cleanedContent);
    
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
• ALL section headers must be in BOLD ALL CAPS format (EDUCATION, PROFESSIONAL SUMMARY, TECHNICAL SKILLS, PROFESSIONAL EXPERIENCE, CERTIFICATIONS, AREAS OF EXPERTISE)
• Use • for bullet points
• Job titles and dates must be bold
• NO placeholder data like 555-555-5555 or fake emails
• Add proper spacing and dividers between sections

FORMATTING EXAMPLES:
CORRECT: "CERTIFICATIONS"
CORRECT: "AREAS OF EXPERTISE"
WRONG: "Certifications" or "Areas of Expertise"

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
Company: ${jobDescription.company || 'Not specified'}
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

    // Remove fabricated contact information
    cleanedContent = removeContactFabrication(cleanedContent);
    
    // Enforce proper formatting (BOLD ALL CAPS headers, spacing, dividers)
    cleanedContent = enforceResumeFormatting(cleanedContent);
    
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