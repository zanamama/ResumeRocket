import { jsPDF } from 'jspdf';

export function generateResumePDF(content: string, fileName: string): Buffer {
  const doc = new jsPDF();
  
  // Professional formatting settings matching the template
  const margin = 25;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  const lineHeight = 4.5;
  const sectionSpacing = 10;
  
  // Helper function to add centered header text (name + contact)
  function addHeader(name: string, contact: string) {
    // Name - large, bold, centered
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const nameWidth = doc.getTextWidth(name);
    doc.text(name, (pageWidth - nameWidth) / 2, yPosition);
    yPosition += 10;
    
    // Contact info - smaller, centered
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'normal');
    const contactWidth = doc.getTextWidth(contact);
    doc.text(contact, (pageWidth - contactWidth) / 2, yPosition);
    yPosition += 15;
  }
  
  // Helper function for section headers
  function addSectionHeader(text: string, isFirstSection: boolean = false) {
    yPosition += sectionSpacing;
    
    // Add full-width divider line before section (except for first section)
    if (!isFirstSection) {
      doc.setLineWidth(0.8);
      doc.setDrawColor(0, 0, 0);
      doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
      yPosition += 5;
    }
    
    // Bold, all caps section headers matching requirements
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(text.toUpperCase(), margin, yPosition);
    yPosition += 8;
  }
  
  // Helper function for company header with right-aligned dates
  function addCompanyHeader(company: string, location: string, dates: string) {
    yPosition += 3;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    // Company and location on left
    const leftText = `${company} | ${location}`;
    doc.text(leftText, margin, yPosition);
    
    // Dates on right
    const dateWidth = doc.getTextWidth(dates);
    doc.text(dates, pageWidth - margin - dateWidth, yPosition);
    yPosition += 5;
  }
  
  // Helper function for job titles (bold with dates)
  function addJobTitle(title: string, dates?: string) {
    yPosition += 1;
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    
    if (dates) {
      // Job title with dates - both bold as per requirements
      const titleWithDates = `${title} (${dates})`;
      doc.text(titleWithDates, margin + 3, yPosition);
    } else {
      doc.text(title, margin + 3, yPosition);
    }
    yPosition += 6;
  }
  
  // Helper function for bullet points
  function addBulletPoint(text: string) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    // Check for page break before adding content
    if (yPosition > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Add bullet (using a simple round bullet that works well in PDF)
    doc.text('•', margin + 8, yPosition);
    
    // Add wrapped text with proper line width
    const cleanText = text.replace(/^[•●-]\s*/, '').trim();
    const wrappedLines = doc.splitTextToSize(cleanText, maxLineWidth - 30);
    doc.text(wrappedLines, margin + 15, yPosition);
    yPosition += wrappedLines.length * lineHeight + 2;
  }
  
  // Helper function for regular paragraph text
  function addParagraph(text: string) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const wrappedLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(wrappedLines, margin, yPosition);
    yPosition += wrappedLines.length * lineHeight + 3;
  }
  
  // Parse content and structure it properly
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  let currentSection = '';
  let nameExtracted = false;
  let contactExtracted = false;
  let isFirstSection = true;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for page break
    if (yPosition > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Extract name (first meaningful line, typically in caps)
    if (!nameExtracted && line.length > 2 && line.length < 50) {
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      if (nextLine.includes('@') || nextLine.includes('Phone') || nextLine.includes('|')) {
        addHeader(line, nextLine);
        nameExtracted = true;
        contactExtracted = true;
        i++; // Skip next line since we used it
        continue;
      }
    }
    
    // Skip if this is contact info and we haven't processed it yet
    if (!contactExtracted && (line.includes('@') || line.includes('Phone') || line.includes('|'))) {
      continue;
    }
    
    // Section headers - all must be BOLD ALL CAPS
    if (line === 'EDUCATION' || line === 'PROFESSIONAL SUMMARY' || 
        line === 'TECHNICAL SKILLS' || line === 'PROFESSIONAL EXPERIENCE' || 
        line === 'PROJECTS' || line === 'CERTIFICATIONS' || 
        line === 'AREAS OF EXPERTISE' || line === 'SKILLS' || 
        line === 'EXPERIENCE') {
      addSectionHeader(line, isFirstSection);
      currentSection = line;
      isFirstSection = false;
      continue;
    }
    
    // Handle professional experience section specifically
    if (currentSection === 'PROFESSIONAL EXPERIENCE') {
      // Company/Location/Dates line
      if (line.includes('|') && line.includes('(') && line.includes(')')) {
        const parts = line.split('|');
        const company = parts[0].trim();
        const locationAndDates = parts[1].trim();
        
        // Extract dates in parentheses
        const dateMatch = locationAndDates.match(/\(([^)]+)\)/);
        const dates = dateMatch ? `(${dateMatch[1]})` : '';
        const location = locationAndDates.replace(/\([^)]+\)/, '').trim();
        
        addCompanyHeader(company, location, dates);
        continue;
      }
      
      // Job titles (not bullets, not company lines)
      if (!line.startsWith('•') && !line.startsWith('●') && !line.includes('|') && 
          line.length > 5 && !line.includes('IMPROVEMENTS')) {
        addJobTitle(line);
        continue;
      }
    }
    
    // Bullet points
    if (line.startsWith('•') || line.startsWith('●')) {
      addBulletPoint(line);
      continue;
    }
    
    // Skip AI improvement headers
    if (line.includes('IMPROVEMENTS MADE BY AI') || line.includes('✓')) {
      continue;
    }
    
    // Regular paragraph text
    if (line.length > 0) {
      addParagraph(line);
    }
  }
  
  return Buffer.from(doc.output('arraybuffer'));
}