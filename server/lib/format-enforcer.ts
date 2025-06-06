/**
 * Format Enforcer - Ensures all resume formatting requirements are met
 * Forces BOLD ALL CAPS headers, proper spacing, and dividers
 */

export function enforceResumeFormatting(content: string): string {
  let lines = content.split('\n');
  let formattedLines: string[] = [];
  let lastWasHeader = false;

  // Section headers that must be formatted
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

    // Check if this line is a section header
    let isSectionHeader = false;
    let headerMatch = '';
    
    for (const header of sectionHeaders) {
      if (line.toUpperCase().trim() === header || 
          (line.toUpperCase().includes(header.split(' ')[0]) && 
           header.split(' ').every(word => line.toUpperCase().includes(word)))) {
        isSectionHeader = true;
        headerMatch = header;
        break;
      }
    }

    // Handle section headers with spacing and dividers
    if (isSectionHeader) {
      // Add spacing and divider before section (except first section)
      if (formattedLines.length > 0) {
        formattedLines.push('');
        formattedLines.push('');
        formattedLines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        formattedLines.push('');
      }
      
      // Add the properly formatted header
      formattedLines.push(`**${headerMatch}**`);
      formattedLines.push('');
      lastWasHeader = true;
      continue;
    }

    // Process regular content lines
    if (line !== '') {
      // Make all capital words bold
      let processedLine = line.replace(/\b[A-Z]{2,}\b/g, '**$&**');
      
      // Clean up any double-bold formatting
      processedLine = processedLine.replace(/\*\*\*\*/g, '**');
      
      formattedLines.push(processedLine);
      lastWasHeader = false;
    } else {
      // Only add empty line if not after a header
      if (!lastWasHeader) {
        formattedLines.push('');
      }
    }
  }

  // Join and clean up
  let finalContent = formattedLines.join('\n')
    .replace(/\n{4,}/g, '\n\n\n')  // Max 3 consecutive newlines
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