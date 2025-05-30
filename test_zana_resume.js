// Test script to process Zana's resume and generate PDF
const fs = require('fs');
const FormData = require('form-data');

// Copy the attached file to a test location
const resumeContent = `Results-driven Senior Business Analyst with over 7 years of experience bridging the gap between business needs and technical solutions, with a recent focus on enterprise solutions. Adept at leading cross-functional teams to deliver impactful projects, including complex integrations. Expertise in stakeholder management, requirements elicitation, and data-driven decision-making to enhance user experiences and drive operational efficiency.

My background includes designing streamlined workflows, optimizing systems, analyzing competitor data, and leveraging tools like Jira, Confluence, Excel, PowerBI, and SQL to ensure scalable and efficient outcomes. Known for my ability to communicate technical insights to non-technical audiences, I've successfully navigated competing priorities to meet stakeholder goals and exceed expectations.

Passionate about solving complex challenges, I bring a client-centric mindset and a commitment to continuous improvement and upskilling quarterly. I am eager to leverage my technical acumen, analytical expertise, and proven leadership to deliver value in a fast-paced, high-impact consulting environment.

AREAS OF EXPERTISE
Customer Relationship Management, User Acceptance Testing, Project Management, Data Analysis
Agile Methodology, Waterfall Methodology, Wireframe, Requirements Elicitation
End User Support, Data Visualization

EXPERIENCE

Uber technologies | Philadelphia, PA (12/2022 - Present)
Senior Business Analyst (Contractor)
• Collaborate independently with business stakeholders and various leaders to define processes, identify gaps, and map out areas for growth in operational efficiency
• Work with users to translate functional and non-functional requirements into actionable application and operational deliverables, including user stories, acceptance criteria, and process flows, reducing development rework by 20%
• Develop and maintain comprehensive business process documentation—including policies, procedures, user guides, and job aids—resulting in a 30% reduction in training time for new users
• Partner with project managers to track and manage Agile-based SDLC projects, ensuring on-time delivery for 10+ initiatives and achieving a 95% stakeholder satisfaction rate
• Prepare detailed reports, presentations, modeling documentation and briefing materials as needed for presentations and sharing technical knowledge to business leaders involved
• Facilitate requirements-gathering meetings with cross-functional teams, successfully identifying critical business needs that resulted in a 20% increase in operational efficiency
• Conduct user acceptance tests (UAT) to identify bottlenecks and defects, reducing post-production issues by 35% and saving an estimated $200K annually in potential rework costs
• Provide detailed process improvement recommendations that streamline workflows and support the implementation of application enhancements, increasing productivity by 18% across departments
• Attend and participate heavily in daily scrum meetings, sprint reviews, retrospectives, and backlog refinement

UBER TECHNOLOGIES | Philadelphia, PA (03/2020 - 12/2022)
Business Analyst (Contractor)
• Lead onboarding initiatives for healthcare partnerships and logistics teams, ensuring seamless integration of services that contributed to a 15% increase in user satisfaction ratings
• Coordinated with delivery teams to enhance service processes, achieving operational excellence and saving over $150K annually by reducing inefficiencies
• Utilized analytics and reporting tools to monitor project performance, providing actionable insights that improved decision-making and boosted delivery timelines by 22%
• Utilized the Salesforce platform, design approach, configuration and integration; Revenue Cloud/CPQ
• Worked with project teams and interfaced with clients and stakeholders to gather and document business needs, functional, and non-functional requirements for system changes, contributing to a 20% improvement in project delivery timelines
• Monitored projects throughout the SDLC process using Agile/SCRUM methodologies, ensuring successful completion of 6 initiatives with a 95% on-time delivery rate
• Facilitated meetings with users for elicitation and review of requirements, user stories, acceptance criteria, and other artifacts, resulting in a 25% reduction in requirement ambiguities and improved communication with technical teams
• Provided Subject Matter Expert (SME) assistance to team members by project 4, enhancing team productivity by 15% and reducing project roadblocks
• Shadowed a senior business analyst for 1 month to quickly get acclimated to projects with external clients and begin working with stakeholders

TECHNICAL SKILLS
SQL, JIRA, Confluence, Excel, MS Visio, CRM Systems, SnagIt, PowerBI, Tableau, SharePoint, Draw.io, Salesforce

EDUCATION
Bachelor of Arts (B.A) | Ursinus College
Certified Scrum Master (CSM) | International SCRUM Institute (Certification ID 33818054800387)
Certified Scrum Product Owner (CSPO) | International SCRUM Institute
Full Stack Web Development Certificate 2021 | Columbia Engineering, The Fu Foundation School of Engineering & Applied Science`;

console.log('Resume content prepared for testing...');
console.log('Length:', resumeContent.length, 'characters');