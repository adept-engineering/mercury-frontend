"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Stepper,
  StepperContent,
  StepperVertical,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    title: "Step 1",
    description: "Relationship Name",
  },
  {
    title: "Step 2",
    description: "Sender Information",
  },
  {
    title: "Step 3",
    description: "Receiver Information",
  },
  {
    title: "Step 4",
    description: "Relationship Rules",
  },
  {
    title: "Step 5",
    description: "Confirmation",
  },
];

export default function CreateRelationshipFlow() {
  const [currentTab, setCurrentTab] = useState(0);
  const lastPage = steps.length - 1;
  const router = useRouter();

  return (
    <div className="pt-10 w-full">
      <Button
        onClick={() => router.back()}
        variant="link"
        className={cn(
          buttonVariants({ variant: "link" }),
          "flex items-center gap-3 text-base text-primary cursor-pointer pl-20"
        )}
      >
        <MoveLeft />
        Back
      </Button>
      <h1 className="text-center text-2xl font-bold mb-6">
        Create Relationship
      </h1>

      <div className="w-full grid md:grid-cols-4 mx-auto pl-12">
        <Stepper activeStep={currentTab} onStepChange={setCurrentTab}>
          <StepperVertical steps={steps} currentStep={currentTab} />

          <section className="md:col-span-3 px-12 w-full 2xl:max-w-3xl max-md:px-3 flex flex-col min-h-[70vh]">
            <div className="flex-1">
              <StepperContent step={0}>
                <div className="md:py-6 animate-fade-up">

                </div>
              </StepperContent>

              <StepperContent step={1}>
                <div className="md:py-6 animate-fade-up w-full">

                </div>
              </StepperContent>

              <StepperContent step={2}>
                <div className="md:py-6 animate-fade-up">

                </div>
              </StepperContent>

              <StepperContent step={3}>
                <div className="md:py-6 animate-fade-up">

                </div>
              </StepperContent>
            </div>

            <footer className="flex justify-between pb-8 items-center mt-auto">
              <Button
                onClick={() =>
                  setCurrentTab(currentTab - 1 >= 0 ? currentTab - 1 : 0)
                }
                disabled={currentTab == 0}
                variant="outline"
                className="px-4 disabled:opacity-50"
              >
                <ChevronLeft className="size-3 mr-2" />
                Previous
              </Button>

              {currentTab < lastPage && (
                <Button
                  className="px-4 bg-primary text-primary-foreground"
                  onClick={() =>
                    setCurrentTab(
                      currentTab + 1 <= lastPage ? currentTab + 1 : lastPage
                    )
                  }
                >
                  Next
                  <ChevronRight className="size-3 ml-2" />
                </Button>
              )}

              {currentTab === lastPage && (
                <Button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={() => { }}
                  disabled={false}
                >
                  Create Relationship
                </Button>
              )}
            </footer>
          </section>
        </Stepper>
      </div>

    </div>
  );
}