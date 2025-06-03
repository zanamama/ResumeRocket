import PDFDocument from 'pdfkit';
import fs from 'fs';

function createPrincePDF() {
  const doc = new PDFDocument({ margin: 50 });
  
  // Pipe the PDF to a file
  doc.pipe(fs.createWriteStream('Prince_Ncube_Optimized_Resume.pdf'));
  
  let yPosition = 50;

  // Helper function to add text
  function addText(text, options = {}) {
    const { fontSize = 10, bold = false, center = false, indent = 0 } = options;
    
    doc.font(bold ? 'Helvetica-Bold' : 'Helvetica')
       .fontSize(fontSize);
    
    if (center) {
      doc.text(text, 0, yPosition, { align: 'center', width: doc.page.width });
    } else {
      doc.text(text, 50 + indent, yPosition);
    }
    
    yPosition += fontSize + 4;
  }

  // Add horizontal line
  function addLine() {
    yPosition += 5;
    doc.moveTo(50, yPosition)
       .lineTo(550, yPosition)
       .stroke();
    yPosition += 10;
  }

  // Header
  addText('PRINCE NCUBE', { fontSize: 16, bold: true, center: true });
  addText('London, UK | Contact@Contact.com | 555-555-5555', { fontSize: 10, center: true });
  addLine();

  // Education
  addText('EDUCATION', { fontSize: 12, bold: true });
  yPosition += 3;
  addText('Diploma in Computing Level 5 — 2016', { fontSize: 10, bold: true });
  addText('NCC Education', { fontSize: 10 });
  yPosition += 3;
  addText('CompTIA A+ Certification — 2024', { fontSize: 10, bold: true });
  yPosition += 3;
  addText('Google Android Developer Scholarship — 2018', { fontSize: 10, bold: true });
  addText('Mobile App Development Specialization', { fontSize: 10 });
  yPosition += 3;
  addText('Harvard CS50 Computer Science Course — 2020', { fontSize: 10, bold: true });
  addText('Web Development & Programming Fundamentals', { fontSize: 10 });
  addLine();

  // Professional Summary
  addText('PROFESSIONAL SUMMARY', { fontSize: 12, bold: true });
  yPosition += 3;
  const summary = 'Full-stack developer and IT professional with 7+ years of progressive experience spanning web development, mobile applications, and enterprise IT support. Proven expertise in React.js, Node.js, and cloud technologies, with a unique background in aviation engineering that strengthens problem-solving and precision-focused development. Currently leading IT operations while maintaining active development skills through freelance projects across international markets.';
  
  doc.font('Helvetica').fontSize(10);
  doc.text(summary, 50, yPosition, { width: 500, align: 'justify' });
  yPosition += 60;
  addLine();

  // Technical Skills
  addText('TECHNICAL SKILLS', { fontSize: 12, bold: true });
  yPosition += 3;
  addText('Frontend Development: React.js, Next.js, Redux, JavaScript (ES6+), Tailwind CSS, Bootstrap, Material UI', { fontSize: 10, bold: true });
  addText('Backend Development: Node.js, Express.js, PHP (Laravel), Firebase, MongoDB', { fontSize: 10, bold: true });
  addText('Cloud & DevOps: GitHub, Heroku, Vercel, Webpack, Babel', { fontSize: 10, bold: true });
  addText('IT Infrastructure: Microsoft Exchange, Active Directory, Windows & macOS Administration', { fontSize: 10, bold: true });
  addText('Testing & Performance: Jest, React Testing Library, Lighthouse Performance Audits', { fontSize: 10, bold: true });
  addText('Additional Tools: WordPress, SEO Optimization, Google Analytics, Adobe Photoshop, Figma', { fontSize: 10, bold: true });
  addLine();

  // Professional Experience
  addText('PROFESSIONAL EXPERIENCE', { fontSize: 12, bold: true });
  yPosition += 5;

  // Job 1
  addText('Chislehurst Healthcare | London, UK (July 2023–Present)', { fontSize: 10, bold: true });
  addText('IT Support Team Leader', { fontSize: 10, italic: true });
  addText('• Provide comprehensive technical support for 100+ employees, resolving hardware and software issues with 95% first-call resolution rate', { fontSize: 10 });
  addText('• Manage Microsoft Exchange environment, handling user provisioning and email troubleshooting for healthcare operations', { fontSize: 10 });
  addText('• Lead IT training programs for new hires, developing standardized onboarding procedures that reduced setup time by 40%', { fontSize: 10 });
  addText('• Implement cybersecurity protocols and data protection policies ensuring GDPR compliance in healthcare environment', { fontSize: 10 });
  addText('• Maintain detailed asset inventory system and coordinate cross-departmental IT initiatives', { fontSize: 10 });
  yPosition += 8;

  // Check if we need a new page
  if (yPosition > 700) {
    doc.addPage();
    yPosition = 50;
  }

  // Job 2
  addText('Intercom Staffing / UpMySalary | Remote, USA (February 2021–April 2023)', { fontSize: 10, bold: true });
  addText('Full Stack JavaScript Developer', { fontSize: 10, italic: true });
  addText('• Developed and deployed multiple React.js and Next.js web applications serving thousands of users', { fontSize: 10 });
  addText('• Specialized in React.js debugging and established development best practices for remote team of 8 developers', { fontSize: 10 });
  addText('• Built e-commerce solutions using Firebase authentication and real-time database management', { fontSize: 10 });
  addText('• Led UI/UX optimization initiatives, improving user engagement metrics by 35% and Lighthouse performance scores to 90+', { fontSize: 10 });
  addText('• Implemented comprehensive unit testing strategies using Jest, reducing production bugs by 60%', { fontSize: 10 });
  yPosition += 8;

  // Job 3
  addText('Freelance Web Developer | Remote (2019–2023)', { fontSize: 10, bold: true });
  addText('Full Stack Developer', { fontSize: 10, italic: true });
  addText('• Delivered custom web solutions for international clients across various industries', { fontSize: 10 });
  addText('• Specialized in React.js frontend development and Node.js backend architecture', { fontSize: 10 });
  addText('• Managed complete project lifecycle from requirements gathering to deployment and maintenance', { fontSize: 10 });
  addText('• Built responsive, mobile-first applications with focus on performance optimization', { fontSize: 10 });
  yPosition += 8;

  // Job 4
  addText('Aviation Engineering Company | Zimbabwe (2016–2019)', { fontSize: 10, bold: true });
  addText('Aviation Engineer & IT Support Specialist', { fontSize: 10, italic: true });
  addText('• Performed aircraft maintenance and inspection procedures while providing IT support for engineering operations', { fontSize: 10 });
  addText('• Maintained technical documentation systems and digital asset management', { fontSize: 10 });
  addText('• Bridged engineering precision with technology solutions, developing problem-solving methodologies', { fontSize: 10 });
  addText('• Completed Google Android Developer Scholarship while working full-time, demonstrating commitment to technology transition', { fontSize: 10 });
  addLine();

  // Certifications
  addText('CERTIFICATIONS', { fontSize: 12, bold: true });
  yPosition += 3;
  addText('CompTIA A+ Certified Professional', { fontSize: 10 });
  addText('Google Android Developer Scholarship Graduate', { fontSize: 10 });
  addText('Harvard CS50 Computer Science Certificate', { fontSize: 10 });
  addText('Multiple Udemy Certifications: React.js, Laravel PHP Framework', { fontSize: 10 });
  addLine();

  // Areas of Expertise
  addText('AREAS OF EXPERTISE', { fontSize: 12, bold: true });
  yPosition += 3;
  addText('Full-Stack Web Development', { fontSize: 10 });
  addText('Enterprise IT Support & Administration', { fontSize: 10 });
  addText('Team Leadership & Training', { fontSize: 10 });
  addText('Cross-Functional Problem Solving', { fontSize: 10 });
  addText('Remote Team Collaboration', { fontSize: 10 });
  addText('Agile Development Methodologies', { fontSize: 10 });

  // Finalize the PDF
  doc.end();
  
  console.log('Prince Ncube optimized resume PDF created successfully!');
}

createPrincePDF();