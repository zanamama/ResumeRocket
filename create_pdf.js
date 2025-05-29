import puppeteer from 'puppeteer';
import fs from 'fs';

const resumeContent = `
PRINCE NCUBE
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
• Created and maintained a detailed inventory of 300+ company devices
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
• Provided training on IT tools and security practices
`;

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { 
      margin: 0.75in; 
      size: A4;
    }
    body { 
      font-family: 'Times New Roman', serif; 
      font-size: 11pt; 
      line-height: 1.4; 
      color: #000; 
      margin: 0; 
      padding: 0;
      background: white;
    }
    .header { 
      text-align: center; 
      margin-bottom: 20px; 
      border-bottom: 2px solid #000; 
      padding-bottom: 10px; 
    }
    .name { 
      font-size: 18pt; 
      font-weight: bold; 
      margin-bottom: 8px; 
    }
    .contact { 
      font-size: 10pt; 
      margin-bottom: 4px; 
    }
    .section-title { 
      font-size: 12pt; 
      font-weight: bold; 
      text-transform: uppercase; 
      margin-top: 18px; 
      margin-bottom: 8px; 
      border-bottom: 1px solid #333; 
      padding-bottom: 3px; 
    }
    .job-title { 
      font-weight: bold; 
      margin-top: 12px; 
      margin-bottom: 3px; 
    }
    .company-date { 
      font-style: italic; 
      margin-bottom: 6px; 
      font-size: 10pt;
    }
    .bullet { 
      margin-left: 20px; 
      margin-bottom: 3px; 
    }
    .education-item { 
      margin-bottom: 6px; 
      margin-left: 10px;
    }
    .skills-category {
      margin-bottom: 8px;
    }
    .skills-title {
      font-weight: bold;
      display: inline;
    }
    pre {
      font-family: 'Times New Roman', serif;
      white-space: pre-wrap;
      margin: 0;
      font-size: 11pt;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <pre>${resumeContent}</pre>
</body>
</html>
`;

async function createPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      top: '0.75in',
      right: '0.75in',
      bottom: '0.75in',
      left: '0.75in'
    },
    printBackground: true
  });
  
  await browser.close();
  
  fs.writeFileSync('Prince_Ncube_Optimized_Resume.pdf', pdfBuffer);
  console.log('PDF created successfully: Prince_Ncube_Optimized_Resume.pdf');
}

createPDF().catch(console.error);