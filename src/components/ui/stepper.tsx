"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface StepperContextValue {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined
);

export function useStepperContext() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
}

interface StepperProps {
  activeStep?: number;
  onStepChange?: (step: number) => void;
  children: React.ReactNode;
}

export function Stepper({
  activeStep = 0,
  onStepChange,
  children,
}: StepperProps) {
  const [currentStep, setCurrentStep] = React.useState(activeStep);

  React.useEffect(() => {
    setCurrentStep(activeStep);
  }, [activeStep]);

  const setActiveStep = React.useCallback(
    (step: number) => {
      setCurrentStep(step);
      onStepChange?.(step);
    },
    [onStepChange]
  );

  return (
    <StepperContext.Provider value={{ activeStep: currentStep, setActiveStep }}>
      {children}
    </StepperContext.Provider>
  );
}

interface StepperVerticalProps {
  steps: {
    title: string;
    description: string;
  }[];
  currentStep: number;
}

export function StepperVertical({ steps, currentStep }: StepperVerticalProps) {
  const { activeStep } = useStepperContext();

  return (
    <div className="w-full py-4 sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="overflow-hidden">
            {steps.map((step, stepIdx) => (
              <li
                key={step.title}
                className={cn(
                  stepIdx !== steps.length - 1 ? "pb-10" : "",
                  "relative"
                )}
              >
                {stepIdx < currentStep ? (
                  <>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start group">
                      <span className="h-9 flex items-center">
                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary rounded-full">
                          <svg
                            className="w-5 h-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </span>
                      <span className="ml-4 min-w-0 flex flex-col">
                        <StepTitle
                          className={cn(
                            stepIdx === activeStep && "text-primary"
                          )}
                        >
                          {step.title}
                        </StepTitle>
                        {step.description && (
                          <StepDescription
                            className={cn(
                              "text-sm",
                              stepIdx === activeStep && "text-primary/60"
                            )}
                          >
                            {step.description}
                          </StepDescription>
                        )}
                      </span>
                    </div>
                  </>
                ) : stepIdx === currentStep ? (
                  <>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-muted"
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className="relative flex items-start group"
                      aria-current="step"
                    >
                      <span
                        className="h-9 flex items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-primary rounded-full">
                          <span className="h-2.5 w-2.5 bg-primary rounded-full" />
                        </span>
                      </span>
                      <span className="ml-4 min-w-0 flex flex-col">
                        <StepTitle
                          className={cn(
                            stepIdx === activeStep && "text-primary"
                          )}
                        >
                          {step.title}
                        </StepTitle>
                        {step.description && (
                          <StepDescription
                            className={cn(
                              "text-sm",
                              stepIdx === activeStep && "text-primary/60"
                            )}
                          >
                            {step.description}
                          </StepDescription>
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-muted"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start group">
                      <span
                        className="h-9 flex items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-muted rounded-full">
                          <span className="h-2.5 w-2.5 bg-transparent rounded-full" />
                        </span>
                      </span>
                      <span className="ml-4 min-w-0 flex flex-col">
                        <StepTitle
                          className={cn(
                            stepIdx === activeStep && "text-primary"
                          )}
                        >
                          {step.title}
                        </StepTitle>
                        {step.description && (
                          <StepDescription
                            className={cn(
                              "text-sm",
                              stepIdx === activeStep && "text-primary/60"
                            )}
                          >
                            {step.description}
                          </StepDescription>
                        )}
                      </span>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export const StepperList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center w-full", className)}
    {...props}
  />
));
StepperList.displayName = "StepperList";

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, step, children, ...props }, ref) => {
    const { activeStep } = useStepperContext();
    const isCompleted = step < activeStep;
    const isActive = step === activeStep;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-center items-center",
          isCompleted && "text-primary",
          isActive && "text-primary font-medium",
          !isCompleted && !isActive && "text-muted-foreground",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2",
            isCompleted && "bg-primary border-primary",
            isActive && "border-primary",
            !isCompleted &&
              !isActive &&
              "border-slate-500 dark:border-white/60 text-slate-500 dark:text-white/60"
          )}
        >
          {isCompleted ? (
            <CheckIcon className="h-5 w-5 text-primary-foreground" />
          ) : (
            <span>{step + 1}</span>
          )}
        </div>
        <div className="flex flex-col flex-grow">{children}</div>
      </div>
    );
  }
);
Step.displayName = "Step";

export const StepTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-base font-medium text-slate-500", className)}
    {...props}
  />
));
StepTitle.displayName = "StepTitle";

export const StepDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
));
StepDescription.displayName = "StepDescription";

export const StepperContent = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, step, ...props }, ref) => {
    const { activeStep } = useStepperContext();

    if (step !== activeStep) return null;

    return <div ref={ref} className={cn("mt-4", className)} {...props} />;
  }
);
StepperContent.displayName = "StepperContent";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
