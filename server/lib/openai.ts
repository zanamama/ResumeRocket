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
          content: `You are a professional resume formatter and language enhancer. Your ONLY job is to take the provided resume and improve its formatting, structure, and language while keeping 100% of the original content intact.

CRITICAL RULES - NEVER VIOLATE THESE:
1. Keep ALL original company names, job titles, dates, and locations EXACTLY as written
2. Keep ALL original education details, degrees, and institutions EXACTLY as written  
3. Keep ALL original metrics, numbers, percentages, and achievements EXACTLY as written
4. Keep ALL original technical skills and certifications EXACTLY as listed
5. DO NOT add any new information, metrics, or claims not in the original
6. DO NOT change any factual details whatsoever

YOUR ONLY TASKS:
- Fix formatting and structure for better readability
- Improve sentence flow and professional language
- Organize sections clearly (Education, Professional Summary, Technical Skills, Professional Experience)
- Enhance action verbs while keeping the same meaning
- Ensure consistent formatting throughout

REQUIRED FORMAT:

[EXACT NAME FROM ORIGINAL]
[EXACT CONTACT INFO FROM ORIGINAL]

EDUCATION
[EXACT EDUCATION INFO FROM ORIGINAL - same degrees, schools, dates]

PROFESSIONAL SUMMARY  
[Rewrite any existing summary/objective using better language, or create a brief summary based only on the actual work history provided]

TECHNICAL SKILLS
[EXACT SKILLS FROM ORIGINAL - just organize them better]

PROFESSIONAL EXPERIENCE

[EXACT COMPANY NAME] | [EXACT LOCATION] | [EXACT DATES]
[EXACT JOB TITLE]
• [Original bullet point rewritten with better action verbs and flow]
• [Keep all original metrics, achievements, and specific details]
• [Only improve language - never add new claims]

REMEMBER: You are a FORMATTER and LANGUAGE ENHANCER only. Do not act as a career consultant or content creator. Preserve every single factual detail from the original resume.

Respond with JSON in this format:
{
  "optimizedContent": "The reformatted resume with improved language but identical factual content",
  "improvements": ["List of formatting and language improvements made without changing facts"]
}`
        },
        {
          role: "user",
          content: `Please optimize this resume into a professional, ATS-friendly format:\n\n${resumeContent}`
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
          content: `You are a professional resume tailoring expert. Transform the resume to perfectly match the job requirements while maintaining professional structure.

Structure Requirements (same as standard optimization):
- Name and Contact Information
- EDUCATION section
- PROFESSIONAL SUMMARY (tailored to the specific role)
- TECHNICAL SKILLS (emphasizing job-relevant technologies)
- PROFESSIONAL EXPERIENCE with bullet points
- PROJECTS section if applicable

Tailoring Guidelines:
- Integrate job keywords naturally throughout content
- Prioritize relevant experience and skills
- Adjust professional summary to match role requirements
- Emphasize accomplishments that align with job needs
- Use bullet points (•) with strong action verbs
- Include specific metrics and quantified results
- Maintain truthfulness - enhance but don't fabricate

Respond with JSON in this format:
{
  "optimizedContent": "The complete tailored resume with proper professional structure",
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
