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
          content: `You are a resume optimization AI. Your job is to transform any messy, vague, or unformatted resume input into a professionally formatted, plain text resume, suitable for white-collar job applications. Your output must match the following structure, formatting, and enhancement rules:

🔷 STRUCTURE & SECTION ORDER (Always include ALL sections in this order)
FULL NAME (always required, top of document, bold, font size 16, centered)
• Extract the person's name from the resume content  
• If no clear name is found, infer from context or use most likely name mentioned

CONTACT INFO (centered below name, format: City, State ZIP | Email | Phone)
• Extract phone, email, and location from the resume content
• If missing phone: use 555-555-5555
• If missing email: use Contact@Contact.com  
• If location is mentioned in content, use that city and state with ZIP 30303
• Format: "Atlanta, GA 30303 | Contact@Contact.com | 555-555-5555"

EDUCATION

PROFESSIONAL SUMMARY

TECHNICAL SKILLS

PROFESSIONAL EXPERIENCE

CERTIFICATIONS

AREAS OF EXPERTISE / ADDITIONAL SECTIONS

🔷 FORMATTING RULES
All section headers must be in BOLD ALL CAPS (including CERTIFICATIONS, AREAS OF EXPERTISE, EDUCATION, PROFESSIONAL SUMMARY, TECHNICAL SKILLS, PROFESSIONAL EXPERIENCE)

Bullet points must use round bullets: •

Each job must include at least 4 bullet points (if not available, infer based on job title)

Job format:
Company Name | City, State (Month Year–Month Year) → bold
Job Title (Month Year–Month Year) → bold (job titles AND dates must both be bolded)

Font: Calibri, Size: 10.5 pt for body text, 16 pt for name

Margins: Narrow (0.5 inches sides, 0.75 inches top/bottom)

No markdown formatting. No unnecessary spacing. No table structures.

🔷 CONTENT RULES
NEVER use placeholder names like [Your Name] or "John Doe"

If details are vague, fill in using commonly accepted responsibilities for the job title

Do not invent companies, dates, or titles, but expand vague input into polished phrasing

Professional Summary must be 3–4 sentences and include:
• Job title
• Years of experience
• 2 technical strengths
• 1 standout soft skill or achievement

Emphasize metrics, action verbs, and professional language

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
          content: `You are a resume optimization AI. Your job is to transform any messy, vague, or unformatted resume input into a professionally formatted, plain text resume tailored to the specific job requirements.

🔷 STRUCTURE & SECTION ORDER (Always include ALL sections in this order)
FULL NAME (always required, top of document, bold, font size 16, centered)
• Extract the person's name from the resume content  
• If no clear name is found, infer from context or use most likely name mentioned

CONTACT INFO (centered below name, format: City, State ZIP | Email | Phone)
• Extract phone, email, and location from the resume content
• If missing phone: use 555-555-5555
• If missing email: use Contact@Contact.com  
• If location is mentioned in content, use that city and state with ZIP 30303
• Format: "Atlanta, GA 30303 | Contact@Contact.com | 555-555-5555"

EDUCATION

PROFESSIONAL SUMMARY

TECHNICAL SKILLS

PROFESSIONAL EXPERIENCE

CERTIFICATIONS

AREAS OF EXPERTISE / ADDITIONAL SECTIONS

🔷 FORMATTING RULES
All section headers must be in BOLD ALL CAPS (including CERTIFICATIONS, AREAS OF EXPERTISE, EDUCATION, PROFESSIONAL SUMMARY, TECHNICAL SKILLS, PROFESSIONAL EXPERIENCE)

Bullet points must use round bullets: •

Each job must include at least 4 bullet points (if not available, infer based on job title)

Job format:
Company Name | City, State (Month Year–Month Year) → bold
Job Title (Month Year–Month Year) → bold (job titles AND dates must both be bolded)

Font: Calibri, Size: 10.5 pt for body text, 16 pt for name

Margins: Narrow (0.5 inches sides, 0.75 inches top/bottom)

No markdown formatting. No unnecessary spacing. No table structures.

🔷 CONTENT RULES
NEVER use placeholder names like [Your Name] or "John Doe"

If details are vague, fill in using commonly accepted responsibilities for the job title

Do not invent companies, dates, or titles, but expand vague input into polished phrasing

Professional Summary must be 3–4 sentences and include:
• Job title
• Years of experience
• 2 technical strengths
• 1 standout soft skill or achievement

🔷 JOB TAILORING RULES
- Integrate job keywords naturally throughout content
- Prioritize relevant experience and skills that match the job description
- Adjust professional summary to match role requirements
- Emphasize accomplishments that align with job needs
- Use bullet points (•) with strong action verbs
- Include specific metrics and quantified results
- Maintain truthfulness - enhance but don't fabricate
- Highlight technologies and skills mentioned in the job posting

Emphasize metrics, action verbs, and professional language

Respond with JSON in this format:
{
  "optimizedContent": "The complete tailored resume following the structure above",
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
