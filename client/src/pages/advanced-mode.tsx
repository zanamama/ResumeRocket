import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function AdvancedMode() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobFiles, setJobFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");
  const [includeGoogleDocs, setIncludeGoogleDocs] = useState(true);
  const [includePdf, setIncludePdf] = useState(true);
  const [includeCoverLetters, setIncludeCoverLetters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResumeChange = (files: File[]) => {
    setResumeFile(files[0] || null);
  };

  const handleJobFilesChange = (files: File[]) => {
    setJobFiles(files);
  };

  const handleSubmit = async () => {
    if (!resumeFile) {
      toast({
        title: "Error",
        description: "Please upload your resume first",
        variant: "destructive",
      });
      return;
    }

    if (jobFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one job description",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Error",
        description: "Email address is required for advanced mode",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await api.optimizeResumeAdvanced(resumeFile, jobFiles, email);
      setLocation(`/processing/${result.jobId}?mode=advanced&count=${result.jobCount}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start optimization",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/assets/logo-2.70e507e8.png" alt="UpMySalary" className="w-16 h-16" />
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/">
            <Button variant="ghost" className="inline-flex items-center text-ios-blue hover:text-blue-600 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to options
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-black mb-4">Job-Tailored Resumes</h1>
          <p className="text-ios-text max-w-2xl mx-auto">
            Upload your resume and up to 20 job descriptions. We'll create perfectly 
            tailored versions for each opportunity with matching keywords and requirements.
          </p>
        </div>

        {/* Upload Form */}
        <Card>
          <CardContent className="p-8 space-y-8">
            {/* Resume Upload */}
            <div>
              <Label className="text-lg font-semibold text-black mb-4 block">
                Upload Your Resume
              </Label>
              <FileUpload
                onFilesChange={handleResumeChange}
                maxFiles={1}
                multiple={false}
              />
            </div>

            {/* Job Descriptions Upload */}
            <div>
              <Label className="text-lg font-semibold text-black mb-4 block">
                Job Descriptions{" "}
                <span className="text-ios-secondary font-normal text-base">(Up to 20)</span>
              </Label>
              <FileUpload
                onFilesChange={handleJobFilesChange}
                maxFiles={20}
                multiple={true}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <p className="text-ios-text mb-2">Drop job descriptions here or click to browse</p>
                    <p className="text-ios-secondary text-sm mb-4">Upload PDFs, text files, or paste job description text</p>
                    
                    {/* File Counter */}
                    <div className="bg-gray-100 rounded-xl px-4 py-2 inline-block">
                      <span className="text-ios-text font-medium">{jobFiles.length}</span>
                      <span className="text-ios-secondary"> / 20 files uploaded</span>
                    </div>
                  </div>
                </div>
              </FileUpload>
            </div>

            {/* Email Input */}
            <div>
              <Label className="text-lg font-semibold text-black mb-4 block">
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-4 text-ios-text placeholder-ios-secondary focus:border-ios-blue"
                required
              />
              <p className="text-ios-secondary text-sm mt-2">
                Required for delivering multiple tailored resumes
              </p>
            </div>

            {/* Processing Options */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-black mb-3">Output Options</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="google-docs"
                    checked={includeGoogleDocs}
                    onCheckedChange={(checked) => setIncludeGoogleDocs(checked as boolean)}
                  />
                  <Label htmlFor="google-docs" className="text-ios-text">
                    Google Docs format (recommended)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="pdf"
                    checked={includePdf}
                    onCheckedChange={(checked) => setIncludePdf(checked as boolean)}
                  />
                  <Label htmlFor="pdf" className="text-ios-text">
                    PDF format
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="cover-letters"
                    checked={includeCoverLetters}
                    onCheckedChange={(checked) => setIncludeCoverLetters(checked as boolean)}
                  />
                  <Label htmlFor="cover-letters" className="text-ios-text">
                    Include cover letter templates
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!resumeFile || jobFiles.length === 0 || !email || isLoading}
              className="w-full bg-ios-blue text-white py-4 text-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Starting optimization..." : "Create Tailored Resumes"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
