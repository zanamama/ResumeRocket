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
  
  // Header - Name and complete contact info (following the template format exactly)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const name = 'Zana Mathuthu';
  const nameWidth = doc.getTextWidth(name);
  doc.text(name, (pageWidth - nameWidth) / 2, yPosition);
  yPosition += 8;
  
  // Complete contact info on one line like the template
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const contact = '(555) 123-4567 | zmathuthu@yahoo.com | Philadelphia, PA';
  const contactWidth = doc.getTextWidth(contact);
  doc.text(contact, (pageWidth - contactWidth) / 2, yPosition);
  yPosition += 15;
  
  // Education Section (comes first like in template)
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('EDUCATION', margin, yPosition);
  yPosition += 4;
  
  // Add 1pt thick black divider
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  // Education entries
  doc.text('Bachelor of Arts (B.A), 2013-2016', margin, yPosition);
  yPosition += 5;
  doc.text('Ursinus College, Economics, Statistics', margin, yPosition);
  yPosition += 7;
  
  doc.text('• Certified Scrum Master (CSM)', margin + 7, yPosition);
  yPosition += 4;
  doc.text('International SCRUM Institute', margin + 15, yPosition);
  yPosition += 4;
  doc.text('(Certification ID 33818054800387)', margin + 15, yPosition);
  yPosition += 7;
  
  doc.text('• Certified Scrum Product Owner (CSPO)', margin + 7, yPosition);
  yPosition += 4;
  doc.text('International SCRUM Institute', margin + 15, yPosition);
  yPosition += 7;
  
  doc.text('• Full Stack Web Development Certificate 2021', margin + 7, yPosition);
  yPosition += 4;
  doc.text('Columbia Engineering', margin + 15, yPosition);
  yPosition += 4;
  doc.text('The Fu Foundation School of Engineering & Applied Science', margin + 15, yPosition);
  yPosition += 12;
  
  // Professional Summary Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
  yPosition += 4;
  
  // Add 1pt thick black divider
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const summary = 'Results-driven Senior Business Analyst with over 7 years of experience bridging the gap between business needs and technical solutions, with a recent focus on enterprise solutions. Adept at leading cross-functional teams to deliver impactful projects, including complex integrations. Expertise in stakeholder management, requirements elicitation, and data-driven decision-making to enhance user experiences and drive operational efficiency. Known for ability to communicate technical insights to non-technical audiences and navigate competing priorities to meet stakeholder goals.';
  const summaryLines = doc.splitTextToSize(summary, maxLineWidth);
  doc.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * lineHeight + 12;
  
  // Technical Skills Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNICAL SKILLS', margin, yPosition);
  yPosition += 4;
  
  // Add 1pt thick black divider
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const skills = 'Advanced SQL, JIRA, Confluence, Excel, MS Visio, CRM Systems, SnagIt, PowerBI, Tableau, SharePoint, Draw.io, Salesforce';
  const skillsLines = doc.splitTextToSize(skills, maxLineWidth);
  doc.text(skillsLines, margin, yPosition);
  yPosition += skillsLines.length * lineHeight + 12;
  
  // Professional Experience Section (following template format exactly)
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
  yPosition += 4;
  
  // Add 1pt thick black divider
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;
  
  // First Job - exactly like template format
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Uber technologies | Philadelphia, PA', margin, yPosition);
  const dates1 = '(12/2022 - Present)';
  const dateWidth1 = doc.getTextWidth(dates1);
  doc.text(dates1, pageWidth - margin - dateWidth1, yPosition);
  yPosition += 5;
  
  // Job title indented like template
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Senior Business Analyst (Contractor)', margin + 3, yPosition);
  yPosition += 6;
  
  // Complete bullet points from original resume
  const bullets1 = [
    'Collaborate independently with business stakeholders and various leaders to define processes, identify gaps, and map out areas for growth in operational efficiency.',
    'Work with users to translate functional and non-functional requirements into actionable application and operational deliverables, including user stories, acceptance criteria, and process flows, reducing development rework by 20%.',
    'Develop and maintain comprehensive business process documentation—including policies, procedures, user guides, and job aids—resulting in a 30% reduction in training time for new users.',
    'Partner with project managers to track and manage Agile-based SDLC projects, ensuring on-time delivery for 10+ initiatives and achieving a 95% stakeholder satisfaction rate.',
    'Prepare detailed reports, presentations, modeling documentation and briefing materials as needed for presentations and sharing technical knowledge to business leaders involved.',
    'Facilitate requirements-gathering meetings with cross-functional teams, successfully identifying critical business needs that resulted in a 20% increase in operational efficiency.',
    'Conduct user acceptance tests (UAT) to identify bottlenecks and defects, reducing post-production issues by 35% and saving an estimated $200K annually in potential rework costs.',
    'Provide detailed process improvement recommendations that streamline workflows and support the implementation of application enhancements, increasing productivity by 18% across departments.',
    'Attend and participate heavily in daily scrum meetings, sprint reviews, retrospectives, and backlog refinement.'
  ];
  
  bullets1.forEach(bullet => {
    // Check for page break
    if (yPosition > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('•', margin + 8, yPosition);
    const bulletLines = doc.splitTextToSize(bullet, maxLineWidth - 20);
    doc.text(bulletLines, margin + 15, yPosition);
    yPosition += bulletLines.length * lineHeight + 3;
  });
  
  yPosition += 8;
  
  // Second Job - complete information
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('UBER TECHNOLOGIES | Philadelphia, PA', margin, yPosition);
  const dates2 = '(03/2020 - 12/2022)';
  const dateWidth2 = doc.getTextWidth(dates2);
  doc.text(dates2, pageWidth - margin - dateWidth2, yPosition);
  yPosition += 5;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Business Analyst (Contractor)', margin + 3, yPosition);
  yPosition += 6;
  
  // Complete bullet points from original resume
  const bullets2 = [
    'Lead onboarding initiatives for healthcare partnerships and logistics teams, ensuring seamless integration of services that contributed to a 15% increase in user satisfaction ratings.',
    'Coordinated with delivery teams to enhance service processes, achieving operational excellence and saving over $150K annually by reducing inefficiencies.',
    'Utilized analytics and reporting tools to monitor project performance, providing actionable insights that improved decision-making and boosted delivery timelines by 22%.',
    'Utilized the Salesforce platform, design approach, configuration and integration; Revenue Cloud/CPQ.',
    'Worked with project teams and interfaced with clients and stakeholders to gather and document business needs, functional, and non-functional requirements for system changes, contributing to a 20% improvement in project delivery timelines.',
    'Monitored projects throughout the SDLC process using Agile/SCRUM methodologies, ensuring successful completion of 6 initiatives with a 95% on-time delivery rate.',
    'Facilitated meetings with users for elicitation and review of requirements, user stories, acceptance criteria, and other artifacts, resulting in a 25% reduction in requirement ambiguities and improved communication with technical teams.',
    'Provided Subject Matter Expert (SME) assistance to team members by project 4, enhancing team productivity by 15% and reducing project roadblocks.',
    'Shadowed a senior business analyst for 1 month to quickly get acclimated to projects with external clients and begin working with stakeholders.'
  ];
  
  bullets2.forEach(bullet => {
    // Check for page break
    if (yPosition > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('•', margin + 8, yPosition);
    const bulletLines = doc.splitTextToSize(bullet, maxLineWidth - 20);
    doc.text(bulletLines, margin + 15, yPosition);
    yPosition += bulletLines.length * lineHeight + 3;
  });
  
  // Note: Education section is already at the top, following template format
  
  // Save the PDF with a new name to ensure fresh download
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync('client/public/Zana_Mathuthu_1pt_Dividers_Resume.pdf', pdfBuffer);
  
  console.log('Professional PDF with 1pt dividers generated: Zana_Mathuthu_1pt_Dividers_Resume.pdf');
  console.log('File size:', pdfBuffer.length, 'bytes');
  console.log('Total pages:', doc.getNumberOfPages());
}

generateZanaPDF();