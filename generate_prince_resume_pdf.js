const { jsPDF } = require('jspdf');
const fs = require('fs');

function generatePrinceResumePDF() {
  const doc = new jsPDF();
  let yPosition = 20;

  // Helper function to add text with proper positioning
  function addText(text, fontSize = 10, isBold = false, isSection = false, isCenter = false) {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    if (isCenter) {
      const textWidth = doc.getTextWidth(text);
      const pageWidth = doc.internal.pageSize.width;
      doc.text(text, (pageWidth - textWidth) / 2, yPosition);
    } else {
      doc.text(text, 20, yPosition);
    }
    
    if (isSection) {
      // Add underline for section headers
      const textWidth = doc.getTextWidth(text);
      const xStart = isCenter ? (doc.internal.pageSize.width - textWidth) / 2 : 20;
      doc.line(xStart, yPosition + 1, xStart + textWidth, yPosition + 1);
      yPosition += 8;
    } else {
      yPosition += fontSize === 16 ? 10 : 6;
    }
  }

  // Add divider line
  function addDivider() {
    yPosition += 3;
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 8;
  }

  // Header
  addText('PRINCE NCUBE', 16, true, false, true);
  addText('London, UK | Contact@Contact.com | 555-555-5555', 10, false, false, true);
  
  addDivider();

  // Education
  addText('EDUCATION', 12, true, true);
  addText('Diploma in Computing Level 5 — 2016', 10, true);
  addText('NCC Education', 10);
  yPosition += 3;
  addText('CompTIA A+ Certification — 2024', 10, true);
  yPosition += 3;
  addText('Google Android Developer Scholarship — 2018', 10, true);
  addText('Mobile App Development Specialization', 10);
  yPosition += 3;
  addText('Harvard CS50 Computer Science Course — 2020', 10, true);
  addText('Web Development & Programming Fundamentals', 10);

  addDivider();

  // Professional Summary
  addText('PROFESSIONAL SUMMARY', 12, true, true);
  const summary = 'Full-stack developer and IT professional with 7+ years of progressive experience spanning web development, mobile applications, and enterprise IT support. Proven expertise in React.js, Node.js, and cloud technologies, with a unique background in aviation engineering that strengthens problem-solving and precision-focused development. Currently leading IT operations while maintaining active development skills through freelance projects across international markets.';
  const summaryLines = doc.splitTextToSize(summary, 170);
  summaryLines.forEach(line => addText(line, 10));

  addDivider();

  // Technical Skills
  addText('TECHNICAL SKILLS', 12, true, true);
  addText('Frontend Development: React.js, Next.js, Redux, JavaScript (ES6+), Tailwind CSS, Bootstrap, Material UI', 10, true);
  addText('Backend Development: Node.js, Express.js, PHP (Laravel), Firebase, MongoDB', 10, true);
  addText('Cloud & DevOps: GitHub, Heroku, Vercel, Webpack, Babel', 10, true);
  addText('IT Infrastructure: Microsoft Exchange, Active Directory, Windows & macOS Administration', 10, true);
  addText('Testing & Performance: Jest, React Testing Library, Lighthouse Performance Audits', 10, true);
  addText('Additional Tools: WordPress, SEO Optimization, Google Analytics, Adobe Photoshop, Figma', 10, true);

  addDivider();

  // Professional Experience
  addText('PROFESSIONAL EXPERIENCE', 12, true, true);
  
  // Job 1
  addText('Chislehurst Healthcare | London, UK (July 2023–Present)', 10, true);
  addText('IT Support Team Leader', 10, false, false, false);
  addText('• Provide comprehensive technical support for 100+ employees, resolving hardware and software issues with 95% first-call resolution rate', 10);
  addText('• Manage Microsoft Exchange environment, handling user provisioning and email troubleshooting for healthcare operations', 10);
  addText('• Lead IT training programs for new hires, developing standardized onboarding procedures that reduced setup time by 40%', 10);
  addText('• Implement cybersecurity protocols and data protection policies ensuring GDPR compliance in healthcare environment', 10);
  addText('• Maintain detailed asset inventory system and coordinate cross-departmental IT initiatives', 10);
  yPosition += 5;

  // Job 2
  addText('Intercom Staffing / UpMySalary | Remote, USA (February 2021–April 2023)', 10, true);
  addText('Full Stack JavaScript Developer', 10, false, false, false);
  addText('• Developed and deployed multiple React.js and Next.js web applications serving thousands of users', 10);
  addText('• Specialized in React.js debugging and established development best practices for remote team of 8 developers', 10);
  addText('• Built e-commerce solutions using Firebase authentication and real-time database management', 10);
  addText('• Led UI/UX optimization initiatives, improving user engagement metrics by 35% and Lighthouse performance scores to 90+', 10);
  addText('• Implemented comprehensive unit testing strategies using Jest, reducing production bugs by 60%', 10);
  yPosition += 5;

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Job 3
  addText('Freelance Web Developer | Remote (2019–2023)', 10, true);
  addText('Full Stack Developer', 10, false, false, false);
  addText('• Delivered custom web solutions for international clients across various industries', 10);
  addText('• Specialized in React.js frontend development and Node.js backend architecture', 10);
  addText('• Managed complete project lifecycle from requirements gathering to deployment and maintenance', 10);
  addText('• Built responsive, mobile-first applications with focus on performance optimization', 10);
  yPosition += 5;

  // Job 4
  addText('Aviation Engineering Company | Zimbabwe (2016–2019)', 10, true);
  addText('Aviation Engineer & IT Support Specialist', 10, false, false, false);
  addText('• Performed aircraft maintenance and inspection procedures while providing IT support for engineering operations', 10);
  addText('• Maintained technical documentation systems and digital asset management', 10);
  addText('• Bridged engineering precision with technology solutions, developing problem-solving methodologies', 10);
  addText('• Completed Google Android Developer Scholarship while working full-time, demonstrating commitment to technology transition', 10);

  addDivider();

  // Certifications
  addText('CERTIFICATIONS', 12, true, true);
  addText('CompTIA A+ Certified Professional', 10);
  addText('Google Android Developer Scholarship Graduate', 10);
  addText('Harvard CS50 Computer Science Certificate', 10);
  addText('Multiple Udemy Certifications: React.js, Laravel PHP Framework', 10);

  addDivider();

  // Areas of Expertise
  addText('AREAS OF EXPERTISE', 12, true, true);
  addText('Full-Stack Web Development', 10);
  addText('Enterprise IT Support & Administration', 10);
  addText('Team Leadership & Training', 10);
  addText('Cross-Functional Problem Solving', 10);
  addText('Remote Team Collaboration', 10);
  addText('Agile Development Methodologies', 10);

  // Save the PDF
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync('Prince_Ncube_Optimized_Resume.pdf', pdfBuffer);
  
  console.log('Prince Ncube optimized resume PDF generated successfully!');
  return pdfBuffer;
}

// Generate the PDF
generatePrinceResumePDF();