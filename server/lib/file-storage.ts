// Clean implementation of file storage with proper Word document formatting
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { generateResumePDF } from './pdf-generator';
import { createFormattedWordDocument } from './word-formatter';

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
  const fileId = `${jobId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const downloadUrl = `/api/download/${fileId}`;
  
  const file: StoredFile = {
    content,
    fileName,
    mimeType: fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
  
  fileStorage.set(fileId, file);
  
  return {
    downloadUrl,
    fileName,
    fileType
  };
}

export function getStoredFile(fileId: string): StoredFile | null {
  const file = fileStorage.get(fileId);
  if (!file || file.expiresAt < new Date()) {
    if (file) fileStorage.delete(fileId);
    return null;
  }
  return file;
}

export async function createDownloadableFile(
  content: string,
  fileName: string,
  format: 'pdf' | 'docx' = 'pdf'
): Promise<string> {
  if (format === 'pdf') {
    return await createPdfDocument(content, fileName);
  } else {
    return await createWordDocument(content, fileName);
  }
}

async function createPdfDocument(content: string, fileName: string): Promise<string> {
  const pdfBuffer = generateResumePDF(content, fileName);
  return pdfBuffer.toString('base64');
}

async function createWordDocument(content: string, fileName: string): Promise<string> {
  // Use the specialized formatter that handles bold capitals and spacing
  const document = createFormattedWordDocument(content, fileName);
  const buffer = await Packer.toBuffer(document);
  return buffer.toString('base64');
}

// Periodic cleanup
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