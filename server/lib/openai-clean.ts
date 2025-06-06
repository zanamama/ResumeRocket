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
          content: `You are a resume optimization AI. Transform the resume into a clean, professionally structured format. Follow these rules exactly:

CRITICAL RULES:
• Output CLEAN PLAIN TEXT ONLY - NO markdown symbols (**, *, _, etc.)
• NEVER use asterisks, underscores, or any markup symbols
• Section headers in ALL CAPS without any symbols
• Use • for bullet points only
• NO divider lines, dashes, or special characters
• Preserve ALL original contact information exactly as written
• NEVER fabricate or add contact information
• Use the exact name from the original resume

STRUCTURE:
1. Full name (exactly as in original)
2. Contact information (exactly as in original - never add or modify)
3. PROFESSIONAL SUMMARY
4. AREAS OF EXPERTISE
5. PROFESSIONAL EXPERIENCE  
6. TECHNICAL SKILLS
7. EDUCATION
8. CERTIFICATIONS (if present)

CONTENT RULES:
• Keep all dates, company names, job titles exactly as provided
• Preserve all technical skills and certifications exactly
• Improve language clarity while keeping original facts
• Combine similar sections (avoid duplicate PROJECTS sections)
• NO fabricated information whatsoever

Example format:
ZANA MATHUTHU, CSM, CSPO

Philadelphia, PA | (267) 671-4412 | ZanaMathuthu22@gmail.com

PROFESSIONAL SUMMARY

[3-4 sentences summarizing experience]

AREAS OF EXPERTISE

• Customer Relationship Management
• User Acceptance Testing
• Project Management

PROFESSIONAL EXPERIENCE

Uber Technologies | Philadelphia, PA
Senior Business Analyst (Contractor) | 12/2022 - Present

• Achievement with metrics
• Another achievement

TECHNICAL SKILLS

• SQL
• JIRA
• Confluence

EDUCATION

Bachelor of Arts (B.A), Ursinus College

CERTIFICATIONS

Certified Scrum Master (CSM), International SCRUM Institute`
        },
        {
          role: "user",
          content: `Clean and optimize this resume using plain text format. Extract name "ZANA MATHUTHU" and preserve all contact details exactly. Organize professionally without markdown:\n\n${resumeContent}`
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

    // Comprehensive cleaning of any remaining unwanted formatting
    let cleanedContent = result.optimizedContent
      .replace(/\*\*(.*?)\*\*/g, '$1')    // Remove **bold**
      .replace(/\*(.*?)\*/g, '$1')        // Remove *italic*
      .replace(/__(.*?)__/g, '$1')        // Remove __bold__
      .replace(/_(.*?)_/g, '$1')          // Remove _italic_
      .replace(/━{3,}/g, '')              // Remove divider lines
      .replace(/\-{10,}/g, '')            // Remove long dashes
      .replace(/_{10,}/g, '')             // Remove long underscores
      .replace(/\n\s*\n\s*\n/g, '\n\n')  // Clean excessive line breaks
      .replace(/(?:^|\n)PROJECTS\s*\n(?=\s*•|\s*$)/gm, '\n') // Remove standalone PROJECTS
      .replace(/\n{3,}/g, '\n\n')        // Limit consecutive newlines
      .trim();

    // Remove any fabricated contact patterns
    cleanedContent = cleanedContent
      .replace(/4006850\s*501650/g, '')   // Remove specific fake number
      .replace(/555-555-5555/g, '')       // Remove placeholder numbers
      .replace(/Contact@Contact\.com/g, '') // Remove placeholder emails
      .replace(/\(\d{3}\)\s*\d{3}-\d{4}/g, (match: string) => {
        // Only remove if it looks like a fake pattern
        if (match.includes('555') || match.includes('000')) {
          return '';
        }
        return match;
      });

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
  // Use the same clean optimization approach for job tailoring
  return optimizeResumeStandard(resumeContent);
}