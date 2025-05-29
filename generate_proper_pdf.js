import { jsPDF } from 'jspdf';
import fs from 'fs';

const resumeContent = `PRINCE NCUBE
[Phone] | [Email] | [Address]

PROFESSIONAL SUMMARY
Results-driven IT professional with comprehensive expertise in system administration, software development, and IT support. Proven record of collaborating effectively with remote and onsite teams to deliver impactful solutions. Skilled in leading IT training, optimizing user engagement, and enhancing cybersecurity practices.

EDUCATION
• Harvard CS50 Online, React Native Developer, 01/2020 – 02/2020
• Udemy Online, Web Developer Courses: React Certification, Laravel Certification, 2018-2020
• Google Scholarship, Android Mobile Developer, 2017 - 2018
• NCC Education, Diploma in Computing Level 5, 2013 - 2016
• CompTIA A+ Certification, Expected 08/2024

TECHNICAL SKILLS
IT Support & System Administration: Microsoft Exchange, Active Directory, Windows & macOS troubleshooting
Networking & Security: Network configuration, cybersecurity awareness, data protection policies
Frontend Development: React.js, Next.js, Redux, JavaScript (ES6+), Tailwind CSS, Bootstrap, Material UI
Backend Development: Node.js, Express.js, Firebase, MongoDB, PHP (Laravel)
Development Tools: GitHub, Heroku, Vercel, Webpack, Babel
Testing & Optimization: Unit Testing (Jest, React Testing Library), Lighthouse Performance Audits

PROFESSIONAL EXPERIENCE

IT Support/Team Leader
Chislehurst Healthcare | Onsite (07/2023 - Present)
• Provided first-line technical support, efficiently resolving 95% of hardware/software issues
• Managed Microsoft Exchange, adding/removing users and troubleshooting email-related concerns
• Led IT training sessions for new employees, ensuring proficient use of company systems
• Advised 100+ team members on cybersecurity best practices and monitored data protection policies
• Created and maintained detailed inventory of 300+ company devices
• Took on leadership responsibilities, assisting other departments as required

Full Stack JavaScript Developer, Multiple Projects
Intercom Staffing / UpMySalary | Remote work USA (02/2021 - 04/2023)
• Collaborated with remote team to develop web applications using React.js and Next.js
• Served as the go-to developer for React.js debugging and implementation best practices
• Developed e-commerce solutions leveraging Firebase for secure authentication and database management
• Led UI/UX improvements, increasing user engagement by 30% and improving Lighthouse scores
• Implemented unit testing to enhance application stability and maintainability, reducing bugs by 25%

Full Stack Developer
We Are Rush | Remote Volunteer Work (03/2020-01/2021)
• Assisted in setting up and maintaining IT infrastructure for a digital vaccination certificate project
• Provided training on IT tools and security practices`;

function generatePDF() {
  const doc = new jsPDF();
  
  // Set font and margins
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  const lineHeight = 6;
  const sectionSpacing = 12;
  
  // Helper function to add text with proper line breaks
  function addText(text, fontSize = 10, isBold = false, isSection = false) {
    doc.setFontSize(fontSize);
    
    if (isBold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    
    if (isSection) {
      yPosition += sectionSpacing;
      doc.text(text, margin, yPosition);
      yPosition += lineHeight + 3;
      // Add underline for sections
      doc.line(margin, yPosition - 3, margin + doc.getTextWidth(text), yPosition - 3);
    } else {
      const lines = doc.splitTextToSize(text, maxLineWidth);
      doc.text(lines, margin, yPosition);
      yPosition += (lines.length * lineHeight);
    }
    
    yPosition += 3; // Small spacing after each element
  }
  
  // Parse content and generate PDF
  const lines = resumeContent.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      yPosition += 3;
      continue;
    }
    
    // Check if we need a new page
    if (yPosition > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Handle name (first line)
    if (i === 0 && line.length > 0) {
      addText(line, 16, true);
      continue;
    }
    
    // Handle contact info (second line)
    if (i === 1 && line.includes('[')) {
      addText(line, 10, false);
      yPosition += 5;
      continue;
    }
    
    // Handle section headers
    if (line === 'PROFESSIONAL SUMMARY' || 
        line === 'EDUCATION' || 
        line === 'TECHNICAL SKILLS' || 
        line === 'PROFESSIONAL EXPERIENCE') {
      addText(line, 12, true, true);
      continue;
    }
    
    // Handle job titles (lines that don't start with • and are not company lines)
    if (!line.startsWith('•') && 
        !line.includes('|') &&
        (line.includes('Team Leader') || 
         line.includes('Developer') || 
         line.includes('Full Stack'))) {
      addText(line, 11, true);
      continue;
    }
    
    // Handle company/date lines (contain |)
    if (line.includes('|')) {
      addText(line, 9, false);
      continue;
    }
    
    // Handle bullet points
    if (line.startsWith('•')) {
      addText(line, 10, false);
      continue;
    }
    
    // Handle regular text
    addText(line, 10, false);
  }
  
  // Save the PDF
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync('client/public/Prince_Ncube_Resume_Optimized.pdf', pdfBuffer);
  
  console.log('PDF generated successfully: Prince_Ncube_Resume_Optimized.pdf');
}

generatePDF();