import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/assets/UpMySalary Logo no words.png" alt="UpMySalary" className="w-8 h-8" />
              <span className="text-xl font-semibold text-black">UpMySalary</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-ios-text hover:text-black transition-colors">How it Works</a>
              <a href="#" className="text-ios-text hover:text-black transition-colors">Examples</a>
              <a href="#" className="text-ios-text hover:text-black transition-colors">Support</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Turn your resume into a{" "}
          <span className="text-ios-blue">perfect</span> document
        </h1>
        <p className="text-xl text-ios-text mb-12 max-w-2xl mx-auto leading-relaxed">
          AI-powered resume optimization that gets you noticed. 
          Polish your existing resume or tailor it perfectly to specific job opportunities.
        </p>

        {/* Main CTA Options */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
    </div>
  );
}
