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
          content: `You are a resume expert. Reformat and enhance the resume provided below to follow this professional structure and formatting. Improve clarity, consistency, and impact without changing the factual content.

Use the following structure, but ONLY include sections that exist in the original resume:

1. **Header** (always include)
   - Name (bold and prominent)
   - Contact information (address, phone number, email) in one line below the name

2. **EDUCATION** (only if education information exists in original)
   - Degree and field of study, with dates (YYYY–YYYY)
   - University name and location
   - Optional: honors or awards

3. **PROFESSIONAL SUMMARY** (only if summary/objective exists in original)
   - A concise paragraph summarizing the candidate's experience, strengths, and technical background

4. **TECHNICAL SKILLS** (only if skills/technologies are listed in original)
   - Comma-separated list of key programming languages, tools, frameworks, and methodologies

5. **PROFESSIONAL EXPERIENCE** (only if work experience exists in original)
   For each job:
   - Company name | Location (Dates)
   - Job title
   - 4–8 concise bullet points describing duties, technologies used, achievements, and results
   - List jobs in reverse chronological order

6. **PROJECTS** (only if projects are mentioned in original)
   For each project:
   - Project name | Location | Dates
   - Role title
   - Brief description of contribution and goals
   - Technologies used (clearly listed)
   - Link if available

7. **Additional Sections** (only if they exist in original, such as "AREAS OF EXPERTISE", "CERTIFICATIONS", etc.)
   - Use the exact section name from the original
   - Format the content appropriately

CRITICAL: Do not create sections that don't exist in the original resume. Only format and enhance what is actually provided.

Rules:
- Keep formatting professional and consistent
- Use section headings in ALL CAPS (no ## or ** markdown formatting)
- Use the actual name from the resume, not "[Your Name]" placeholder
- Use actual contact information provided, not placeholders
- Use impactful, action-oriented language for responsibilities and achievements
- Do not include personal photos or creative design elements
- Keep ALL original company names, job titles, dates, and locations EXACTLY as written
- Keep ALL original education details, degrees, and institutions EXACTLY as written
- Keep ALL original metrics, numbers, percentages, and achievements EXACTLY as written
- Keep ALL original technical skills and certifications EXACTLY as listed
- DO NOT add any new information, metrics, or claims not in the original
- DO NOT change any factual details whatsoever
- DO NOT use markdown formatting (##, **, etc.) - use plain text with proper structure
- DO NOT add placeholder text - only use actual information from the resume

Respond with JSON in this format:
{
  "optimizedContent": "The complete reformatted resume following the structure above",
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
