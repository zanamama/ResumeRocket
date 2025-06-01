import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Download, FileCheck } from "lucide-react";
import { Link } from "wouter";

export default function HowItWorks() {
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
              <Link href="/how-it-works" className="text-ios-blue font-medium">How it Works</Link>
              <Link href="/examples" className="text-ios-text hover:text-black transition-colors">Examples</Link>
              <a href="mailto:upmypay@gmail.com?subject=UpMySalary Support Request" className="text-ios-text hover:text-black transition-colors">Support</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">How UpMySalary Works</h1>
          <p className="text-xl text-ios-text max-w-2xl mx-auto">
            Transform your resume into a professional, ATS-optimized document in just a few simple steps
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-ios-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-ios-blue" />
              </div>
              <CardTitle className="text-lg">1. Upload Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Upload your current resume in PDF or Word format. Our system accepts all common resume layouts.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-ios-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-ios-blue" />
              </div>
              <CardTitle className="text-lg">2. AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our advanced AI analyzes your content, identifying areas for improvement and optimization opportunities.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-ios-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-ios-blue" />
              </div>
              <CardTitle className="text-lg">3. Enhancement</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We enhance your resume with professional phrasing, better structure, and compelling metrics.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-ios-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-ios-blue" />
              </div>
              <CardTitle className="text-lg">4. Download</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Receive your professionally optimized resume in both PDF and Word formats, ready for applications.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-8">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">ATS-Optimized</h3>
              <p className="text-ios-text">
                Every resume is optimized to pass through Applicant Tracking Systems used by most employers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Professional Templates</h3>
              <p className="text-ios-text">
                Your content is formatted using industry-standard templates that recruiters recognize and trust.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">AI-Powered</h3>
              <p className="text-ios-text">
                Advanced AI technology enhances your content while maintaining your unique voice and experience.
              </p>
            </div>
          </div>

          <Link href="/">
            <Button className="bg-ios-blue text-white px-8 py-3 hover:bg-blue-600">
              Get Started Now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}