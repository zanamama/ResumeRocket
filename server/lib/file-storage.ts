// Clean implementation of file storage with proper Word document formatting
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { generateResumePDF } from './pdf-generator';
import { createFormattedWordDocument } from './word-formatter';
import { storage } from '../storage';
import type { StoredFile } from '@shared/schema';

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
  
  // Store in database instead of memory
  await storage.storeFile({
    jobId,
    downloadUrl: fileId, // Store just the fileId, not the full URL
    fileName,
    fileContent: content,
    fileType,
    mimeType: fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileSize: Buffer.from(content, 'base64').length,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  });
  
  return {
    downloadUrl,
    fileName,
    fileType
  };
}

export async function getStoredFile(fileId: string): Promise<StoredFile | null> {
  try {
    const file = await storage.getFile(fileId);
    return file || null;
  } catch (error) {
    console.error('Error retrieving stored file:', error);
    return null;
  }
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

// Database cleanup is handled by the storage class