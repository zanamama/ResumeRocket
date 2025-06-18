// Lead extraction service for marketing intelligence
import { storage } from '../storage';
import { createAirtableService } from './airtable-service';
import type { InsertUserLead } from '@shared/schema';

// Initialize Airtable service
const airtableService = createAirtableService();

interface ExtractedContact {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export function extractContactInfo(resumeContent: string): ExtractedContact {
  const extracted: ExtractedContact = {};
  
  // Extract email - look for email patterns
  const emailMatch = resumeContent.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) {
    extracted.email = emailMatch[1];
  }
  
  // Extract phone - look for various phone formats
  const phonePatterns = [
    /(\(\d{3}\)\s*\d{3}-\d{4})/,  // (555) 123-4567
    /(\d{3}-\d{3}-\d{4})/,        // 555-123-4567
    /(\d{3}\.\d{3}\.\d{4})/,      // 555.123.4567
    /(\d{10})/,                   // 5551234567
    /(\+1\s?\d{3}\s?\d{3}\s?\d{4})/ // +1 555 123 4567
  ];
  
  for (const pattern of phonePatterns) {
    const match = resumeContent.match(pattern);
    if (match) {
      extracted.phone = match[1];
      break;
    }
  }
  
  // Extract location - look for City, State patterns
  const locationPatterns = [
    /([A-Za-z\s]+,\s*[A-Z]{2})/,    // City, ST
    /([A-Za-z\s]+,\s*[A-Za-z\s]+)/  // City, State
  ];
  
  for (const pattern of locationPatterns) {
    const match = resumeContent.match(pattern);
    if (match && !match[1].includes('@')) { // Avoid email false positives
      extracted.location = match[1];
      break;
    }
  }
  
  // Extract full name - typically first few non-header words at the start
  const lines = resumeContent.split('\n');
  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim();
    // Look for lines that could be names (2-4 words, proper case)
    if (trimmed && 
        !trimmed.includes('@') && 
        !trimmed.includes('(') && 
        !trimmed.includes('|') &&
        /^[A-Z][a-z]+(\s+[A-Z][a-z]+){1,3}$/.test(trimmed)) {
      extracted.fullName = trimmed;
      break;
    }
  }
  
  return extracted;
}

export async function captureUserLead(
  resumeContent: string,
  jobId: number,
  source: 'standard' | 'advanced' | 'create',
  providedEmail?: string | null,
  req?: any
): Promise<void> {
  try {
    const extracted = extractContactInfo(resumeContent);
    
    // Use provided email if available, otherwise use extracted
    const email = providedEmail || extracted.email;
    
    // Only create lead if we have at least name or email
    if (extracted.fullName || email) {
      const leadData: InsertUserLead = {
        fullName: extracted.fullName || null,
        email: email || null,
        phone: extracted.phone || null,
        location: extracted.location || null,
        resumeJobId: jobId,
        source,
        ipAddress: req?.ip || req?.connection?.remoteAddress || null,
        userAgent: req?.get('User-Agent') || null,
      };
      
      // Save to both database and Airtable
      await storage.createUserLead(leadData);
      
      // Try to save to Airtable if configured
      if (airtableService) {
        await airtableService.createLead({
          fullName: extracted.fullName,
          email: email,
          phone: extracted.phone,
          location: extracted.location,
          source,
          resumeJobId: jobId,
          ipAddress: req?.ip || req?.connection?.remoteAddress || null,
          userAgent: req?.get('User-Agent') || null,
        });
      }
      
      console.log(`Captured lead: ${extracted.fullName || 'Unknown'} (${email || 'no email'}) from ${source} mode`);
    }
  } catch (error) {
    console.error('Error capturing user lead:', error);
    // Don't throw - lead capture shouldn't break the main flow
  }
}