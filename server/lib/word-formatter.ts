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
    'AREAS OF EXPERTISE', 'SKILLS', 'PROJECTS'
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
      // Add spacing and divider before section (except first)
      if (!isFirstSection) {
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: "" })],
          spacing: { before: 300, after: 200 }
        }));
        
        paragraphs.push(new Paragraph({
          children: [new TextRun({ 
            text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            size: 16
          })],
          spacing: { after: 200 }
        }));
      }
      
      // Section header - BOLD ALL CAPS
      paragraphs.push(new Paragraph({
        children: [new TextRun({
          text: line.toUpperCase(),
          bold: true,
          size: 24,
          font: "Calibri"
        })],
        spacing: { after: 200 }
      }));
      
      isFirstSection = false;
      continue;
    }
    
    // Check if line is a name (first line or centered format)
    const isName = i === 0 || (line.includes(',') && !line.includes('@') && !line.includes('|'));
    
    if (isName && i < 3) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({
          text: line,
          bold: true,
          size: 32,
          font: "Calibri"
        })],
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
  const parts = text.split(/(\b[A-Z]{2,}\b)/); // Split on capital words
  
  for (const part of parts) {
    if (!part) continue;
    
    const isAllCaps = /^[A-Z]{2,}$/.test(part.trim());
    
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