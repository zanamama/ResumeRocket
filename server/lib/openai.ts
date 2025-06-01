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
          content: `You are an expert resume optimization specialist. Transform the provided resume into a polished, professional document that follows industry standards and ATS-friendly formatting.

CRITICAL: You must return content in the EXACT format shown below, maintaining this professional structure:

[NAME]
[Phone] | [Email] | [City, State ZIP] | [LinkedIn URL if available]

EDUCATION
[Degree] | [Institution] | [Graduation Year]
• [Any relevant coursework, honors, GPA if 3.5+, certifications]

PROFESSIONAL SUMMARY
[3-4 compelling lines that highlight the candidate's key strengths, years of experience, core competencies, and value proposition. Focus on measurable impact and industry-relevant skills.]

TECHNICAL SKILLS
[Organize by categories like: Programming Languages, Frameworks, Databases, Tools, etc.]

PROFESSIONAL EXPERIENCE

[Company Name] | [City, State] | [Start Date - End Date]
[Job Title]
• [Achievement with quantified impact - use strong action verbs]
• [Responsibility that demonstrates skills relevant to target roles]
• [Project or initiative with measurable results]
• [Leadership, collaboration, or process improvement example]

[Previous Company] | [City, State] | [Start Date - End Date]
[Job Title]
• [Continue same bullet point format]

PROJECTS (if applicable)
[Project Name] | [Technologies Used] | [Year]
• [Brief description with impact/results]

Enhancement Guidelines:
- Start each bullet with strong action verbs (Developed, Led, Implemented, Optimized, Achieved, etc.)
- Quantify achievements whenever possible (percentages, dollar amounts, time saved, etc.)
- Use industry keywords naturally
- Maintain truthfulness while enhancing impact statements
- Keep bullet points concise but impactful (1-2 lines each)
- Ensure consistency in formatting and tense

Respond with JSON in this format:
{
  "optimizedContent": "The complete optimized resume following the exact format above",
  "improvements": ["Specific list of improvements made to enhance the resume"]
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
