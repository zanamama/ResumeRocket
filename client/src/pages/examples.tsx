import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";
import { Link } from "wouter";

export default function Examples() {
  const resumeExamples = [
    {
      id: 1,
      title: "Software Developer",
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      phone: "(555) 123-4567",
      description: "Full Stack Developer with 5+ years of experience in JavaScript, React, and Node.js",
      highlights: [
        "Led development of e-commerce platform serving 100K+ users",
        "Reduced application load time by 40% through optimization",
        "Mentored 6 junior developers in modern web technologies"
      ],
      skills: "JavaScript, React, Node.js, Python, AWS, MongoDB, PostgreSQL, Docker"
    },
    {
      id: 2,
      title: "Business Development Manager",
      name: "Sarah Chen",
      email: "sarah.chen@email.com", 
      phone: "(555) 234-5678",
      description: "Strategic Business Development Manager with 8+ years driving revenue growth",
      highlights: [
        "Generated $2.5M in new business revenue over 2 years",
        "Established partnerships with 15+ Fortune 500 companies",
        "Increased market penetration by 35% in key territories"
      ],
      skills: "Strategic Planning, Sales Management, Partnership Development, CRM, Salesforce, Market Analysis"
    },
    {
      id: 3,
      title: "Certified Nursing Assistant (CNA)",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "(555) 345-6789", 
      description: "Compassionate CNA with 4+ years providing exceptional patient care",
      highlights: [
        "Maintained 98% patient satisfaction scores across all units",
        "Certified in CPR, BLS, and specialized dementia care",
        "Supported 25+ patients daily in long-term care facility"
      ],
      skills: "Patient Care, Vital Signs, Medical Terminology, ADL Assistance, Documentation, Emergency Response"
    },
    {
      id: 4,
      title: "Marketing Specialist",
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "(555) 456-7890",
      description: "Digital Marketing Specialist with expertise in SEO, PPC, and content strategy",
      highlights: [
        "Increased organic traffic by 150% through SEO optimization",
        "Managed $500K annual advertising budget with 25% ROI",
        "Created content strategy that boosted engagement by 80%"
      ],
      skills: "SEO/SEM, Google Analytics, Content Marketing, Social Media, PPC, Email Marketing, Adobe Creative Suite"
    },
    {
      id: 5,
      title: "Data Analyst",
      name: "Jennifer Park",
      email: "jennifer.park@email.com",
      phone: "(555) 567-8901",
      description: "Data Analyst with 6+ years transforming complex data into actionable insights",
      highlights: [
        "Built predictive models that improved forecasting accuracy by 30%",
        "Automated reporting processes, saving 20 hours per week",
        "Presented insights to C-level executives driving $1M cost savings"
      ],
      skills: "Python, SQL, Tableau, Power BI, Machine Learning, Statistics, Excel, R, Data Visualization"
    },
    {
      id: 6,
      title: "Project Manager",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "(555) 678-9012",
      description: "Agile Project Manager with 7+ years delivering complex technical projects",
      highlights: [
        "Successfully delivered 15+ projects on time and under budget",
        "Led cross-functional teams of up to 20 members",
        "Achieved 95% stakeholder satisfaction across all projects"
      ],
      skills: "Agile/Scrum, Project Planning, Risk Management, Stakeholder Management, JIRA, MS Project, Budget Management"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/assets/logo-2.70e507e8.png" alt="UpMySalary" className="w-16 h-16" />
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-ios-text hover:text-black transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-ios-text hover:text-black transition-colors">How it Works</Link>
              <Link href="/examples" className="text-ios-blue font-medium">Examples</Link>
              <a href="mailto:upmypay@gmail.com?subject=UpMySalary Support Request" className="text-ios-text hover:text-black transition-colors">Support</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Perfect Resume Examples
        </h1>
        <p className="text-xl text-ios-text mb-12 max-w-2xl mx-auto leading-relaxed">
          See what a professionally optimized resume looks like across different industries and experience levels.
        </p>
      </section>

      {/* Resume Examples Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeExamples.map((resume) => (
            <Card key={resume.id} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-black">{resume.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-ios-text">
                  {resume.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-black text-lg">{resume.name}</h3>
                  <p className="text-sm text-ios-text">{resume.email}</p>
                  <p className="text-sm text-ios-text">{resume.phone}</p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="font-semibold text-black mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {resume.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm text-ios-text flex items-start">
                        <span className="text-ios-blue mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Preview */}
                <div>
                  <h4 className="font-semibold text-black mb-2">Core Skills:</h4>
                  <p className="text-sm text-ios-text leading-relaxed">{resume.skills}</p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100">
                  <Link href="/standard">
                    <Button className="w-full bg-ios-blue text-white hover:bg-blue-600">
                      Create Similar Resume
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-black mb-6">
          Ready to Create Your Perfect Resume?
        </h2>
        <p className="text-lg text-ios-text mb-8">
          Upload your current resume and get a professionally optimized version that stands out to employers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/standard">
            <Button size="lg" className="w-full sm:w-auto bg-ios-blue text-white hover:bg-blue-600 px-8 py-3">
              Start Standard Polish
            </Button>
          </Link>
          <Link href="/advanced">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-ios-blue text-ios-blue hover:bg-ios-blue hover:text-white px-8 py-3">
              Try Advanced Tailoring
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}