import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
}

interface ProgressIndicatorProps {
  progress: number;
  steps: ProcessingStep[];
  currentStep?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressIndicator({
  progress,
  steps,
  currentStep,
  showPercentage = true,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm">
          <span className="text-ios-secondary">
            {currentStep || "Processing..."}
          </span>
          {showPercentage && (
            <span className="text-ios-secondary">{Math.round(progress)}%</span>
          )}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            {step.status === 'completed' && (
              <CheckCircle className="w-5 h-5 text-ios-success flex-shrink-0" />
            )}
            {step.status === 'current' && (
              <Loader2 className="w-5 h-5 text-ios-blue animate-spin flex-shrink-0" />
            )}
            {step.status === 'pending' && (
              <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-sm",
                step.status === 'completed' && "text-ios-success",
                step.status === 'current' && "text-ios-blue",
                step.status === 'pending' && "text-ios-secondary"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BatchProgressProps {
  completed: number;
  total: number;
  currentJob?: string;
  completedJobs: Array<{ title: string; duration: string }>;
  estimatedCompletion?: string;
}

export function BatchProgress({
  completed,
  total,
  currentJob,
  completedJobs,
  estimatedCompletion,
}: BatchProgressProps) {
  const progress = (completed / total) * 100;

  return (
    <div className="space-y-8">
      {/* Overall Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-ios-text font-medium">Overall Progress</span>
          <span className="text-ios-text font-medium">
            {completed} of {total} complete
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Current Job */}
      {currentJob && completed < total && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-black">Currently Processing</h4>
            <span className="text-ios-secondary text-sm">
              Job {completed + 1} of {total}
            </span>
          </div>
          <p className="text-ios-text mb-3">{currentJob}</p>
          <Progress value={45} className="h-2" />
          <p className="text-ios-secondary text-sm mt-2">
            Analyzing job requirements and tailoring content...
          </p>
        </div>
      )}

      {/* Completed Jobs */}
      {completedJobs.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="font-semibold text-black mb-4">Completed Resumes</h4>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {completedJobs.map((job, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-ios-success mr-3" />
                  <span className="text-ios-text">{job.title}</span>
                </div>
                <span className="text-ios-secondary text-sm">{job.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estimated Completion */}
      {estimatedCompletion && (
        <p className="text-ios-secondary text-sm text-center">
          Average processing time: 2-3 seconds per job • Estimated completion: {estimatedCompletion}
        </p>
      )}
    </div>
  );
}
