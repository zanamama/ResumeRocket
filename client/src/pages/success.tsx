import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, FileText, Package, Mail, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import type { StandardResult, AdvancedResult } from "@/lib/types";

export default function Success() {
  const [, params] = useRoute("/success/:jobId");
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode") as "standard" | "advanced";
  
  const jobId = params?.jobId ? parseInt(params.jobId) : null;

  const { data: results, isLoading } = useQuery({
    queryKey: ["/api/resume/job", jobId, "results"],
    queryFn: () => api.getJobResults(jobId!),
    enabled: !!jobId,
  });

  if (!jobId || isLoading) {
    return <SuccessSkeleton />;
  }

  if (mode === "standard") {
    return <StandardSuccess results={results?.outputFiles as StandardResult} />;
  } else {
    return <AdvancedSuccess results={results?.outputFiles as AdvancedResult} />;
  }
}

function StandardSuccess({ results }: { results?: StandardResult }) {
  if (!results) return <SuccessSkeleton />;

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        {/* Success Header */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-ios-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-ios-success" />
          </div>
          <h2 className="text-4xl font-bold text-black mb-4">Your Resume is Ready!</h2>
          <p className="text-ios-text max-w-xl mx-auto">
            Your professionally optimized resume has been generated with enhanced phrasing, 
            better structure, and compelling metrics that will get you noticed.
          </p>
        </div>

        {/* Download Options */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-black mb-6">Download Your Optimized Resume</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Button
                asChild
                className="flex items-center justify-center bg-ios-blue text-white px-6 py-4 hover:bg-blue-600"
              >
                <a href={results.googleDoc.docUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-3 h-5 w-5" />
                  Download as Google Doc
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center justify-center px-6 py-4"
              >
                <a href={results.googleDoc.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-3 h-5 w-5" />
                  Download PDF
                </a>
              </Button>
            </div>

            {/* Email Delivery Confirmation */}
            <div className="bg-gray-50 rounded-xl p-4 text-left">
              <div className="flex items-center">
                <Mail className="text-ios-success mr-3 h-5 w-5" />
                <div>
                  <p className="text-ios-text font-medium">Download links sent to your email</p>
                  <p className="text-ios-secondary text-sm">Check your inbox for permanent access links</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Improvements Summary */}
        <Card className="mb-8 text-left">
          <CardContent className="p-8">
            <h4 className="text-lg font-semibold text-black mb-4">What We Improved</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-ios-text mb-2">Enhanced Sections</h5>
                <ul className="space-y-1 text-ios-secondary text-sm">
                  {results.improvements.slice(0, 4).map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-ios-success rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-ios-text mb-2">Optimization Features</h5>
                <ul className="space-y-1 text-ios-secondary text-sm">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-ios-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    ATS-friendly formatting and keywords
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-ios-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Action verbs and power phrases
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-ios-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Consistent formatting and structure
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-ios-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Professional typography and layout
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps CTA */}
        <Card className="bg-gradient-to-r from-ios-blue/5 to-purple-500/5 border-ios-blue/20">
          <CardContent className="p-8">
            <h4 className="text-xl font-semibold text-black mb-3">Ready to Apply Faster?</h4>
            <p className="text-ios-text mb-6">
              Take your job search to the next level with our Resume Blaster tool - 
              automatically apply to hundreds of relevant positions.
            </p>
            <div className="space-x-4">
              <Button className="bg-ios-blue text-white hover:bg-blue-600">
                Try Resume Blaster
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Optimize Another Resume</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function AdvancedSuccess({ results }: { results?: AdvancedResult }) {
  if (!results) return <SuccessSkeleton />;

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        {/* Success Header */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-ios-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-ios-success" />
          </div>
          <h2 className="text-4xl font-bold text-black mb-4">All Tailored Resumes Ready!</h2>
          <p className="text-ios-text max-w-2xl mx-auto">
            We've created{" "}
            <span className="font-semibold text-ios-blue">{results.totalResumes}</span> perfectly tailored resumes, 
            each optimized for specific job requirements with matching keywords and highlighted relevant experience.
          </p>
        </div>

        {/* Download Options */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-black mb-6">Download All Your Tailored Resumes</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Button
                asChild
                className="flex items-center justify-center bg-ios-blue text-white px-6 py-4 hover:bg-blue-600"
              >
                <a href={results.zipDownloadUrl} target="_blank" rel="noopener noreferrer">
                  <Package className="mr-3 h-5 w-5" />
                  Download All as ZIP
                </a>
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center px-6 py-4"
              >
                <FileText className="mr-3 h-5 w-5" />
                Google Docs Folder
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center px-6 py-4"
              >
                <Download className="mr-3 h-5 w-5" />
                PDFs Only
              </Button>
            </div>

            {/* Email Delivery */}
            <div className="bg-gray-50 rounded-xl p-4 text-left">
              <div className="flex items-center">
                <Mail className="text-ios-success mr-3 h-5 w-5" />
                <div>
                  <p className="text-ios-text font-medium">Download links sent to your email</p>
                  <p className="text-ios-secondary text-sm">
                    Organized folder with all tailored resumes and file names matching job titles
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume List */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h4 className="text-lg font-semibold text-black mb-6">Your Tailored Resumes</h4>
            <div className="grid gap-3 max-h-80 overflow-y-auto">
              {results.resumes.map((resume, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-ios-success/10 rounded-lg flex items-center justify-center mr-4">
                      <CheckCircle className="w-4 h-4 text-ios-success" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-ios-text">{resume.jobTitle}</p>
                      <p className="text-ios-secondary text-sm">
                        {resume.company && `${resume.company} • `}
                        {resume.keywordMatch}% keyword match
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={resume.googleDoc.docUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Preview
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={resume.googleDoc.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-ios-blue mb-2">
                {results.averageKeywordMatch}%
              </div>
              <p className="text-ios-text font-medium">Average Keyword Match</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-ios-blue mb-2">2:34</div>
              <p className="text-ios-text font-medium">Total Processing Time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-ios-blue mb-2">
                {results.totalResumes}
              </div>
              <p className="text-ios-text font-medium">Tailored Resumes Created</p>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-ios-blue/5 to-purple-500/5 border-ios-blue/20">
          <CardContent className="p-8">
            <h4 className="text-xl font-semibold text-black mb-3">Ready to Apply Everywhere?</h4>
            <p className="text-ios-text mb-6">
              Now that you have tailored resumes, let our Resume Blaster automatically 
              submit applications to hundreds of relevant positions.
            </p>
            <div className="space-x-4">
              <Button className="bg-ios-blue text-white hover:bg-blue-600">
                Try Resume Blaster
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Create More Resumes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SuccessSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="mb-12">
          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-6" />
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <Skeleton className="h-48 w-full mb-8" />
        <Skeleton className="h-32 w-full" />
      </section>
    </div>
  );
}
