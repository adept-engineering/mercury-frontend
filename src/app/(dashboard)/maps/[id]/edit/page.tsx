"use client";

import { useState, useEffect } from "react";
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
import { EditRuleSetTab } from "@/components/transformation-map/editFlow/edit-rule-set-tab";
import { useMap, useMapRules, useMaps } from "@/hooks/use-maps";

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

export default function EditTransformationMapPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ map_id: string }>;
}) {
  const [currentTab, setCurrentTab] = useQueryState(
    "currentTab",
    parseAsInteger.withDefault(0)
  );
  const lastPage = steps.length - 1;
  const router = useRouter();
  const [mapTitle, setMapTitle] = useState("");
  const [mapDescription, setMapDescription] = useState("");
  const [mapType, setMapType] = useState("TRANSFORMATION");
  const [rules, setRules] = useState<TransformationRule[]>([]);
  const [mapId, setMapId] = useState("");
  const [map_id, setMap_id] = useState("");

  const { updateMapMutation, isUpdatingMap } = useMaps();
  const {
    createMapRulesMutation,
    editMapRulesMutation,
    deleteMapRulesMutation,
  } = useMapRules();

  // Get the map ID from params
  useEffect(() => {
    const getMapId = async () => {
      const { id } = await params;
      const { map_id } = await searchParams;
      setMapId(id);
      setMap_id(map_id);
    };
    getMapId();
  }, [params]);

  // Fetch map data
  const { map, isLoading: isLoadingMap } = useMap(mapId);

  // Initialize form with map data
  useEffect(() => {
    if (map) {
      setMapTitle(map.map_name || "");
      setMapDescription(map.map_description || "");
      setMapType(map.map_type || "TRANSFORMATION");
      // Rules will be fetched separately and managed through the rules page
    }
  }, [map]);

  const handleSubmit = async () => {
    try {
      // Update map details (without rules)
      const mapData = {
        mapId: mapId,
        map_name: mapTitle,
        map_description: mapDescription,
        map_type: mapType,
      };

      updateMapMutation(mapData, {
        onSuccess: () => {
          toast({
            title: "Map updated successfully",
            variant: "default",
          });
          router.push("/maps");
        },
        onError: (error: any) => {
          console.error(error);
          toast({
            title: "Failed to update map",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update map",
        variant: "destructive",
      });
    }
  };

  const canProceedToNext = () => {
    switch (currentTab) {
      case 0:
        return mapTitle.trim() !== "" && mapDescription.trim() !== "";
      case 1:
        return true; // Rules are managed separately, so we don't need to validate them here
      default:
        return true;
    }
  };

  if (isLoadingMap) {
    return (
      <div className="pt-10 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 w-full">
      <div className="flex items-center justify-start px-8 md:px-12 lg:px-20">
        <Button
          onClick={() => router.back()}
          variant="link"
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex items-center gap-3 text-base text-primary cursor-pointer"
          )}>
          <MoveLeft />
          Back
        </Button>
        <h1 className="text-center w-full text-2xl font-bold">Edit Map</h1>
      </div>

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
                <EditRuleSetTab mapId={map_id} mapType={mapType} />
              </div>
            </StepperContent>

            <StepperContent step={2}>
              <div className="md:py-6 animate-fade-up">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Confirmation</h2>
                    <p className="text-muted-foreground mb-6">
                      Review your map changes before updating
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Map Title</Label>
                      <p className="text-sm text-muted-foreground">
                        {mapTitle}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground">
                        {mapDescription}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Map Type</Label>
                      <p className="text-sm text-muted-foreground">{mapType}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rules</Label>
                      <p className="text-sm text-muted-foreground">
                        Rules are managed directly on the previous step.
                      </p>
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
                className="px-4 disabled:opacity-50">
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
                  disabled={!canProceedToNext()}>
                  Next
                  <ChevronRight className="size-3 ml-2" />
                </Button>
              )}

              {currentTab === lastPage && (
                <Button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={handleSubmit}
                  disabled={!canProceedToNext() || isUpdatingMap}>
                  {isUpdatingMap ? "Updating..." : "Update Map"}
                </Button>
              )}
            </footer>
          </section>
        </Stepper>
      </div>
    </div>
  );
}
