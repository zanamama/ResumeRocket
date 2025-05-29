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
              <div className="flex items-center space-x-2 cursor-pointer">
                <img src="/assets/UpMySalary Logo no words.png" alt="UpMySalary" className="w-8 h-8" />
                <span className="text-xl font-semibold text-black">UpMySalary</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-ios-text hover:text-black transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-ios-blue font-medium">How it Works</Link>
              <a href="mailto:upmypay@gmail.com?subject=UpMySalary Support Request" className="text-ios-text hover:text-black transition-colors">Support</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          How It Works
        </h1>
        <p className="text-xl text-ios-text mb-12 max-w-2xl mx-auto leading-relaxed">
          Get your professional resume optimized in just 4 simple steps
        </p>
      </section>

      {/* Steps Section */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-ios-blue/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Upload className="h-10 w-10 text-ios-blue" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">1. Upload Resume</h3>
            <p className="text-ios-text leading-relaxed">
              Upload your current resume in PDF or DOCX format. Our system supports all standard formats.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-ios-blue/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Zap className="h-10 w-10 text-ios-blue" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">2. AI Processing</h3>
            <p className="text-ios-text leading-relaxed">
              Our AI analyzes your resume and enhances it with professional formatting and optimized content.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-ios-blue/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FileCheck className="h-10 w-10 text-ios-blue" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">3. Review Results</h3>
            <p className="text-ios-text leading-relaxed">
              See your enhanced resume with improved structure, formatting, and ATS optimization.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="bg-ios-blue/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Download className="h-10 w-10 text-ios-blue" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">4. Download</h3>
            <p className="text-ios-text leading-relaxed">
              Download your optimized resume in PDF and DOCX formats, ready for job applications.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-black mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-ios-text mb-8">
          Upload your resume and get a professionally optimized version in minutes.
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