"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Stepper,
    StepperContent,
    StepperVertical,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoveLeft } from "lucide-react";
import { useQueryState, parseAsInteger } from "nuqs";
import { toast } from "@/hooks/use-toast";
import { DataLayoutDetailsTab } from "@/components/data-layout/create/data-layout-details-tab";
import { DataTypeSelectionTab } from "@/components/data-layout/create/data-type-selection-tab";
import { ConfirmationTab } from "@/components/data-layout/create/confirmation-tab";

const steps = [
    {
        title: "Step 1",
        description: "Layout Details",
    },
    {
        title: "Step 2", 
        description: "Data Type Configuration",
    },
    {
        title: "Step 3",
        description: "Confirmation",
    },
];

export default function CreateDataLayoutPage() {
    const [currentTab, setCurrentTab] = useQueryState("currentTab",
        parseAsInteger.withDefault(0)
    );
    const lastPage = steps.length - 1;
    const router = useRouter();
    
    // Form state
    const [layoutName, setLayoutName] = useState("");
    const [layoutDescription, setLayoutDescription] = useState("");
    const [dataType, setDataType] = useState("");
    const [selectedVersion, setSelectedVersion] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState("");

    const handleSubmit = async () => {
        try {
            const data = {
                name: layoutName,
                description: layoutDescription,
                dataType,
                version: selectedVersion,
                transaction: selectedTransaction,
            };
            
            // TODO: Implement create data layout API call
            console.log("Creating data layout:", data);

            toast({
                title: "Data layout created successfully",
                variant: "default",
            });

            router.push("/data-layout");
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to create data layout",
                variant: "destructive",
            });
        }
    };

    const canProceedToNext = () => {
        switch (currentTab) {
            case 0:
                return layoutName.trim() !== "" && layoutDescription.trim() !== "" && dataType.trim() !== "";
            case 1:
                // If EDI or EDIFACT, require version and transaction
                if (dataType === "EDI" || dataType === "EDIFACT") {
                    return selectedVersion.trim() !== "" && selectedTransaction.trim() !== "";
                }
                // For other data types, can proceed
                return true;
            default:
                return true;
        }
    };

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
                Create Data Layout
            </h1>

            <div className="w-full grid md:grid-cols-4 mx-auto pl-12">
                <Stepper activeStep={currentTab} onStepChange={setCurrentTab}>
                    <StepperVertical steps={steps} currentStep={currentTab} />

                    <section className="md:col-span-3 px-12 w-full 2xl:max-w-3xl max-md:px-3 flex flex-col min-h-[70vh]">

                        <StepperContent step={0}>
                            <div className="md:py-6 animate-fade-up h-full">
                                <DataLayoutDetailsTab
                                    layoutName={layoutName}
                                    setLayoutName={setLayoutName}
                                    layoutDescription={layoutDescription}
                                    setLayoutDescription={setLayoutDescription}
                                    dataType={dataType}
                                    setDataType={setDataType}
                                />
                            </div>
                        </StepperContent>

                        <StepperContent step={1}>
                            <div className="md:py-6 animate-fade-up w-full">
                                <DataTypeSelectionTab
                                    dataType={dataType}
                                    selectedVersion={selectedVersion}
                                    setSelectedVersion={setSelectedVersion}
                                    selectedTransaction={selectedTransaction}
                                    setSelectedTransaction={setSelectedTransaction}
                                />
                            </div>
                        </StepperContent>

                        <StepperContent step={2}>
                            <div className="md:py-6 animate-fade-up">
                                <ConfirmationTab
                                    layoutName={layoutName}
                                    layoutDescription={layoutDescription}
                                    dataType={dataType}
                                    selectedVersion={selectedVersion}
                                    selectedTransaction={selectedTransaction}
                                />
                            </div>
                        </StepperContent>

                        <footer className="flex justify-between pb-8 items-center">
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
                                    disabled={!canProceedToNext()}
                                >
                                    Next
                                    <ChevronRight className="size-3 ml-2" />
                                </Button>
                            )}

                            {currentTab === lastPage && (
                                <Button
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded"
                                    onClick={handleSubmit}
                                    disabled={!canProceedToNext()}
                                >
                                    Create Data Layout
                                </Button>
                            )}
                        </footer>
                    </section>
                </Stepper>
            </div>
        </div>
    );
}
