import { Document, Paragraph, TextRun, AlignmentType, BorderStyle } from "docx";

/**
 * Creates properly formatted Word document with bold capitals and proper spacing
 */
export function createFormattedWordDocument(content: string, fileName: string): Document {
  const lines = content.split('\n');
  const paragraphs: Paragraph[] = [];
  
  // Section headers that need special formatting
  const sectionHeaders = [
    'EDUCATION', 'PROFESSIONAL SUMMARY', 'TECHNICAL SKILLS', 
    'PROFESSIONAL EXPERIENCE', 'EXPERIENCE', 'CERTIFICATIONS', 
    'AREAS OF EXPERTISE', 'SKILLS', 'PROJECTS', 'SUMMARY'
  ];
  
  let isFirstSection = true;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;
    
    // Check if this is a section header
    const isSectionHeader = sectionHeaders.some(header => 
      line.toUpperCase().trim() === header
    );
    
    if (isSectionHeader) {
      // Add spacing before section (except first)
      if (!isFirstSection) {
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: "" })],
          spacing: { before: 300, after: 200 }
        }));
      }
      
      // Section header - BOLD ALL CAPS with larger font
      paragraphs.push(new Paragraph({
        children: [new TextRun({
          text: line.toUpperCase(),
          bold: true,
          size: 26,
          font: "Calibri"
        })],
        spacing: { before: 200, after: 200 }
      }));
      
      isFirstSection = false;
      continue;
    }
    
    // Check if line is a name (first line or contains credentials like CSM, CSPO)
    const isName = i === 0 || (i < 3 && (line.includes(',') || line.includes('CSM') || line.includes('CSPO')) && !line.includes('@') && !line.includes('|'));
    
    if (isName && i < 3) {
      // Create name with bold capitals using enhanced formatting
      const nameRuns = createNameTextRuns(line);
      
      paragraphs.push(new Paragraph({
        children: nameRuns,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      }));
      continue;
    }
    
    // Check if contact info
    const isContact = line.includes('@') || line.includes('|') || /\(\d{3}\)/.test(line);
    
    if (isContact) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({
          text: line,
          size: 22,
          font: "Calibri"
        })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      }));
      continue;
    }
    
    // Process line for bold capitals
    const textRuns = createTextRunsWithBoldCapitals(line);
    
    // Check if bullet point
    const isBullet = line.startsWith('•') || line.startsWith('-');
    
    paragraphs.push(new Paragraph({
      children: textRuns,
      spacing: { after: 120 },
      indent: isBullet ? { left: 360 } : undefined
    }));
  }
  
  return new Document({
    sections: [{
      properties: {},
      children: paragraphs
    }]
  });
}

/**
 * Creates text runs where all capital words are bold
 */
function createTextRunsWithBoldCapitals(text: string): TextRun[] {
  const textRuns: TextRun[] = [];
  
  // Enhanced regex to capture all capital letter combinations including single letters and acronyms
  const parts = text.split(/(\b[A-Z]+(?:\.[A-Z]+)*\b|\([A-Z]+\)|\b[A-Z]\b)/);
  
  for (const part of parts) {
    if (!part) continue;
    
    // Check if this part is all capitals (including single letters, acronyms, and parentheses)
    const isAllCaps = /^[A-Z]+$/.test(part.trim()) || 
                      /^\([A-Z]+\)$/.test(part.trim()) ||
                      /^[A-Z]+(?:\.[A-Z]+)*$/.test(part.trim());
    
    textRuns.push(new TextRun({
      text: part,
      bold: isAllCaps,
      size: 22,
      font: "Calibri"
    }));
  }
  
  return textRuns.length > 0 ? textRuns : [new TextRun({
    text: text,
    size: 22,
    font: "Calibri"
  })];
}

/**
 * Creates name text runs with larger font and bold capitals
 */
function createNameTextRuns(text: string): TextRun[] {
  const textRuns: TextRun[] = [];
  
  // Enhanced regex to capture all capital letter combinations
  const parts = text.split(/(\b[A-Z]+(?:\.[A-Z]+)*\b|\([A-Z]+\)|\b[A-Z]\b)/);
  
  for (const part of parts) {
    if (!part) continue;
    
    // Check if this part is all capitals
    const isAllCaps = /^[A-Z]+$/.test(part.trim()) || 
                      /^\([A-Z]+\)$/.test(part.trim()) ||
                      /^[A-Z]+(?:\.[A-Z]+)*$/.test(part.trim());
    
    textRuns.push(new TextRun({
      text: part,
      bold: isAllCaps,
      size: 32, // Larger font for names
      font: "Calibri"
    }));
  }
  
  return textRuns.length > 0 ? textRuns : [new TextRun({
    text: text,
    size: 32,
    font: "Calibri",
    bold: true
  })];
}