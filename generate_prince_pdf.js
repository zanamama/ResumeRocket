import { createWriteStream } from 'fs';

// Simple PDF creation without external dependencies
function createSimplePDF(content, filename) {
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Times-Roman
>>
endobj

5 0 obj
<<
/Length 6 0 R
>>
stream
BT
/F1 12 Tf
50 750 Td
(PRINCE NCUBE) Tj
0 -20 Td
([Phone] | [Email] | [Address]) Tj
0 -30 Td
(PROFESSIONAL SUMMARY) Tj
0 -15 Td
(Results-driven IT professional with comprehensive expertise in system) Tj
0 -12 Td
(administration, software development, and IT support. Proven record of) Tj
0 -12 Td
(collaborating effectively with remote and onsite teams to deliver) Tj
0 -12 Td
(impactful solutions. Skilled in leading IT training, optimizing user) Tj
0 -12 Td
(engagement, and enhancing cybersecurity practices.) Tj
0 -30 Td
(EDUCATION) Tj
0 -15 Td
(• Harvard CS50 Online, React Native Developer, 01/2020 – 02/2020) Tj
0 -12 Td
(• Udemy Online, Web Developer Courses: React Certification,) Tj
0 -12 Td
(  Laravel Certification, 2018-2020) Tj
0 -12 Td
(• Google Scholarship, Android Mobile Developer, 2017 - 2018) Tj
0 -12 Td
(• NCC Education, Diploma in Computing Level 5, 2013 - 2016) Tj
0 -12 Td
(• CompTIA A+ Certification, Expected 08/2024) Tj
0 -30 Td
(TECHNICAL SKILLS) Tj
0 -15 Td
(IT Support & System Administration: Microsoft Exchange,) Tj
0 -12 Td
(Active Directory, Windows & macOS troubleshooting) Tj
0 -12 Td
(Frontend Development: React.js, Next.js, Redux, JavaScript \\(ES6+\\),) Tj
0 -12 Td
(Tailwind CSS, Bootstrap, Material UI) Tj
0 -12 Td
(Backend Development: Node.js, Express.js, Firebase, MongoDB,) Tj
0 -12 Td
(PHP \\(Laravel\\)) Tj
0 -30 Td
(PROFESSIONAL EXPERIENCE) Tj
0 -20 Td
(IT Support/Team Leader) Tj
0 -12 Td
(Chislehurst Healthcare | Onsite \\(07/2023 - Present\\)) Tj
0 -12 Td
(• Provided first-line technical support, efficiently resolving) Tj
0 -12 Td
(  95% of hardware/software issues) Tj
0 -12 Td
(• Managed Microsoft Exchange, adding/removing users and) Tj
0 -12 Td
(  troubleshooting email-related concerns) Tj
0 -12 Td
(• Led IT training sessions for new employees) Tj
0 -12 Td
(• Advised 100+ team members on cybersecurity best practices) Tj
0 -12 Td
(• Created and maintained detailed inventory of 300+ company devices) Tj
0 -20 Td
(Full Stack JavaScript Developer, Multiple Projects) Tj
0 -12 Td
(Intercom Staffing / UpMySalary | Remote work USA \\(02/2021 - 04/2023\\)) Tj
0 -12 Td
(• Collaborated with remote team to develop web applications) Tj
0 -12 Td
(• Led UI/UX improvements, increasing user engagement by 30%) Tj
0 -12 Td
(• Implemented unit testing, reducing bugs by 25%) Tj
ET
endstream
endobj

6 0 obj
2847
endobj

xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000262 00000 n 
0000000334 00000 n 
0000003234 00000 n 
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
3253
%%EOF`;

  return Buffer.from(pdfContent);
}

// Generate the PDF
const pdfBuffer = createSimplePDF();
const fs = await import('fs');
fs.writeFileSync('Prince_Ncube_Resume.pdf', pdfBuffer);
console.log('PDF file created: Prince_Ncube_Resume.pdf');