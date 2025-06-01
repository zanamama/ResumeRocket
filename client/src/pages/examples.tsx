import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Examples() {
  const resumeExamples = [
    {
      title: "Software Developer",
      jobTitle: "Senior Full Stack Developer",
      industry: "Technology",
      experience: "5+ years",
      keySkills: ["React", "Node.js", "Python", "AWS"],
      description: "Optimized for modern tech roles with emphasis on full-stack capabilities and cloud experience."
    },
    {
      title: "Business Development Manager",
      jobTitle: "Strategic Business Development Manager",
      industry: "Sales & Marketing",
      experience: "7+ years",
      keySkills: ["Strategic Planning", "Client Relations", "Market Analysis", "Revenue Growth"],
      description: "Enhanced for leadership roles with focus on strategic thinking and relationship building."
    },
    {
      title: "Certified Nursing Assistant",
      jobTitle: "Certified Nursing Assistant",
      industry: "Healthcare",
      experience: "3+ years",
      keySkills: ["Patient Care", "Medical Documentation", "Vital Signs", "Healthcare Compliance"],
      description: "Tailored for healthcare professionals with emphasis on patient care and medical expertise."
    },
    {
      title: "Marketing Specialist",
      jobTitle: "Digital Marketing Specialist",
      industry: "Marketing & Advertising",
      experience: "4+ years",
      keySkills: ["Digital Marketing", "SEO/SEM", "Analytics", "Content Strategy"],
      description: "Focused on digital marketing expertise with data-driven results and campaign management."
    },
    {
      title: "Financial Analyst",
      jobTitle: "Senior Financial Analyst",
      industry: "Finance",
      experience: "6+ years",
      keySkills: ["Financial Modeling", "Data Analysis", "Risk Assessment", "Excel/SQL"],
      description: "Structured for finance roles with emphasis on analytical skills and quantitative expertise."
    },
    {
      title: "Project Manager",
      jobTitle: "Senior Project Manager",
      industry: "Operations",
      experience: "8+ years",
      keySkills: ["Project Planning", "Team Leadership", "Agile/Scrum", "Risk Management"],
      description: "Optimized for management roles with focus on leadership and process improvement."
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Resume Examples</h1>
          <p className="text-xl text-ios-text max-w-3xl mx-auto">
            See how UpMySalary transforms resumes across different industries and experience levels
          </p>
        </div>

        {/* Resume Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {resumeExamples.map((example, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {example.industry}
                  </Badge>
                  <span className="text-xs text-ios-text">
                    {example.experience}
                  </span>
                </div>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-ios-blue">
                  {example.jobTitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-ios-text mb-4">
                  {example.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-black">Key Skills Enhanced:</h4>
                  <div className="flex flex-wrap gap-1">
                    {example.keySkills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">What Our Optimization Includes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">Enhanced Phrasing</h3>
              <p className="text-sm text-ios-text">Professional language that showcases your achievements</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">ATS Optimization</h3>
              <p className="text-sm text-ios-text">Keywords and formatting that pass applicant tracking systems</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">Metrics Focus</h3>
              <p className="text-sm text-ios-text">Quantified results that demonstrate your impact</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-black mb-2">Professional Structure</h3>
              <p className="text-sm text-ios-text">Clean, industry-standard formatting that recruiters expect</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Transform Your Resume?</h2>
          <p className="text-ios-text mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully improved their job prospects with our AI-powered resume optimization.
          </p>
          <Link href="/">
            <Button className="bg-ios-blue text-white px-8 py-3 hover:bg-blue-600">
              Start Optimizing Now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}