import { storage } from "../storage";
import crypto from "crypto";

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
  const fileId = crypto.randomUUID();
  const downloadUrl = `/api/download/${fileId}`;
  
  // Calculate expiration time (24 hours from now)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  
  // Determine MIME type
  const mimeType = fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  
  // Store file in database
  await storage.storeFile({
    jobId,
    fileName,
    fileContent: content, // Base64 encoded content
    fileType,
    mimeType,
    fileSize: Buffer.from(content, 'base64').length,
    downloadUrl,
    expiresAt,
  });
  
  return {
    downloadUrl,
    fileName,
    fileType,
  };
}

export async function createDownloadableFile(
  content: string,
  fileName: string,
  format: 'pdf' | 'docx' = 'pdf'
): Promise<string> {
  // For now, we'll create a simple PDF content
  // In a real implementation, you'd use a library like PDFKit or similar
  if (format === 'pdf') {
    // Convert text content to base64 (placeholder - you'd use a proper PDF library)
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${content.length + 100} >>
stream
BT
/F1 12 Tf
72 720 Td
(${content.replace(/\n/g, ') Tj T* (')}) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000265 00000 n 
0000000414 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
514
%%EOF`;
    return Buffer.from(pdfContent).toString('base64');
  } else {
    // For DOCX, create a simple XML structure (placeholder)
    const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:t>${content}</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`;
    return Buffer.from(docxContent).toString('base64');
  }
}