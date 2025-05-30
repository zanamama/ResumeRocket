import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

async function createMatchingWordDoc() {
  // Use the exact same content as the PDF
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
        
        // Education section
        new Paragraph({
          children: [
            new TextRun({
              text: "EDUCATION",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Ursinus College                                                                                            Collegeville, PA",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Bachelor of Arts (B.A), Economics, Statistics                                                                     2018",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Columbia Engineering - The Fu Foundation School of Engineering & Applied Science",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Full Stack Web Development Certificate                                                                           2021",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Professional Summary section
        new Paragraph({
          children: [
            new TextRun({
              text: "PROFESSIONAL SUMMARY",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Results-driven Senior Business Analyst with over 5 years of experience bridging the gap between business needs and technical solutions, with a recent focus on healthcare technology and enterprise solutions. Adept at leading cross-functional teams to deliver impactful projects, including complex integrations. Expertise in stakeholder management, requirements elicitation, and data-driven decision-making to enhance user experiences and drive operational efficiency. My background includes designing streamlined workflows, optimizing systems, and leveraging tools like Jira, Confluence, Tableau, and SQL to ensure scalable and efficient outcomes. Known for my ability to communicate technical insights to non-technical audiences, I've successfully navigated competing priorities to meet stakeholder goals and exceed expectations. Passionate about solving complex challenges, I bring a client-centric mindset and a commitment to continuous improvement and upskilling quarterly. I am eager to leverage my technical acumen, analytical expertise, and proven leadership to deliver value in a fast-paced, high-impact consulting environment.",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Technical Skills section
        new Paragraph({
          children: [
            new TextRun({
              text: "TECHNICAL SKILLS",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "SQL, JIRA, Confluence, MS Visio, CRM Systems, SnagIt, Tableau, Excel, Slack, Salesforce",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Professional Experience section
        new Paragraph({
          children: [
            new TextRun({
              text: "PROFESSIONAL EXPERIENCE",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        
        // First Job - Uber Senior
        new Paragraph({
          children: [
            new TextRun({
              text: "Uber Technologies                                                                                    Philadelphia, PA",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Senior Business Analyst (Contractor)                                                            12/2022 - Present",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Develop visually compelling Tableau and PowerPoint presentations that translate complex data into clear, strategic and actionable insights for stakeholders",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Translator and communicator between technology teams and business team, ensuring confidence in understanding of processes being presented",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Collaborate independently with business stakeholders to define concepts and clarify functional requirements, transforming concepts into visualizations",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Work with users to translate requirements into actionable deliverables, reducing development rework by 20%",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Develop comprehensive business process documentation, resulting in 30% reduction in training time for new users",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Partner with project managers to track Agile-based SDLC projects, ensuring on-time delivery for 10+ initiatives",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Conduct user acceptance tests (UAT), reducing post-production issues by 35% and saving $200K annually",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Second Job - Uber Associate
        new Paragraph({
          children: [
            new TextRun({
              text: "Associate Business Analyst (Contractor)                                                           03/2020 - 12/2022",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Lead onboarding initiatives for healthcare partnerships, contributing to 15% increase in user satisfaction ratings",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Coordinated with delivery teams to enhance service processes, saving over $150K annually by reducing inefficiencies",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Utilized analytics and reporting tools to monitor project performance, boosting delivery timelines by 22%",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Worked with project teams to gather business requirements, contributing to 20% improvement in project delivery timelines",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Monitored projects using Agile/SCRUM methodologies, achieving 95% on-time delivery rate for 6 initiatives",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
      ],
    }],
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('client/public/Zana_Mathuthu_Complete_Resume.docx', buffer);
  
  console.log('Complete Word document created: Zana_Mathuthu_Complete_Resume.docx');
  console.log('File size:', buffer.length, 'bytes');
}

createMatchingWordDoc().catch(console.error);