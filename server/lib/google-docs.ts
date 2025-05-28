import { storeFileForDownload, createDownloadableFile } from "./file-storage";

export interface DocumentExport {
  docUrl: string;
  pdfUrl: string;
  docId: string;
}

export async function createDownloadableDocument(
  content: string, 
  title: string,
  jobId: number
): Promise<DocumentExport> {
  try {
    const docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create PDF version
    const pdfContent = await createDownloadableFile(content, `${title}.pdf`, 'pdf');
    const pdfFile = await storeFileForDownload(jobId, `${title}.pdf`, pdfContent, 'pdf');
    
    // Create DOCX version  
    const docxContent = await createDownloadableFile(content, `${title}.docx`, 'docx');
    const docxFile = await storeFileForDownload(jobId, `${title}.docx`, docxContent, 'docx');
    
    return {
      docUrl: docxFile.downloadUrl,
      pdfUrl: pdfFile.downloadUrl,
      docId: docId,
    };
  } catch (error) {
    throw new Error('Failed to create downloadable document: ' + (error as Error).message);
  }
}

export async function createMultipleDownloadableDocuments(
  resumes: Array<{ content: string; title: string }>,
  jobId: number
): Promise<DocumentExport[]> {
  try {
    const results: DocumentExport[] = [];
    
    for (const resume of resumes) {
      const doc = await createDownloadableDocument(resume.content, resume.title, jobId);
      results.push(doc);
      
      // Add small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  } catch (error) {
    throw new Error('Failed to create multiple documents: ' + (error as Error).message);
  }
}

export function generateDownloadZipUrl(docExports: DocumentExport[]): string {
  // Generate a ZIP file containing all the documents
  const zipId = `zip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return `/api/download/zip/${zipId}`;
}
