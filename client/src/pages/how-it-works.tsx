import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Upload, Zap, Download, Target, FileText, Users } from "lucide-react";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <img 
                  src="/assets/UpMySalary Logo no words.png" 
                  alt="UpMySalary Logo" 
                  className="h-10 w-10"
                />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">UpMySalary</span>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</Link>
              <Link href="/how-it-works" className="text-blue-600 dark:text-blue-400 font-medium">How it works</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How UpMySalary Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Transform your resume into an ATS-optimized masterpiece with our AI-powered optimization process
          </p>
          <Badge variant="secondary" className="mb-8">
            Powered by OpenAI GPT-4
          </Badge>
        </div>
      </section>

      {/* Two Modes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Choose Your Optimization Mode
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Mode */}
            <Card className="relative overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-6 w-6" />
                  <span>Standard Polish</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Perfect for general resume improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">General Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Improves formatting, grammar, and overall presentation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">ATS Compatibility</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Ensures your resume passes Applicant Tracking Systems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Professional Formatting</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Clean, modern design that stands out to recruiters
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/standard-mode">
                  <Button className="w-full mt-6">Try Standard Mode</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Advanced Mode */}
            <Card className="relative overflow-hidden border-2 border-purple-200">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-medium">
                MOST POPULAR
              </div>
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6" />
                  <span>Advanced Tailoring</span>
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Customize resumes for specific job opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Job-Specific Tailoring</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Customizes your resume for up to 20 specific job descriptions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Keyword Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Matches keywords from job postings to improve ATS scores
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Bulk Processing</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Generate multiple tailored resumes in one go
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/advanced-mode">
                  <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Try Advanced Mode</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Simple 4-Step Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Upload Resume</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload your existing resume in PDF or DOCX format
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Add Job Descriptions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Paste job descriptions you want to target (Advanced mode only)
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. AI Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI analyzes and optimizes your resume content
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">4. Download Results</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get your optimized resume(s) as Google Docs and PDFs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose UpMySalary?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <span>AI-Powered</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Powered by OpenAI's latest GPT-4 model for intelligent resume optimization and keyword matching.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-green-500" />
                  <span>ATS Optimized</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Ensures your resume passes through Applicant Tracking Systems used by most companies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  <span>Professional Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get professionally formatted resumes that stand out to recruiters and hiring managers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have improved their job prospects with UpMySalary
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/standard-mode">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start with Standard Mode
              </Button>
            </Link>
            <Link href="/advanced-mode">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                Try Advanced Mode
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}