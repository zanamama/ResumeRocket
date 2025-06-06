/**
 * Format Enforcer - Ensures all resume formatting requirements are met
 * Forces BOLD ALL CAPS headers, proper spacing, and dividers
 */

export function enforceResumeFormatting(content: string): string {
  let lines = content.split('\n');
  let formattedLines: string[] = [];
  let previousWasSectionHeader = false;

  // Section headers that must be BOLD ALL CAPS
  const sectionHeaders = [
    'EDUCATION',
    'PROFESSIONAL SUMMARY', 
    'TECHNICAL SKILLS',
    'PROFESSIONAL EXPERIENCE',
    'EXPERIENCE',
    'CERTIFICATIONS',
    'AREAS OF EXPERTISE',
    'SKILLS',
    'PROJECTS'
  ];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Skip empty lines at start
    if (line === '' && formattedLines.length === 0) {
      continue;
    }

    // Force section headers to BOLD ALL CAPS
    const normalizedLine = line.toUpperCase().replace(/[^\w\s]/g, '').trim();
    
    // Check if this line should be a section header
    let isSectionHeader = false;
    let correctedHeader = '';
    
    for (const header of sectionHeaders) {
      const normalizedHeader = header.replace(/[^\w\s]/g, '').trim();
      if (normalizedLine === normalizedHeader || 
          normalizedLine.includes(normalizedHeader) ||
          (header === 'TECHNICAL SKILLS' && normalizedLine.includes('SKILLS')) ||
          (header === 'PROFESSIONAL EXPERIENCE' && normalizedLine.includes('EXPERIENCE')) ||
          (header === 'AREAS OF EXPERTISE' && normalizedLine.includes('EXPERTISE'))) {
        isSectionHeader = true;
        correctedHeader = header;
        break;
      }
    }

    // Handle section headers
    if (isSectionHeader) {
      // Add spacing before section header (except first)
      if (formattedLines.length > 0 && !previousWasSectionHeader) {
        formattedLines.push('');
        formattedLines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        formattedLines.push('');
      }
      
      formattedLines.push(correctedHeader);
      formattedLines.push('');
      previousWasSectionHeader = true;
      continue;
    }

    // Regular content lines
    if (line !== '') {
      formattedLines.push(line);
      previousWasSectionHeader = false;
    } else if (!previousWasSectionHeader) {
      formattedLines.push('');
    }
  }

  // Clean up excessive empty lines
  let finalContent = formattedLines.join('\n')
    .replace(/\n{3,}/g, '\n\n')  // Max 2 consecutive newlines
    .trim();

  return finalContent;
}

export function removeContactFabrication(content: string): string {
  return content
    .replace(/^.*\d{7}\s+\d{6}.*$/gm, '')  // Remove patterns like "4006850 501650"
    .replace(/^.*555-555-5555.*$/gm, '')    // Remove placeholder phones
    .replace(/^.*Contact@Contact\.com.*$/gm, '') // Remove placeholder emails
    .replace(/^.*\|\s*\|\s*.*$/gm, '')      // Remove empty pipe separators
    .replace(/^\s*\|\s*$/gm, '')           // Remove standalone pipes
    .replace(/\n\s*\n\s*\n/g, '\n\n')     // Clean excessive line breaks
    .trim();
}