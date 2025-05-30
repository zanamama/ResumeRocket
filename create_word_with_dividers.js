import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

async function createWordWithDividers() {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with name - centered
        new Paragraph({
          children: [
            new TextRun({
              text: "ZANA MATHUTHU",
              bold: true,
              size: 28,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        
        // Contact information - centered
        new Paragraph({
          children: [
            new TextRun({
              text: "zmathuthu@yahoo.com | (905) 806-5075",
              size: 20,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 480 },
        }),
        
        // Education section header
        new Paragraph({
          children: [
            new TextRun({
              text: "EDUCATION",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 60 },
        }),
        
        // Education section divider
        new Paragraph({
          children: [new TextRun({ text: "", size: 4 })],
          border: {
            bottom: {
              color: "000000",
              space: 0,
              style: BorderStyle.SINGLE,
              size: 6, // 1pt in Word units
            },
          },
          spacing: { after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: "Bachelor of Arts (B.A)",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Ursinus College",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Economics, Statistics",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Certified Scrum Master (CSM)",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "International SCRUM Institute",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "(Certification ID 33818054800387)",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Certified Scrum Product Owner (CSPO)",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "International SCRUM Institute",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Full Stack Web Development Certificate 2021",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Columbia Engineering",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The Fu Foundation School of Engineering & Applied Science",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Professional Summary section header
        new Paragraph({
          children: [
            new TextRun({
              text: "PROFESSIONAL SUMMARY",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 60 },
        }),
        
        // Professional Summary divider
        new Paragraph({
          children: [new TextRun({ text: "", size: 4 })],
          border: {
            bottom: {
              color: "000000",
              space: 0,
              style: BorderStyle.SINGLE,
              size: 6, // 1pt in Word units
            },
          },
          spacing: { after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: "Results-driven Senior Business Analyst with over 5 years of experience bridging the gap between business needs and technical solutions, with a recent focus on healthcare technology and enterprise solutions. Adept at leading cross-functional teams to deliver impactful projects, including complex integrations. Expertise in stakeholder management, requirements elicitation, and data-driven decision-making to enhance user experiences and drive operational efficiency.",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "My background includes designing streamlined workflows, optimizing systems, and leveraging tools like Jira, Confluence, Tableau, and SQL to ensure scalable and efficient outcomes. Known for my ability to communicate technical insights to non-technical audiences, I've successfully navigated competing priorities to meet stakeholder goals and exceed expectations.",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Passionate about solving complex challenges, I bring a client-centric mindset and a commitment to continuous improvement and upskilling quarterly. I am eager to leverage my technical acumen, analytical expertise, and proven leadership to deliver value in a fast-paced, high-impact consulting environment.",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Areas of Expertise section header
        new Paragraph({
          children: [
            new TextRun({
              text: "AREAS OF EXPERTISE",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 60 },
        }),
        
        // Areas of Expertise divider
        new Paragraph({
          children: [new TextRun({ text: "", size: 4 })],
          border: {
            bottom: {
              color: "000000",
              space: 0,
              style: BorderStyle.SINGLE,
              size: 6, // 1pt in Word units
            },
          },
          spacing: { after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: "User Acceptance Testing • Project Management • Data Analysis • Agile Methodology • Waterfall Methodology • Wireframe • Requirements Elicitation • End User Support • Data Visualization",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Experience section header
        new Paragraph({
          children: [
            new TextRun({
              text: "EXPERIENCE",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 60 },
        }),
        
        // Experience divider
        new Paragraph({
          children: [new TextRun({ text: "", size: 4 })],
          border: {
            bottom: {
              color: "000000",
              space: 0,
              style: BorderStyle.SINGLE,
              size: 6, // 1pt in Word units
            },
          },
          spacing: { after: 120 },
        }),
        
        // First Job - Uber Senior
        new Paragraph({
          children: [
            new TextRun({
              text: "Uber technologies                                                                                    12/2022 - Present",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Philadelphia, PA",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Senior Business Analyst (Contractor)",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Develop visually compelling Tableau and PowerPoint presentations that translate complex data into clear, strategic and actionable insights for the stakeholders involved.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Translator and communicator between the technology teams and the business team, ensuring confidence in understanding of the processes being presented. Holder of master files. Frequent meetings, analyzing aggregated data, model building, and sharing suggestions for improvement.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Collaborate independently with business stakeholders and users to define concepts and clarify functional and non-functional requirements, transforming the concepts into visualizations in the form of PowerPoint presentations, business process models, and using whichever analytics tool is required to share needs, reports, insights, and updates.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Work with users to translate functional and non-functional requirements into actionable application and operational deliverables, including user stories, acceptance criteria, and process flows, reducing development rework by 20%.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Develop and share comprehensive business process documentation—including policies, procedures, user guides, and job aids—resulting in a 30% reduction in training time for new users.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Partner with project managers to track and manage Agile-based SDLC projects, ensuring on-time delivery for 10+ initiatives, accredited to documentation success and clearly depicting needs through visuals and presentations.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Facilitate requirements-gathering meetings with cross-functional teams, successfully identifying critical business needs that resulted in a 20% increase in operational efficiency.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Conduct user acceptance tests (UAT) to identify bottlenecks and defects, reducing post-production issues by 35% and saving an estimated $200K annually in potential rework costs.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Provide detailed process improvement recommendations that streamline workflows and support the implementation of application enhancements, increasing productivity by 18% across departments.",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Second Job - Uber Associate
        new Paragraph({
          children: [
            new TextRun({
              text: "UBER TECHNOLOGIES                                                                               03/2020 - 12/2022",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Philadelphia, PA",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Associate Business Analyst (Contractor)",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Lead onboarding initiatives for healthcare partnerships and logistics teams, ensuring seamless integration of services that contributed to a 15% increase in user satisfaction ratings.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Coordinated with delivery teams to enhance service processes, achieving operational excellence and saving over $150K annually by reducing inefficiencies.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Utilized analytics and reporting tools to monitor project performance, providing actionable insights that improved decision-making and boosted delivery timelines by 22%.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Utilized the Salesforce platform, design approach, configuration and integration; Revenue Cloud/CPQ",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Worked with project teams and interfaced with clients and stakeholders to gather and document business needs, functional, and non-functional requirements for system changes, contributing to a 20% improvement in project delivery timelines.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Monitored projects throughout the SDLC process using Agile/SCRUM methodologies, ensuring successful completion of 6 initiatives with a 95% on-time delivery rate.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Facilitated meetings with users for elicitation and review of requirements, user stories, acceptance criteria, and other artifacts, resulting in a 25% reduction in requirement ambiguities and improved communication with technical teams.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Provided Subject Matter Expert (SME) assistance to team members by project 4, enhancing team productivity by 15% and reducing project roadblocks.",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Shadowed a senior business analyst for 1 month to quickly get acclimated to projects with external clients and begin working with stakeholders.",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Technical Skills section header
        new Paragraph({
          children: [
            new TextRun({
              text: "TECHNICAL SKILLS",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 60 },
        }),
        
        // Technical Skills divider
        new Paragraph({
          children: [new TextRun({ text: "", size: 4 })],
          border: {
            bottom: {
              color: "000000",
              space: 0,
              style: BorderStyle.SINGLE,
              size: 6, // 1pt in Word units
            },
          },
          spacing: { after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: "o SQL",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o JIRA",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o Confluence",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o MS Visio",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o CRM Systems",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o SnagIt",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o Tableau",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o Excel",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o Slack",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "o Salesforce",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
      ],
    }],
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('client/public/Zana_Mathuthu_Final_Resume.docx', buffer);
  
  console.log('Word document with dividers created: Zana_Mathuthu_Final_Resume.docx');
  console.log('File size:', buffer.length, 'bytes');
}

createWordWithDividers().catch(console.error);