import mammoth from 'mammoth';
import JSZip from 'jszip';
import fs from 'fs';

async function testWordParsing() {
  try {
    // Test with Zana's resume
    const buffer = fs.readFileSync('./attached_assets/Zana_Resume24.docx');
    
    console.log('--- Testing Word Document Parsing ---');
    
    // 1. Try mammoth extraction
    console.log('1. Main document content:');
    const result = await mammoth.extractRawText({ buffer });
    console.log(result.value.substring(0, 200) + '...');
    
    // 2. Try ZIP extraction to see file structure
    console.log('\n2. ZIP file structure:');
    const zip = await JSZip.loadAsync(buffer);
    Object.keys(zip.files).forEach(filename => {
      console.log('  ', filename);
    });
    
    // 3. Look for headers specifically
    console.log('\n3. Looking for header files:');
    const headerFiles = Object.keys(zip.files).filter(name => 
      name.includes('header') && name.endsWith('.xml')
    );
    
    if (headerFiles.length > 0) {
      console.log('Found header files:', headerFiles);
      
      for (const headerFile of headerFiles) {
        console.log(`\n--- Content of ${headerFile} ---`);
        const headerXml = await zip.files[headerFile].async('string');
        console.log(headerXml.substring(0, 500) + '...');
        
        // Extract text from header
        const textContent = headerXml
          .replace(/<w:t[^>]*>(.*?)<\/w:t>/g, '$1')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        console.log('Extracted text:', textContent);
      }
    } else {
      console.log('No header files found');
    }
    
    // 4. Check document.xml for any contact info
    console.log('\n4. Checking document.xml content:');
    if (zip.files['word/document.xml']) {
      const docXml = await zip.files['word/document.xml'].async('string');
      const textContent = docXml
        .replace(/<w:t[^>]*>(.*?)<\/w:t>/g, '$1')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Look for potential contact information patterns
      const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      const phonePattern = /\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
      
      const hasEmail = emailPattern.test(textContent);
      const hasPhone = phonePattern.test(textContent);
      
      console.log('Has email pattern:', hasEmail);
      console.log('Has phone pattern:', hasPhone);
      
      if (hasEmail || hasPhone) {
        console.log('First 500 chars of document:', textContent.substring(0, 500));
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testWordParsing();