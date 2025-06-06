const { createFormattedWordDocument } = require('./server/lib/word-formatter');
const { Packer } = require('docx');
const fs = require('fs');

// Test with actual Zana resume content
const testContent = `ZANA MATHUTHU, CSM, CSPO

PHILADELPHIA, PA | (267) 671-4412 | ZanaMathuthu22@gmail.com

EDUCATION

• Bachelor of Arts (B.A), Ursinus College
• Certified Scrum Master (CSM), International SCRUM Institute (Certification ID 33818054800387)
• Certified Scrum Product Owner (CSPO), International SCRUM Institute
• Full Stack Web Development Certificate, Columbia Engineering, The Fu Foundation School of Engineering & Applied Science (2021)

PROFESSIONAL SUMMARY

Experienced Business Analyst with expertise in Agile methodology and technical skills.

TECHNICAL SKILLS

• SQL
• JIRA
• Confluence
• Excel
• MS Visio
• CRM Systems
• SnagIt
• PowerBI
• Tableau
• SharePoint
• Salesforce
• Draw.io

PROFESSIONAL EXPERIENCE

Uber Technologies | Philadelphia, PA
Senior Business Analyst (Contractor) | 12/2022 - Present

• Collaborate independently with business stakeholders and various leaders to define processes, identify gaps, and map out areas for growth in operational efficiency.
• Work with users to translate functional and non-functional requirements into actionable application and operational deliverables, including user stories, acceptance criteria, and process flows, reducing development rework by 20%.
• Develop and maintain comprehensive business process documentation—including policies, procedures, user guides, and job aids—resulting in a 30% reduction in training time for new users.
• Prepare detailed reports, presentations, modeling documentation and briefing materials as needed for presentations and sharing technical knowledge to business leaders involved.
• Facilitate requirements-gathering meetings with cross-functional teams, successfully identifying critical business needs that resulted in a 20% increase in operational efficiency.
• Conduct user acceptance tests (UAT) to identify bottlenecks and defects, reducing post-production issues by 35% and saving an estimated $200K annually in potential rework costs.
• Provide detailed process improvement recommendations that streamline workflows and support the implementation of application enhancements, increasing productivity by 18% across departments.
• Attend and participate heavily in daily scrum meetings, sprint reviews, retrospectives, and backlog refinement.

CERTIFICATIONS

• Certified Scrum Master (CSM)
• Certified Scrum Product Owner (CSPO)

AREAS OF EXPERTISE

• Customer Relationship Management
• User Acceptance Testing
• Project Management
• Data Analysis
• Agile Methodology
• Waterfall Methodology
• Wireframe
• Requirements Elicitation
• End User Support
• Data Visualization`;

async function testCompleteFormatting() {
  try {
    console.log('Testing complete Word document formatting...');
    
    // Create the formatted document
    const document = createFormattedWordDocument(testContent, 'test_complete_resume.docx');
    
    // Generate buffer
    const buffer = await Packer.toBuffer(document);
    
    // Save test file
    fs.writeFileSync('test_complete_resume.docx', buffer);
    
    console.log('✓ Complete Word document created successfully');
    console.log('✓ File saved as test_complete_resume.docx');
    console.log('');
    console.log('Expected formatting:');
    console.log('• Name: ZANA MATHUTHU, CSM, CSPO (all bold, centered, large font)');
    console.log('• Contact: Centered, normal size');
    console.log('• Section headers: EDUCATION, TECHNICAL SKILLS, etc. (bold, large, with dividers)');
    console.log('• Capital words: CSM, CSPO, SQL, JIRA, CRM, UAT, ID, MS, etc. (all bold)');
    console.log('• Proper spacing between sections with divider lines');
    console.log('');
    console.log('Please download and check the document formatting.');
    
  } catch (error) {
    console.error('❌ Error creating Word document:', error);
  }
}

testCompleteFormatting();