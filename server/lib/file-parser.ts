import type { FileUpload } from "@shared/schema";

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
  // For now, we'll return a placeholder implementation
  // In a real implementation, you would use a library like pdf-parse
  try {
    // Simulating PDF parsing - in production, use pdf-parse library
    const text = buffer.toString('utf-8');
    // Basic extraction - this would be replaced with proper PDF parsing
    return text.replace(/[^\x20-\x7E\n\r]/g, '').trim();
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
}

async function parseDocxContent(buffer: Buffer): Promise<string> {
  // For now, we'll return a placeholder implementation
  // In a real implementation, you would use a library like mammoth
  try {
    // Simulating DOCX parsing - in production, use mammoth library
    const text = buffer.toString('utf-8');
    // Basic extraction - this would be replaced with proper DOCX parsing
    return text.replace(/[^\x20-\x7E\n\r]/g, '').trim();
  } catch (error) {
    throw new Error('Failed to extract text from DOCX');
  }
}

export function validateFileUpload(file: FileUpload): { valid: boolean; error?: string } {
  // Check file size (base64 encoded, so actual size is ~75% of this)
  const sizeInBytes = (file.fileContent.length * 3) / 4;
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

  if (sizeInBytes > maxSizeInBytes) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  if (!['pdf', 'docx'].includes(file.fileType)) {
    return { valid: false, error: 'Only PDF and DOCX files are supported' };
  }

  if (!file.fileName || file.fileName.trim() === '') {
    return { valid: false, error: 'File name is required' };
  }

  return { valid: true };
}
