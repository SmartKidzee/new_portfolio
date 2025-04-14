import React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

interface StepProps {
  title: string;
  description?: string;
  step: number;
  currentStep: number;
  onClick?: (step: number) => void;
  isClickable?: boolean;
}

export function Step({
  title,
  description,
  step,
  currentStep,
  onClick,
  isClickable = true,
}: StepProps) {
  const status =
    currentStep === step
      ? "current"
      : currentStep < step
      ? "upcoming"
      : "complete";

  return (
    <li
      className={cn(
        "relative flex items-center justify-center",
        isClickable && currentStep > step && "cursor-pointer"
      )}
      onClick={() => {
        if (isClickable && currentStep > step && onClick) {
          onClick(step);
        }
      }}
    >
      <div
        className={cn(
          "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
          status === "complete"
            ? "border-primary bg-primary text-primary-foreground"
            : status === "current"
            ? "border-primary text-primary"
            : "border-gray-300 dark:border-gray-600"
        )}
      >
        {status === "complete" ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <span>{step}</span>
        )}
      </div>
      <div className="absolute top-0 -translate-y-1/2 px-3">
        <div
          className={cn(
            "text-sm font-medium",
            status === "complete" || status === "current"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {title}
        </div>
        {description && (
          <div
            className={cn(
              "text-xs",
              status === "complete" || status === "current"
                ? "text-muted-foreground"
                : "text-muted-foreground/60"
            )}
          >
            {description}
          </div>
        )}
      </div>
    </li>
  );
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  steps: Array<{
    id: number;
    title: string;
    description?: string;
  }>;
  onStepClick?: (step: number) => void;
  stepsClickable?: boolean;
}

export function Steps({
  className,
  currentStep,
  steps,
  onStepClick,
  stepsClickable = true,
  ...props
}: StepsProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          return (
            <React.Fragment key={step.id}>
              <Step
                title={step.title}
                description={step.description}
                step={stepNumber}
                currentStep={currentStep}
                onClick={onStepClick}
                isClickable={stepsClickable}
              />
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] flex-1",
                    currentStep > stepNumber
                      ? "bg-primary"
                      : "bg-gray-200 dark:bg-gray-700"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
} 