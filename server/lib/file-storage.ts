// Simple in-memory file storage for 24-hour access
interface StoredFile {
  content: string;
  fileName: string;
  mimeType: string;
  expiresAt: Date;
}

const fileStorage = new Map<string, StoredFile>();

export interface StoredFileInfo {
  downloadUrl: string;
  fileName: string;
  fileType: string;
}

export async function storeFileForDownload(
  jobId: number,
  fileName: string,
  content: string,
  fileType: 'pdf' | 'docx'
): Promise<StoredFileInfo> {
  // Generate unique file ID
  const fileId = `${jobId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const downloadUrl = `/api/download/${fileId}`;
  
  // Calculate expiration time (24 hours from now)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  
  // Determine MIME type
  const mimeType = fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  
  // Store file in memory
  fileStorage.set(fileId, {
    content,
    fileName,
    mimeType,
    expiresAt,
  });
  
  return {
    downloadUrl,
    fileName,
    fileType,
  };
}

export function getStoredFile(fileId: string): StoredFile | null {
  const file = fileStorage.get(fileId);
  if (!file || file.expiresAt < new Date()) {
    // Clean up expired file
    if (file) fileStorage.delete(fileId);
    return null;
  }
  return file;
}

// Clean up expired files periodically
setInterval(() => {
  const now = new Date();
  const keysToDelete: string[] = [];
  
  fileStorage.forEach((file, fileId) => {
    if (file.expiresAt < now) {
      keysToDelete.push(fileId);
    }
  });
  
  keysToDelete.forEach(fileId => fileStorage.delete(fileId));
}, 60 * 60 * 1000); // Clean up every hour

export async function createDownloadableFile(
  content: string,
  fileName: string,
  format: 'pdf' | 'docx' = 'pdf'
): Promise<string> {
  if (format === 'pdf') {
    // Create actual PDF using Puppeteer
    return await createPdfFromContent(content);
  } else {
    // Create structured DOCX content
    return await createDocxFromContent(content);
  }
}

async function createPdfFromContent(content: string): Promise<string> {
  const puppeteer = require('puppeteer');
  
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Create HTML version of the resume with professional styling
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Times New Roman', serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #000;
          max-width: 8.5in;
          margin: 0.5in auto;
          padding: 0;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #000;
          padding-bottom: 10px;
        }
        .name {
          font-size: 16pt;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .contact {
          font-size: 10pt;
          margin-bottom: 2px;
        }
        .section-title {
          font-size: 12pt;
          font-weight: bold;
          text-transform: uppercase;
          margin-top: 15px;
          margin-bottom: 5px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 2px;
        }
        .job-title {
          font-weight: bold;
          margin-top: 8px;
          margin-bottom: 2px;
        }
        .company-date {
          font-style: italic;
          margin-bottom: 3px;
        }
        .bullet {
          margin-left: 20px;
          margin-bottom: 2px;
        }
        .education-item {
          margin-bottom: 5px;
        }
        .skills {
          margin-bottom: 3px;
        }
      </style>
    </head>
    <body>
      ${formatContentToHtml(content)}
    </body>
    </html>`;
    
    await page.setContent(htmlContent);
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true
    });
    
    await browser.close();
    
    return pdfBuffer.toString('base64');
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback to formatted text
    const formattedContent = formatResumeContent(content);
    return Buffer.from(formattedContent).toString('base64');
  }
}

async function createDocxFromContent(content: string): Promise<string> {
  // For DOCX, we'll create a properly formatted text file for now
  // In production, you could use libraries like docx or officegen
  const formattedContent = formatResumeContent(content);
  return Buffer.from(formattedContent).toString('base64');
}

function formatContentToHtml(content: string): string {
  const lines = content.split('\n');
  let html = '';
  let currentSection = '';
  let inHeader = true;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Detect name (usually first significant line)
    if (inHeader && line.length > 5 && !line.includes('@') && !line.includes('|')) {
      html += `<div class="header"><div class="name">${line}</div>`;
      inHeader = false;
      continue;
    }
    
    // Detect contact info
    if (line.includes('@') || line.includes('|') || line.match(/\(\d{3}\)/)) {
      html += `<div class="contact">${line}</div>`;
      if (line.includes('@')) html += `</div>`; // Close header after email
      continue;
    }
    
    // Detect section headers
    if (line.toUpperCase().includes('EDUCATION') || 
        line.toUpperCase().includes('EXPERIENCE') || 
        line.toUpperCase().includes('SKILLS') ||
        line.toUpperCase().includes('SUMMARY') ||
        line.toUpperCase().includes('PROJECTS') ||
        line.includes('PROFESSIONAL') ||
        line.includes('TECHNICAL')) {
      html += `<div class="section-title">${line}</div>`;
      currentSection = line.toLowerCase();
      continue;
    }
    
    // Format job titles and companies
    if (line.includes('|') && (line.includes('Present') || line.includes('20'))) {
      const parts = line.split('|');
      if (parts.length >= 2) {
        html += `<div class="job-title">${parts[0].trim()}</div>`;
        html += `<div class="company-date">${parts.slice(1).join(' | ').trim()}</div>`;
      }
      continue;
    }
    
    // Format bullet points
    if (line.startsWith('•') || line.startsWith('●') || line.startsWith('-')) {
      html += `<div class="bullet">${line}</div>`;
      continue;
    }
    
    // Format other content based on section
    if (currentSection.includes('education')) {
      html += `<div class="education-item">${line}</div>`;
    } else if (currentSection.includes('skill')) {
      html += `<div class="skills">${line}</div>`;
    } else {
      html += `<div>${line}</div>`;
    }
  }
  
  return html;
}

function formatResumeContent(content: string): string {
  // Structure the resume content with proper sections and formatting
  const sections = content.split('\n\n');
  let formattedResume = '';
  
  // Extract key information and structure it properly
  let currentSection = '';
  
  for (const section of sections) {
    const lines = section.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) continue;
    
    const firstLine = lines[0].trim();
    
    // Detect section headers and format them
    if (firstLine.toUpperCase().includes('EDUCATION') || 
        firstLine.toUpperCase().includes('EXPERIENCE') || 
        firstLine.toUpperCase().includes('SKILLS') ||
        firstLine.toUpperCase().includes('SUMMARY') ||
        firstLine.toUpperCase().includes('PROJECTS') ||
        firstLine.includes('PROFESSIONAL') ||
        firstLine.includes('TECHNICAL')) {
      
      formattedResume += `\n\n${firstLine.toUpperCase()}\n`;
      formattedResume += '='.repeat(firstLine.length) + '\n\n';
      
      // Add the rest of the section content
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          // Format bullet points
          if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
            formattedResume += `    ${line}\n`;
          } else if (line.includes('|') && (line.includes('Present') || line.includes('20'))) {
            // Format job titles and dates
            formattedResume += `\n${line}\n`;
          } else if (line.length > 50 && !line.includes('@')) {
            // Format job descriptions
            formattedResume += `    ${line}\n`;
          } else {
            formattedResume += `${line}\n`;
          }
        }
      }
    } else {
      // Handle contact information and other content
      for (const line of lines) {
        if (line.trim()) {
          if (line.includes('@') || line.includes('|') || line.match(/\(\d{3}\)/)) {
            // Contact information - center it
            formattedResume += `${line}\n`;
          } else if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
            formattedResume += `    ${line}\n`;
          } else {
            formattedResume += `${line}\n`;
          }
        }
      }
    }
  }
  
  // Add professional footer
  formattedResume += `\n\n${'='.repeat(80)}\nGenerated by UpMySalary Resume Optimizer\n${new Date().toLocaleDateString()}`;
  
  return formattedResume;
}