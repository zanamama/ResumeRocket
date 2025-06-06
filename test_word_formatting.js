const { createFormattedWordDocument } = require('./server/lib/word-formatter.ts');
const { Packer } = require('docx');
const fs = require('fs');

// Test content with various capital letter scenarios
const testContent = `ZANA MATHUTHU, CSM, CSPO

PHILADELPHIA, PA | (267) 671-4412 | ZanaMathuthu22@gmail.com

EDUCATION

• Bachelor of Arts (B.A), Ursinus College
• Certified Scrum Master (CSM), International SCRUM Institute (Certification ID 33818054800387)
• Certified Scrum Product Owner (CSPO), International SCRUM Institute

PROFESSIONAL SUMMARY

Experienced Business Analyst with expertise in SQL, JIRA, and CRM systems.

TECHNICAL SKILLS

• SQL
• JIRA
• Confluence
• Excel
• MS Visio
• CRM Systems
• PowerBI
• Tableau

PROFESSIONAL EXPERIENCE

Uber Technologies | Philadelphia, PA
Senior Business Analyst (Contractor) | 12/2022 - Present

• Work with users to translate functional and non-functional requirements into actionable application deliverables.
• Conduct user acceptance tests (UAT) to identify bottlenecks and defects.
• Utilized the Salesforce platform, design approach, configuration and integration; Revenue Cloud/CPQ

CERTIFICATIONS

• Certified Scrum Master (CSM)
• Certified Scrum Product Owner (CSPO)`;

async function testWordFormatting() {
  try {
    console.log('Testing Word document formatting...');
    
    // Create the formatted document
    const document = createFormattedWordDocument(testContent, 'test_resume.docx');
    
    // Generate buffer
    const buffer = await Packer.toBuffer(document);
    
    // Save test file
    fs.writeFileSync('test_formatted_resume.docx', buffer);
    
    console.log('✓ Word document created successfully');
    console.log('✓ File saved as test_formatted_resume.docx');
    console.log('✓ Check that capital letters like CSM, CSPO, SQL, JIRA, CRM, UAT, CPQ are bold');
    console.log('✓ Check that section headers like EDUCATION, TECHNICAL SKILLS are bold and properly spaced');
    
  } catch (error) {
    console.error('❌ Error creating Word document:', error);
  }
}

testWordFormatting();