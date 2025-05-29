import { jsPDF } from 'jspdf';

export function generateResumePDF(content: string, fileName: string): Buffer {
  const doc = new jsPDF();
  
  // Set font and margins
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  const lineHeight = 6;
  const sectionSpacing = 12;
  
  // Helper function to add text with proper line breaks
  function addText(text: string, fontSize: number = 10, isBold: boolean = false, isSection: boolean = false) {
    doc.setFontSize(fontSize);
    
    if (isBold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    
    if (isSection) {
      yPosition += sectionSpacing;
      doc.text(text, margin, yPosition);
      yPosition += lineHeight + 3;
      // Add underline for sections
      doc.line(margin, yPosition - 3, margin + doc.getTextWidth(text), yPosition - 3);
    } else {
      const lines = doc.splitTextToSize(text, maxLineWidth);
      doc.text(lines, margin, yPosition);
      yPosition += (lines.length * lineHeight);
    }
    
    yPosition += 3; // Small spacing after each element
  }
  
  // Parse content and generate PDF
  const lines = content.split('\n');
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      yPosition += 3;
      continue;
    }
    
    // Check if we need a new page
    if (yPosition > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Handle name (first line)
    if (i === 0 && line.length > 0) {
      addText(line, 16, true);
      continue;
    }
    
    // Handle contact info (second line)
    if (i === 1 && line.includes('|')) {
      addText(line, 10, false);
      yPosition += 5;
      continue;
    }
    
    // Handle section headers
    if (line === 'PROFESSIONAL SUMMARY' || 
        line === 'EDUCATION' || 
        line === 'TECHNICAL SKILLS' || 
        line === 'PROFESSIONAL EXPERIENCE' ||
        line === 'IMPROVEMENTS MADE BY AI OPTIMIZATION:') {
      addText(line, 12, true, true);
      currentSection = line;
      continue;
    }
    
    // Handle job titles (lines that don't start with • or bullets)
    if (currentSection === 'PROFESSIONAL EXPERIENCE' && 
        !line.startsWith('•') && 
        !line.startsWith('✓') &&
        !line.includes('|') &&
        line.length > 10) {
      addText(line, 11, true);
      continue;
    }
    
    // Handle company/date lines (contain |)
    if (line.includes('|') && currentSection === 'PROFESSIONAL EXPERIENCE') {
      addText(line, 9, false);
      continue;
    }
    
    // Handle bullet points
    if (line.startsWith('•') || line.startsWith('✓')) {
      addText(line, 10, false);
      continue;
    }
    
    // Handle regular text
    addText(line, 10, false);
  }
  
  // Return PDF as buffer
  const pdfOutput = doc.output('arraybuffer');
  return Buffer.from(pdfOutput);
}