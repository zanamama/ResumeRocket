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
          content: `You are an elite resume optimization specialist with 15+ years of experience helping professionals land executive positions. Transform the provided resume into a compelling, results-driven document that showcases measurable achievements and positions the candidate as a top-tier professional.

CRITICAL FORMATTING REQUIREMENTS - Follow this EXACT structure:

[FULL NAME]
[Phone] | [Email] | [City, State ZIP] | [LinkedIn URL if provided]

EDUCATION
[Degree] | [Institution] | [Graduation Year]
• [Relevant honors, certifications, or notable achievements only if significant]

PROFESSIONAL SUMMARY
[Create a polished 3-4 line summary based ONLY on information provided in the original resume. Focus on:
- Experience level and background as stated in the original
- Skills and expertise already mentioned in the resume
- Professional strengths evident from their actual work history
- Career progression shown in their employment history]

TECHNICAL SKILLS
[Organize by relevant categories. Use industry-standard terminology and group logically]

PROFESSIONAL EXPERIENCE

[Company Name] | [City, State] | [Month Year - Month Year]
[Job Title]
• [Enhanced version of original responsibility using stronger action verbs]
• [Improved articulation of existing skills and projects mentioned]
• [Better phrased version of original accomplishments and duties]
• [Professional rewrite of existing content without adding new claims]

TRANSFORMATION GUIDELINES:
1. PRESERVE ORIGINAL CONTENT: Only enhance what's already provided - never add fabricated details, metrics, or achievements
2. POWER VERBS: Replace weak verbs with stronger action verbs while keeping the same meaning
3. PROFESSIONAL LANGUAGE: Elevate the language to sound more professional and impactful
4. INDUSTRY KEYWORDS: Use appropriate industry terminology for the candidate's field
5. STRUCTURE IMPROVEMENT: Organize information clearly and consistently
6. CLARITY ENHANCEMENT: Make existing accomplishments clearer and more compelling

CRITICAL ENHANCEMENT RULES:
- NEVER add metrics, numbers, or achievements not in the original resume
- ONLY enhance existing content by improving word choice and structure
- Keep all original company names, dates, and factual information exactly as provided
- Focus on better articulation of existing responsibilities and accomplishments
- Maintain complete truthfulness to the source material
- Use present tense for current role, past tense for previous roles
- If quantifiable results aren't in the original, don't add them

Respond with JSON in this format:
{
  "optimizedContent": "The complete optimized resume following the exact format above",
  "improvements": ["Specific list of impactful improvements made to transform this resume"]
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
