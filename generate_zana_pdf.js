import { jsPDF } from 'jspdf';
import fs from 'fs';

function generateZanaPDF() {
  const doc = new jsPDF();
  
  // Professional formatting settings
  const margin = 25;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  const lineHeight = 4.5;
  
  // Header - Name and contact
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const name = 'ZANA MATHUTHU';
  const nameWidth = doc.getTextWidth(name);
  doc.text(name, (pageWidth - nameWidth) / 2, yPosition);
  yPosition += 8;
  
  // Contact info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const contact = 'zmathuthu@yahoo.com | Philadelphia, PA';
  const contactWidth = doc.getTextWidth(contact);
  doc.text(contact, (pageWidth - contactWidth) / 2, yPosition);
  yPosition += 15;
  
  // Professional Summary Section
  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const summary = 'Results-driven Senior Business Analyst with over 5 years of experience bridging the gap between business needs and technical solutions, with a recent focus on healthcare technology and enterprise solutions. Adept at leading cross-functional teams to deliver impactful projects, including complex integrations. Expertise in stakeholder management, requirements elicitation, and data-driven decision-making to enhance user experiences and drive operational efficiency.';
  const summaryLines = doc.splitTextToSize(summary, maxLineWidth);
  doc.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * lineHeight + 8;
  
  // Technical Skills Section
  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNICAL SKILLS', margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const skills = 'SQL, JIRA, Confluence, MS Visio, CRM Systems, SnagIt, Tableau, Excel, Slack, Salesforce, User Acceptance Testing, Project Management, Data Analysis, Agile Methodology, Waterfall Methodology, Wireframe, Requirements Elicitation, End User Support, Data Visualization';
  const skillsLines = doc.splitTextToSize(skills, maxLineWidth);
  doc.text(skillsLines, margin, yPosition);
  yPosition += skillsLines.length * lineHeight + 8;
  
  // Professional Experience Section
  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
  yPosition += 8;
  
  // First Job
  yPosition += 3;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Uber Technologies | Philadelphia, PA', margin, yPosition);
  const dates1 = '(12/2022 - Present)';
  const dateWidth1 = doc.getTextWidth(dates1);
  doc.text(dates1, pageWidth - margin - dateWidth1, yPosition);
  yPosition += 5;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Senior Business Analyst (Contractor)', margin + 3, yPosition);
  yPosition += 6;
  
  // Bullet points for first job
  const bullets1 = [
    'Develop visually compelling Tableau and PowerPoint presentations that translate complex data into clear, strategic and actionable insights for stakeholders',
    'Work with users to translate functional and non-functional requirements into actionable application deliverables, reducing development rework by 20%',
    'Develop and share comprehensive business process documentation, resulting in a 30% reduction in training time for new users',
    'Conduct user acceptance tests (UAT) to identify bottlenecks and defects, reducing post-production issues by 35% and saving $200K annually',
    'Facilitate requirements-gathering meetings with cross-functional teams, resulting in a 20% increase in operational efficiency'
  ];
  
  bullets1.forEach(bullet => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('●', margin + 8, yPosition);
    const bulletLines = doc.splitTextToSize(bullet, maxLineWidth - 20);
    doc.text(bulletLines, margin + 15, yPosition);
    yPosition += bulletLines.length * lineHeight + 2;
  });
  
  yPosition += 5;
  
  // Second Job
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('UBER TECHNOLOGIES | Philadelphia, PA', margin, yPosition);
  const dates2 = '(03/2020 - 12/2022)';
  const dateWidth2 = doc.getTextWidth(dates2);
  doc.text(dates2, pageWidth - margin - dateWidth2, yPosition);
  yPosition += 5;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Associate Business Analyst (Contractor)', margin + 3, yPosition);
  yPosition += 6;
  
  // Bullet points for second job
  const bullets2 = [
    'Lead onboarding initiatives for healthcare partnerships and logistics teams, contributing to a 15% increase in user satisfaction ratings',
    'Coordinated with delivery teams to enhance service processes, achieving operational excellence and saving over $150K annually',
    'Utilized analytics and reporting tools to monitor project performance, improving decision-making and boosting delivery timelines by 22%',
    'Monitored projects throughout the SDLC process using Agile/SCRUM methodologies, ensuring 95% on-time delivery rate'
  ];
  
  bullets2.forEach(bullet => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('●', margin + 8, yPosition);
    const bulletLines = doc.splitTextToSize(bullet, maxLineWidth - 20);
    doc.text(bulletLines, margin + 15, yPosition);
    yPosition += bulletLines.length * lineHeight + 2;
  });
  
  yPosition += 8;
  
  // Education Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('EDUCATION', margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const education = [
    'Bachelor of Arts (B.A.) | Ursinus College | Economics, Statistics',
    'Certified Scrum Master (CSM) | International SCRUM Institute',
    'Certified Scrum Product Owner (CSPO) | International SCRUM Institute',
    'Full Stack Web Development Certificate 2021 | Columbia Engineering'
  ];
  
  education.forEach(edu => {
    const eduLines = doc.splitTextToSize(edu, maxLineWidth);
    doc.text(eduLines, margin, yPosition);
    yPosition += eduLines.length * lineHeight + 2;
  });
  
  // Save the PDF
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync('client/public/Zana_Mathuthu_Professional_Resume.pdf', pdfBuffer);
  
  console.log('Professional PDF generated: Zana_Mathuthu_Professional_Resume.pdf');
  console.log('File size:', pdfBuffer.length, 'bytes');
}

generateZanaPDF();