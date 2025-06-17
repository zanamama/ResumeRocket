import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/file-upload";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export default function CreateResume() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    contactInfo: "",
    workHistory: "",
    education: "",
    skills: "",
    additionalInfo: ""
  });
  
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.workHistory.trim()) {
      toast({
        title: "Work History Required",
        description: "Please provide your work history and experience details.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Combine all form data into a comprehensive text
      const resumeData = `
PERSONAL INFORMATION:
Name: ${formData.fullName || "Not provided"}
Contact: ${formData.contactInfo || "Not provided"}

WORK HISTORY AND EXPERIENCE:
${formData.workHistory}

EDUCATION:
${formData.education || "Not provided"}

SKILLS:
${formData.skills || "Not provided"}

ADDITIONAL INFORMATION:
${formData.additionalInfo || "Not provided"}
      `.trim();

      // Create a text file from the form data
      const resumeBlob = new Blob([resumeData], { type: 'text/plain' });
      const resumeFile = new File([resumeBlob], 'resume_data.txt', { type: 'text/plain' });

      // Submit to standard optimization endpoint
      const result = await api.optimizeResumeStandard(resumeFile, formData.email || undefined);
      
      if (result.jobId) {
        setLocation(`/processing/${result.jobId}`);
      }
    } catch (error) {
      console.error("Resume creation error:", error);
      toast({
        title: "Creation Failed",
        description: "Unable to create your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const workHistoryPlaceholder = `Please provide detailed information about your work experience over the last 10 years. Include:

• Job titles and company names
• Employment dates (start and end dates)
• Key responsibilities and achievements
• Notable accomplishments, awards, or recognition
• Quantifiable results (increased sales by X%, managed team of Y people, etc.)
• Skills developed or technologies used

Example:
Senior Marketing Manager, ABC Corporation (January 2020 - Present)
- Led digital marketing campaigns that increased brand awareness by 40%
- Managed a team of 5 marketing specialists
- Developed social media strategy resulting in 200% follower growth
- Implemented marketing automation tools reducing campaign setup time by 60%

Marketing Specialist, XYZ Company (June 2018 - December 2019)
- Created content for social media platforms reaching 50K+ monthly impressions
- Coordinated trade show participation generating 150+ qualified leads
- Collaborated with sales team to develop lead nurturing campaigns

Feel free to include as much detail as possible - the more information you provide, the better we can craft your professional resume.`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold text-black">Create Your Resume from Scratch</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">Tell Us About Your Experience</h2>
          <p className="text-ios-text text-lg">
            Share your work history, skills, and achievements. Our AI will transform this information 
            into a professional, ATS-optimized resume that gets you noticed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Your full name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactInfo">Contact Details</Label>
                  <Textarea
                    id="contactInfo"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                    placeholder="Email: your.email@example.com&#10;Phone: (555) 123-4567&#10;Location: City, State&#10;LinkedIn: linkedin.com/in/yourprofile"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email for Notifications (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Get notified when your resume is ready"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Work History - Main Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Work History & Experience</CardTitle>
                <p className="text-sm text-ios-text">
                  This is the most important section. Be as detailed as possible.
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.workHistory}
                  onChange={(e) => handleInputChange("workHistory", e.target.value)}
                  placeholder={workHistoryPlaceholder}
                  rows={15}
                  className="min-h-[400px] font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                  placeholder="List your educational background:&#10;&#10;• Degree, Institution, Graduation Year&#10;• Certifications and relevant coursework&#10;• Honors, awards, or notable achievements&#10;&#10;Example:&#10;Bachelor of Science in Marketing, University of California, 2018&#10;Google Analytics Certified, 2020&#10;Salesforce Administrator Certification, 2021"
                  rows={6}
                  className="mt-1"
                />
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="List your technical and professional skills:&#10;&#10;• Software and tools you're proficient in&#10;• Programming languages or technical skills&#10;• Industry-specific knowledge&#10;• Language proficiencies&#10;&#10;Example:&#10;• Marketing: Google Analytics, HubSpot, Salesforce, Adobe Creative Suite&#10;• Technical: HTML/CSS, SQL, Microsoft Office Suite, Tableau&#10;• Languages: English (Native), Spanish (Conversational)"
                  rows={6}
                  className="mt-1"
                />
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Any additional information that would strengthen your resume:&#10;&#10;• Professional memberships or associations&#10;• Volunteer work or community involvement&#10;• Publications, presentations, or speaking engagements&#10;• Awards or recognition&#10;• Projects or side work&#10;• Professional interests or career objectives"
                  rows={6}
                  className="mt-1"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supporting Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supporting Documents</CardTitle>
                <p className="text-sm text-ios-text">
                  Upload any documents that might help (optional)
                </p>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesChange={setSupportingFiles}
                  accept={{ 
                    'application/pdf': ['.pdf'], 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                    'text/plain': ['.txt']
                  }}
                  maxFiles={3}
                  maxSize={10 * 1024 * 1024} // 10MB
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-ios-blue transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    Old resumes, job descriptions, or reference documents
                  </p>
                </FileUpload>
                
                {supportingFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {supportingFiles.map((file, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <FileText className="w-4 h-4 mr-2" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-ios-text space-y-3">
                <div>
                  <strong className="text-black">Be Specific:</strong> Include exact dates, company names, and quantifiable achievements.
                </div>
                <div>
                  <strong className="text-black">Use Keywords:</strong> Mention industry-specific terms and skills relevant to your field.
                </div>
                <div>
                  <strong className="text-black">Show Impact:</strong> Focus on what you accomplished, not just what you did.
                </div>
                <div>
                  <strong className="text-black">Stay Recent:</strong> Emphasize the last 10 years of experience.
                </div>
              </CardContent>
            </Card>

            {/* Create Button */}
            <Button 
              onClick={handleSubmit}
              disabled={isProcessing || !formData.workHistory.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
              size="lg"
            >
              {isProcessing ? "Creating Your Resume..." : "Create My Professional Resume"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}