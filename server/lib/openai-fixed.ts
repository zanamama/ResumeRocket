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
• ABSOLUTELY FORBIDDEN: Creating any contact information not in the original resume
• NEVER generate fake phone numbers like "4006850 501650" or "555-555-5555"
• NEVER generate fake emails like "Contact@Contact.com"
• If the original resume has no contact information, skip the contact section completely
• All section headers in BOLD ALL CAPS format
• Use • for bullet points
• Job titles and dates must be bold

STRUCTURE ORDER:
1. FULL NAME (centered, bold)
2. Contact info (ONLY if present in original - no fabricated data)
3. EDUCATION (BOLD ALL CAPS)
4. PROFESSIONAL SUMMARY (BOLD ALL CAPS)
5. TECHNICAL SKILLS (BOLD ALL CAPS)
6. PROFESSIONAL EXPERIENCE (BOLD ALL CAPS)
7. CERTIFICATIONS (BOLD ALL CAPS)
8. AREAS OF EXPERTISE (BOLD ALL CAPS)

Each section must have:
- Section header in BOLD ALL CAPS
- Proper spacing after each section
- Divider line between sections

CRITICAL FORMATTING EXAMPLES:
WRONG: "Certifications" or "certifications" 
CORRECT: "CERTIFICATIONS"

WRONG: "Areas of Expertise"
CORRECT: "AREAS OF EXPERTISE"

WRONG: "Technical Skills"
CORRECT: "TECHNICAL SKILLS"

CONTENT PRESERVATION:
• Keep ALL original factual content exactly as provided
• Only enhance language and formatting of existing content
• ABSOLUTELY NEVER invent, generate, or fabricate any contact information
• If contact details are missing from original, leave them out completely
• Professional Summary: 3-4 sentences with job title, experience years, key skills
• Extract name from content only - if unclear, use "CANDIDATE NAME" placeholder
• Every section header must be formatted as BOLD ALL CAPS with proper spacing
• Add divider lines between sections for professional presentation

Respond with JSON:
{
  "optimizedContent": "Complete reformatted resume in plain text",
  "improvements": ["List of improvements made"]
}`
        },
        {
          role: "user",
          content: `Optimize this resume with BOLD ALL CAPS section headers including CERTIFICATIONS and AREAS OF EXPERTISE. Add proper spacing and dividers between sections:\n\n${resumeContent}`
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

    // Remove any fabricated contact information patterns
    cleanedContent = cleanedContent
      .replace(/^.*\d{7}\s+\d{6}.*$/gm, '')  // Remove strange number patterns like "4006850 501650"
      .replace(/^.*555-555-5555.*$/gm, '')    // Remove placeholder phone numbers
      .replace(/^.*Contact@Contact\.com.*$/gm, '') // Remove placeholder emails
      .replace(/^.*\|\s*\|\s*.*$/gm, '')      // Remove lines with empty pipe separators
      .replace(/^\s*\|\s*$/gm, '')           // Remove standalone pipe characters
      .replace(/\n\s*\n\s*\n/g, '\n\n')     // Clean up excessive line breaks
      .trim();
    
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

    // Remove any fabricated contact information patterns
    cleanedContent = cleanedContent
      .replace(/^.*\d{7}\s+\d{6}.*$/gm, '')  // Remove strange number patterns like "4006850 501650"
      .replace(/^.*555-555-5555.*$/gm, '')    // Remove placeholder phone numbers
      .replace(/^.*Contact@Contact\.com.*$/gm, '') // Remove placeholder emails
      .replace(/^.*\|\s*\|\s*.*$/gm, '')      // Remove lines with empty pipe separators
      .replace(/^\s*\|\s*$/gm, '')           // Remove standalone pipe characters
      .replace(/\n\s*\n\s*\n/g, '\n\n')     // Clean up excessive line breaks
      .trim();
    
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