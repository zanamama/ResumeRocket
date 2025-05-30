import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

async function createZanaWordDoc() {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with name
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
        
        // Contact information
        new Paragraph({
          children: [
            new TextRun({
              text: "zana.mathuthu@gmail.com | (905) 806-5075",
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
              text: "York University - Toronto, ON",
              bold: true,
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Honours Bachelor of Administrative Studies, Management",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "September 2018 - April 2022",
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
              text: "Results-driven Senior Business Analyst with over 7 years of experience bridging the gap between business needs and technical solutions, with a recent focus on enterprise solutions. Adept at leading cross-functional teams to deliver impactful projects, including complex integrations. Expertise in stakeholder management, requirements elicitation, and data-driven decision-making to enhance user experiences and drive operational efficiency. Known for ability to communicate technical insights to non-technical audiences and navigate competing priorities to meet stakeholder goals.",
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
              text: "Advanced SQL, JIRA, Confluence, Excel, MS Visio, CRM Systems, SnagIt, PowerBI, Tableau, SharePoint, Draw.io, Salesforce",
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
        
        // First Job
        new Paragraph({
          children: [
            new TextRun({
              text: "Senior Business Analyst | Bell Canada",
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: "                                                Toronto, ON | June 2023 - Present",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Led cross-functional teams to deliver enterprise solutions for telecommunications services",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Collaborated with stakeholders to gather requirements and translate business needs into technical specifications",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Facilitated requirements gathering sessions and stakeholder meetings to ensure project alignment",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Second Job
        new Paragraph({
          children: [
            new TextRun({
              text: "Business Analyst | RBC Royal Bank",
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: "                                                Toronto, ON | January 2021 - May 2023",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Analyzed complex business processes and identified opportunities for improvement in banking operations",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Developed comprehensive documentation and process flows for regulatory compliance initiatives",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Collaborated with IT teams to implement system enhancements and data analytics solutions",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
        
        // Third Job
        new Paragraph({
          children: [
            new TextRun({
              text: "Junior Business Analyst | Shopify",
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: "                                                Ottawa, ON | June 2019 - December 2020",
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Supported senior analysts in requirements gathering and documentation for e-commerce platform enhancements",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Conducted user acceptance testing and quality assurance for new feature releases",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Assisted in data analysis and reporting to support business decision-making processes",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),
      ],
    }],
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('client/public/Zana_Mathuthu_Resume.docx', buffer);
  
  console.log('Word document created: Zana_Mathuthu_Resume.docx');
  console.log('File size:', buffer.length, 'bytes');
}

createZanaWordDoc().catch(console.error);