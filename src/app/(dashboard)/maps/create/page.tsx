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
import { TransformationRule } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { TransformationDetailsTab } from "@/components/transformation-map/createFlow/transformation-details-tab";
import { AddRuleSetTab } from "@/components/transformation-map/createFlow/add-rule-set-tab";
import { useManageTransformationMaps } from "@/hooks/use-manage-transformation-maps";



const steps = [
    {
        title: "Step 1",
        description: "Map Details",
    },
    {
        title: "Step 2",
        description: "Rule Set",
    },
    {
        title: "Step 3",
        description: "Confirmation",
    },
];

export default function CreateTransformationMapPage() {
    const [currentTab, setCurrentTab] = useQueryState("currentTab",
        parseAsInteger.withDefault(0)
    );
    const lastPage = steps.length - 1;
    const router = useRouter();
    const [mapTitle, setMapTitle] = useState("");
    const [rules, setRules] = useState<TransformationRule[]>([]);
    const [mapDescription, setMapDescription] = useState("");
    const [mapType, setMapType] = useState("TRANSFORMATION");
    const {createTransformationMap} = useManageTransformationMaps();
    
    const handleSubmit = async () => {
        try {
            // TODO: Implement create transformation map API call
            const data = {
                map_title:mapTitle,
                map_description:mapDescription,
                map_type:mapType,
                rules:rules.map(rule=>({
                    rule:rule.rule,
                    rule_title:rule.rule_title
                }))
            }
            createTransformationMap(data);
            console.log("Creating transformation map:", data);

            toast({
                title: "Transformation map created successfully",
                variant: "default",
            });

            router.push("/transformation-map");
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to create transformation map",
                variant: "destructive",
            });
        }
    };

    

    const canProceedToNext = () => {
        switch (currentTab) {
            case 0:
                return mapTitle.trim() !== "" && mapDescription.trim() !== "";
            case 1:
                return rules.length > 0 &&
                    rules.every(rule => rule.rule_title.trim() !== "" && rule.rule.trim() !== "");
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
                Create Map
            </h1>

            <div className="w-full grid md:grid-cols-4 mx-auto pl-12">
                <Stepper activeStep={currentTab} onStepChange={setCurrentTab}>
                    <StepperVertical steps={steps} currentStep={currentTab} />

                    <section className="md:col-span-3 px-12 w-full 2xl:max-w-3xl max-md:px-3 flex flex-col min-h-[70vh]">

                        <StepperContent step={0}>
                            <div className="md:py-6 animate-fade-up h-full">
                                <TransformationDetailsTab
                                    mapTitle={mapTitle}
                                    setMapTitle={setMapTitle}
                                    mapDescription={mapDescription}
                                    setMapDescription={setMapDescription}
                                    mapType={mapType}
                                    setMapType={setMapType}
                                />
                            </div>
                        </StepperContent>

                        <StepperContent step={1}>
                            <div className="md:py-6 animate-fade-up w-full">
                              <AddRuleSetTab rules={rules} setRules={setRules} mapType={mapType} />
                            </div>
                        </StepperContent>

                        <StepperContent step={2}>
                            <div className="md:py-6 animate-fade-up">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">Confirmation</h2>
                                        <p className="text-muted-foreground mb-6">
                                            Review your map before creating
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Map Title</Label>
                                            <p className="text-sm text-muted-foreground">{mapTitle}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Description</Label>
                                            <p className="text-sm text-muted-foreground">{mapDescription}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Map Type</Label>
                                            <p className="text-sm text-muted-foreground">{mapType}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Rules ({rules.length})</Label>
                                            <div className="space-y-2">
                                                {rules.map((rule) => (
                                                    <div key={rule.id} className="border rounded p-3">
                                                        <p className="font-medium text-sm">{rule.rule_title}</p>
                                                        <p className="text-sm text-muted-foreground mt-1">{rule.rule}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    Create Map
                                </Button>
                            )}
                        </footer>
                    </section>
                </Stepper>
            </div>
        </div>
    );
}
