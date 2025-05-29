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
  const mimeType = fileType === 'pdf' ? 'application/pdf' : 'text/plain';
  
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
    return await createPdfDocument(content, fileName);
  } else {
    const formattedContent = formatResumeContent(content);
    return Buffer.from(formattedContent).toString('base64');
  }
}

async function createPdfDocument(content: string, fileName: string): Promise<string> {
  try {
    const puppeteer = await import('puppeteer');
    
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    
    // Create HTML version with professional styling
    const htmlContent = createResumeHtml(content);
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '0.75in',
        left: '0.75in'
      },
      printBackground: true
    });
    
    await browser.close();
    return pdfBuffer.toString('base64');
    
  } catch (error) {
    console.error('PDF generation failed, falling back to formatted text:', error);
    const formattedContent = formatResumeContent(content);
    return Buffer.from(formattedContent).toString('base64');
  }
}

function createResumeHtml(content: string): string {
  const formattedContent = formatResumeContent(content);
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { 
      margin: 0.75in; 
      size: A4;
    }
    body { 
      font-family: 'Times New Roman', serif; 
      font-size: 11pt; 
      line-height: 1.4; 
      color: #000; 
      margin: 0; 
      padding: 0;
      background: white;
    }
    .header { 
      text-align: center; 
      margin-bottom: 20px; 
      border-bottom: 2px solid #000; 
      padding-bottom: 10px; 
    }
    .name { 
      font-size: 18pt; 
      font-weight: bold; 
      margin-bottom: 8px; 
    }
    .contact { 
      font-size: 10pt; 
      margin-bottom: 4px; 
    }
    .section-title { 
      font-size: 12pt; 
      font-weight: bold; 
      text-transform: uppercase; 
      margin-top: 18px; 
      margin-bottom: 8px; 
      border-bottom: 1px solid #333; 
      padding-bottom: 3px; 
    }
    .job-title { 
      font-weight: bold; 
      margin-top: 12px; 
      margin-bottom: 3px; 
    }
    .company-date { 
      font-style: italic; 
      margin-bottom: 6px; 
    }
    .bullet { 
      margin-left: 20px; 
      margin-bottom: 3px; 
    }
    .education-item { 
      margin-bottom: 6px; 
    }
    pre {
      font-family: 'Times New Roman', serif;
      white-space: pre-wrap;
      margin: 0;
    }
  </style>
</head>
<body>
  <pre>${formattedContent}</pre>
</body>
</html>`;
}

function createHtmlResume(content: string, fileName: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    @page { margin: 1in; }
    body { 
      font-family: 'Times New Roman', serif; 
      font-size: 11pt; 
      line-height: 1.4; 
      color: #000; 
      margin: 0; 
      padding: 0;
    }
    .header { text-align: center; margin-bottom: 20px; }
    .name { font-size: 16pt; font-weight: bold; margin-bottom: 5px; }
    .contact { font-size: 10pt; margin-bottom: 2px; }
    .section-title { 
      font-size: 12pt; 
      font-weight: bold; 
      text-transform: uppercase; 
      margin-top: 15px; 
      margin-bottom: 5px; 
      border-bottom: 1px solid #000; 
      padding-bottom: 2px; 
    }
    .content { margin-bottom: 5px; }
    .bullet { margin-left: 20px; }
  </style>
</head>
<body>
  <pre style="font-family: 'Times New Roman', serif; white-space: pre-wrap;">${content}</pre>
</body>
</html>`;
}

function createRtfResume(content: string): string {
  // Create RTF format (Rich Text Format) which can be opened by Word
  const rtfHeader = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}';
  const rtfContent = content
    .replace(/\\/g, '\\\\')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\n/g, '\\par\n');
  
  return `${rtfHeader}\\f0\\fs22 ${rtfContent}}`;
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