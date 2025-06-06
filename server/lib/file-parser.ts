import type { FileUpload } from "@shared/schema";
import mammoth from "mammoth";
import JSZip from "jszip";

// Helper function to extract text content from Word XML
function extractTextFromWordXml(xml: string): string {
  return xml
    // Remove XML tags but preserve text content
    .replace(/<w:t[^>]*>(.*?)<\/w:t>/g, '$1')
    .replace(/<w:tab[^>]*>/g, ' ')
    .replace(/<w:br[^>]*>/g, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function parseFileContent(file: FileUpload): Promise<string> {
  try {
    // Decode base64 content
    const buffer = Buffer.from(file.fileContent, 'base64');
    
    if (file.fileType === 'pdf') {
      return await parsePdfContent(buffer);
    } else if (file.fileType === 'docx') {
      return await parseDocxContent(buffer);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    throw new Error(`Failed to parse ${file.fileType} file: ${(error as Error).message}`);
  }
}

async function parsePdfContent(buffer: Buffer): Promise<string> {
  try {
    // Enhanced PDF text extraction with multiple fallback methods
    const text = buffer.toString('binary');
    
    // Method 1: Extract text from PDF stream objects  
    let extractedText = '';
    
    // Method 2: Look for text operators in content streams
    const textRegex = /BT[\s\S]*?ET/g;
    const textMatches = text.match(textRegex) || [];
    
    for (const match of textMatches) {
      const cleanText = match
        .replace(/BT|ET/g, '')
        .replace(/\/F\d+\s+\d+(\.\d+)?\s+Tf/g, ' ')
        .replace(/\d+(\.\d+)?\s+\d+(\.\d+)?\s+Td/g, ' ')
        .replace(/\d+(\.\d+)?\s+TL/g, ' ')
        .replace(/T\*/g, '\n')
        .replace(/\((.*?)\)\s*Tj/g, '$1 ')
        .replace(/\[(.*?)\]\s*TJ/g, '$1 ')
        .trim();
      
      extractedText += cleanText + ' ';
    }
    
    // If no text found through regex, try simple string extraction
    if (!extractedText.trim()) {
      // Look for readable text in the PDF
      const readableText = text.replace(/[^\x20-\x7E\n\r]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (readableText.length > 50) {
        extractedText = readableText;
      }
    }
    
    return extractedText.trim() || "Unable to extract text from PDF. Please try uploading a different format or ensure the PDF contains selectable text.";
  } catch (error) {
    return "Unable to extract text from PDF. Please try uploading a DOCX file instead.";
  }
}

async function parseDocxContent(buffer: Buffer): Promise<string> {
  try {
    // Extract main document content
    const mainResult = await mammoth.extractRawText({ buffer });
    let fullContent = mainResult.value;

    // Try to extract headers and footers from the DOCX file
    try {
      const zip = await JSZip.loadAsync(buffer);
      
      let headerFooterContent = '';
      
      // Look for header files in word/ directory
      const headerFiles = Object.keys(zip.files).filter(name => 
        name.startsWith('word/') && name.includes('header') && name.endsWith('.xml')
      );
      
      for (const headerFile of headerFiles) {
        try {
          const headerXml = await zip.files[headerFile].async('string');
          const textContent = extractTextFromWordXml(headerXml);
          
          if (textContent.trim()) {
            headerFooterContent += textContent + '\n';
          }
        } catch (e) {
          // Continue if header extraction fails
        }
      }
      
      // Look for footer files in word/ directory
      const footerFiles = Object.keys(zip.files).filter(name => 
        name.startsWith('word/') && name.includes('footer') && name.endsWith('.xml')
      );
      
      for (const footerFile of footerFiles) {
        try {
          const footerXml = await zip.files[footerFile].async('string');
          // More sophisticated XML text extraction
          const textContent = extractTextFromWordXml(footerXml);
          if (textContent.trim()) {
            headerFooterContent += textContent + '\n';
          }
        } catch (e) {
          console.log(`Failed to extract footer: ${footerFile}`);
        }
      }
      
      // Combine header/footer content with main content
      if (headerFooterContent.trim()) {
        fullContent = headerFooterContent.trim() + '\n\n' + fullContent;
      }
      
    } catch (headerError: any) {
      console.log('Header/footer extraction failed:', headerError?.message || 'Unknown error');
    }

    return fullContent.trim();
  } catch (error) {
    throw new Error('Failed to extract text from DOCX');
  }
}

export function validateFileUpload(file: FileUpload): { valid: boolean; error?: string } {
  // Validate required fields
  if (!file.fileName || !file.fileContent || !file.fileType) {
    return { valid: false, error: 'Missing required file information' };
  }

  // Check file extension matches type
  const fileExtension = file.fileName.toLowerCase().split('.').pop();
  if (fileExtension !== file.fileType) {
    return { valid: false, error: 'File extension does not match file type' };
  }

  // Check file size (base64 encoded, so actual size is ~75% of this)
  const sizeInBytes = (file.fileContent.length * 3) / 4;
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

  if (sizeInBytes > maxSizeInBytes) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  if (sizeInBytes < 100) {
    return { valid: false, error: 'File appears to be empty or corrupted' };
  }

  if (!['pdf', 'docx'].includes(file.fileType)) {
    return { valid: false, error: 'Only PDF and DOCX files are supported' };
  }

  // Validate base64 content
  try {
    Buffer.from(file.fileContent, 'base64');
  } catch {
    return { valid: false, error: 'Invalid file content encoding' };
  }

  if (!file.fileName || file.fileName.trim() === '') {
    return { valid: false, error: 'File name is required' };
  }

  return { valid: true };
}
