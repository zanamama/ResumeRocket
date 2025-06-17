import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/assets/logo-2.70e507e8.png" alt="UpMySalary" className="w-16 h-16" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-ios-text hover:text-black transition-colors">How it Works</Link>
              <Link href="/examples" className="text-ios-text hover:text-black transition-colors">Examples</Link>
              <a href="mailto:support@upmysalary.com?subject=UpMySalary Support Request" className="text-ios-text hover:text-black transition-colors">Support</a>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-ios-text hover:text-black transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/how-it-works" 
                  className="text-ios-text hover:text-black transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Link 
                  href="/examples" 
                  className="text-ios-text hover:text-black transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Examples
                </Link>
                <a 
                  href="mailto:support@upmysalary.com?subject=UpMySalary Support Request" 
                  className="text-ios-text hover:text-black transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Support
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Turn Your Resume Into a{" "}
          <span className="text-ios-blue">Job-Winning</span> Document
        </h1>
        <p className="text-xl text-ios-text mb-12 max-w-2xl mx-auto leading-relaxed">
          Instantly upgrade your resume or tailor it to any job in seconds. More interviews, less guesswork—built for professionals who need results fast.
        </p>

        {/* Main CTA Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Standard Mode Card */}
          <Link href="/standard">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-ios-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-ios-blue/20 transition-colors">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">Standard Polish</h3>
                <p className="text-ios-text mb-6 leading-relaxed">
                  Upload your resume and get an AI-optimized version with enhanced phrasing, 
                  better structure, and compelling metrics.
                </p>
                <Button className="w-full bg-ios-blue text-white hover:bg-blue-600">
                  Polish My Resume
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Advanced Mode Card */}
          <Link href="/advanced">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-ios-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-ios-blue/20 transition-colors">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">Job Tailoring</h3>
                <p className="text-ios-text mb-6 leading-relaxed">
                  Upload your resume + job descriptions to get perfectly tailored versions 
                  for each opportunity with matching keywords.
                </p>
                <Button className="w-full bg-ios-blue text-white hover:bg-blue-600">
                  Tailor to Jobs
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Start from Scratch Card */}
          <Link href="/create">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">Start from Scratch</h3>
                <p className="text-ios-text mb-6 leading-relaxed">
                  Don't have a resume? Share your work history and experience, 
                  and we'll create a professional resume for you.
                </p>
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  Create My Resume
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Features Overview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-ios-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-ios-success text-xl">⚡</span>
            </div>
            <h4 className="font-semibold text-black mb-2">Lightning Fast</h4>
            <p className="text-ios-secondary text-sm">Get your optimized resume in under 60 seconds</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-ios-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-ios-success text-xl">🎯</span>
            </div>
            <h4 className="font-semibold text-black mb-2">ATS Optimized</h4>
            <p className="text-ios-secondary text-sm">Beat applicant tracking systems with keyword optimization</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-ios-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-ios-success text-xl">📄</span>
            </div>
            <h4 className="font-semibold text-black mb-2">Multiple Formats</h4>
            <p className="text-ios-secondary text-sm">Download as Google Doc or PDF, ready to submit</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-black mb-4">
            AI-Powered Resume Optimization That Gets Results
          </h2>
          <p className="text-ios-secondary mb-6">
            Need help? Contact us at{" "}
            <a href="mailto:upmypay@gmail.com" className="text-ios-blue hover:underline">
              upmypay@gmail.com
            </a>
          </p>
          <p className="text-sm text-ios-secondary">
            © {new Date().getFullYear()} UpMySalary. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
