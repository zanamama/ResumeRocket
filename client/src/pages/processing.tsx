import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { ProgressIndicator, BatchProgress } from "@/components/progress-indicator";
import { Loader2 } from "lucide-react";
import type { JobStatus, ProcessingProgress } from "@/lib/types";

export default function Processing() {
  const [, params] = useRoute("/processing/:jobId");
  const [, setLocation] = useLocation();
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  
  const jobId = params?.jobId ? parseInt(params.jobId) : null;
  const mode = searchParams.get("mode") as "standard" | "advanced";
  const jobCount = parseInt(searchParams.get("count") || "1");

  const { data: jobStatus, isLoading } = useQuery({
    queryKey: ["/api/resume/job", jobId, "status"],
    queryFn: () => api.getJobStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: (data) => {
      // Stop polling when job is completed or failed
      return data?.status === "completed" || data?.status === "failed" ? false : 2000;
    },
  });

  // Redirect to success page when completed
  useEffect(() => {
    if (jobStatus?.status === "completed") {
      setLocation(`/success/${jobId}?mode=${mode}`);
    } else if (jobStatus?.status === "failed") {
      setLocation(`/?error=processing-failed`);
    }
  }, [jobStatus, jobId, mode, setLocation]);

  if (!jobId || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-ios-blue" />
          <p className="text-ios-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (mode === "standard") {
    return <StandardProcessing jobStatus={jobStatus} />;
  } else {
    return <AdvancedProcessing jobStatus={jobStatus} jobCount={jobCount} />;
  }
}

function StandardProcessing({ jobStatus }: { jobStatus?: JobStatus }) {
  const steps = [
    {
      label: "Resume uploaded and parsed",
      status: "completed" as const,
    },
    {
      label: "AI analysis complete",
      status: "completed" as const,
    },
    {
      label: "Generating optimized content...",
      status: jobStatus?.status === "processing" ? "current" as const : "completed" as const,
    },
    {
      label: "Creating final document",
      status: jobStatus?.status === "completed" ? "completed" as const : "pending" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-ios-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-12 h-12 text-ios-blue animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Optimizing Your Resume</h2>
          <p className="text-ios-text mb-8">
            Our AI is analyzing your resume and enhancing it with professional phrasing, 
            better structure, and compelling metrics.
          </p>
        </div>

        <ProgressIndicator
          progress={75}
          steps={steps}
          currentStep="Processing... This usually takes 30-60 seconds"
          className="max-w-md mx-auto"
        />
      </section>
    </div>
  );
}

function AdvancedProcessing({ 
  jobStatus, 
  jobCount 
}: { 
  jobStatus?: JobStatus; 
  jobCount: number;
}) {
  const progress = jobStatus?.outputFiles as ProcessingProgress;
  const completed = progress?.completed || 0;
  const total = progress?.total || jobCount;

  // Mock completed jobs for demo
  const completedJobs = Array.from({ length: completed }, (_, i) => ({
    title: `Job ${i + 1}`,
    duration: `${(Math.random() * 2 + 1).toFixed(1)}s`,
  }));

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-ios-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-12 h-12 text-ios-blue animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Creating Tailored Resumes</h2>
          <p className="text-ios-text mb-8">
            Processing{" "}
            <span className="font-semibold text-ios-blue">{total}</span> job descriptions 
            and creating perfectly tailored resumes for each opportunity.
          </p>
        </div>

        <BatchProgress
          completed={completed}
          total={total}
          currentJob={progress?.currentJob || `Job ${completed + 1}`}
          completedJobs={completedJobs}
          estimatedCompletion="2 minutes"
        />
      </section>
    </div>
  );
}
