import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function StandardMode() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResumeChange = (files: File[]) => {
    setResumeFile(files[0] || null);
  };

  const handleSupportingChange = (files: File[]) => {
    setSupportingFiles(files);
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

    setIsLoading(true);
    try {
      const result = await api.optimizeResumeStandard(resumeFile, email || undefined);
      setLocation(`/processing/${result.jobId}?mode=standard`);
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

      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/">
            <Button variant="ghost" className="inline-flex items-center text-ios-blue hover:text-blue-600 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to options
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-black mb-4">Standard Resume Polish</h1>
          <p className="text-ios-text max-w-xl mx-auto">
            Upload your current resume and we'll transform it into a polished, 
            professional document that stands out to recruiters.
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

            {/* Supporting Documents */}
            <div>
              <Label className="text-lg font-semibold text-black mb-4 block">
                Supporting Documents{" "}
                <span className="text-ios-secondary font-normal text-base">(Optional)</span>
              </Label>
              <FileUpload
                onFilesChange={handleSupportingChange}
                maxFiles={5}
                multiple={true}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-lg">📎</span>
                  </div>
                  <div>
                    <p className="text-ios-text text-sm mb-1">Cover letter, LinkedIn profile, portfolio links</p>
                    <p className="text-ios-secondary text-xs">Additional context helps create better optimizations</p>
                  </div>
                </div>
              </FileUpload>
            </div>

            {/* Email Input */}
            <div>
              <Label className="text-lg font-semibold text-black mb-4 block">
                Email Address{" "}
                <span className="text-ios-secondary font-normal text-base">(Optional)</span>
              </Label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-4 text-ios-text placeholder-ios-secondary focus:border-ios-blue"
              />
              <p className="text-ios-secondary text-sm mt-2">
                We'll email you the download links for easy access
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!resumeFile || isLoading}
              className="w-full bg-ios-blue text-white py-4 text-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Starting optimization..." : "Polish My Resume"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
