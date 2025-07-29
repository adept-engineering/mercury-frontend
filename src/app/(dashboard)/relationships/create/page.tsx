"use client";
import { useState, useEffect } from "react";
import { BusinessRules } from "@/components/relationships/createFlow/business-rules";
import { Confirmation } from "@/components/relationships/createFlow/confirmation";
import { ComplianceRulesPage } from "@/components/relationships/createFlow/compliance-rules";
import { RelationshipRules } from "@/components/relationships/createFlow/relationship-rules";
import { RelationshipDetails } from "@/components/relationships/createFlow/RelationshipName";
import { TransformationMapPage } from "@/components/relationships/createFlow/transformation-rules";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Stepper,
  StepperContent,
  StepperVertical,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsInteger } from "nuqs";
import { useEntities } from "@/hooks/use-entity";
import { useCurrentSession } from "@/hooks/use-current-session";
import { getEntityReferences } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useManageCreateRelationship } from "@/hooks/use-manage-create-relationship";

const steps = [
  {
    title: "Step 1",
    description: "Relationship Details",
  },
  {
    title: "Step 2",
    description: "Business Rules",
  },
  {
    title: "Step 3",
    description: "Confirmation",
  },
];

export default function CreateRelationshipFlow() {
  const [currentTab, setCurrentTab] = useState(0);
  const lastPage = steps.length - 1;
  const router = useRouter();

  // Relationship Details States
  const { session } = useCurrentSession();
  const { data: entities } = useEntities(session?.user.token || "");
  const [selectedSenderEntity, setSelectedSenderEntity] = useState<string>("");
  const [selectedReceiverEntity, setSelectedReceiverEntity] =
    useState<string>("");
  const [selectedSenderReference, setSelectedSenderReference] =
    useState<string>("");
  const [selectedReceiverReference, setSelectedReceiverReference] =
    useState<string>("");
  const [relationshipName, setRelationshipName] = useState<string>("");
  const [senderReferences, setSenderReferences] = useState<any>([]);
  const [receiverReferences, setReceiverReferences] = useState<any>([]);
  const [docType, setDocType] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [selectedTransactionSet, setSelectedTransactionSet] =
    useState<string>("");
  const { createRelationshipWithData } = useManageCreateRelationship();

  // Business Rules States
  const [businessRules, setBusinessRules] = useState<
    {
      reference_name: string;
      reference_value: string;
      position: number;
      stepName: string;
      registrationid: string;
    }[]
  >([]);

  useEffect(() => {
    if (selectedSenderEntity && entities) {
      const senderReference = getEntityReferences(
        selectedSenderEntity,
        entities
      );
      setSenderReferences(senderReference);
    }
    if (selectedReceiverEntity && entities) {
      const receiverReference = getEntityReferences(
        selectedReceiverEntity,
        entities
      );
      setReceiverReferences(receiverReference);
    }
  }, [selectedSenderEntity, selectedReceiverEntity, entities]);

  const { toast } = useToast();

  const handleNext = () => {
    setCurrentTab(currentTab + 1 <= lastPage ? currentTab + 1 : lastPage);
  };

  const handleCreateRelationship = async () => {
    try {
      const senderEntityId = entities?.find(
        (entity: any) => entity.id === selectedSenderEntity
      )?.entityid_id;
      const receiverEntityId = entities?.find(
        (entity: any) => entity.id === selectedReceiverEntity
      )?.entityid_id;
      console.log({
        senderEntityId,
        receiverEntityId,
        selectedTransactionSet,
        selectedSenderReference,
        selectedReceiverReference,
        selectedVersion,
        businessRules,
      });

      createRelationshipWithData(
        senderEntityId || "",
        receiverEntityId || "",
        selectedTransactionSet,
        selectedSenderReference,
        selectedReceiverReference,
        selectedVersion,
        businessRules
      );
      toast({
        title: "Relationship created successfully",
        description: "Relationship created successfully",
        variant: "default",
      });
      router.push("/relationships");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create relationship",
        variant: "destructive",
      });
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
        )}>
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
            <StepperContent step={0}>
              <div className="md:py-6 animate-fade-up h-full">
                <RelationshipDetails
                  entities={entities}
                  selectedSenderEntity={selectedSenderEntity}
                  setSelectedSenderEntity={setSelectedSenderEntity}
                  selectedReceiverEntity={selectedReceiverEntity}
                  setSelectedReceiverEntity={setSelectedReceiverEntity}
                  selectedSenderReference={selectedSenderReference}
                  setSelectedSenderReference={setSelectedSenderReference}
                  selectedReceiverReference={selectedReceiverReference}
                  setSelectedReceiverReference={setSelectedReceiverReference}
                  relationshipName={relationshipName}
                  setRelationshipName={setRelationshipName}
                  senderReferences={senderReferences}
                  receiverReferences={receiverReferences}
                  docType={docType}
                  setDocType={setDocType}
                  selectedVersion={selectedVersion}
                  setSelectedVersion={setSelectedVersion}
                  selectedTransactionSet={selectedTransactionSet}
                  setSelectedTransactionSet={setSelectedTransactionSet}
                />
              </div>
            </StepperContent>

            <StepperContent step={1}>
              <div className="md:py-6 animate-fade-up w-full">
                <BusinessRules
                  businessRules={businessRules}
                  setBusinessRules={setBusinessRules}
                />
              </div>
            </StepperContent>

            <StepperContent step={2}>
              <div className="md:py-6 animate-fade-up">
                <Confirmation
                  relationshipName={relationshipName}
                  selectedSenderEntity={selectedSenderEntity}
                  selectedReceiverEntity={selectedReceiverEntity}
                  selectedSenderReference={selectedSenderReference}
                  selectedReceiverReference={selectedReceiverReference}
                  docType={docType}
                  selectedVersion={selectedVersion}
                  selectedTransactionSet={selectedTransactionSet}
                  businessRules={businessRules}
                  entities={entities}
                />
              </div>
            </StepperContent>

            <footer className="flex justify-between pb-8 items-center ">
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
                  onClick={handleNext}>
                  Next
                  <ChevronRight className="size-3 ml-2" />
                </Button>
              )}

              {currentTab === lastPage && (
                <Button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={handleCreateRelationship}
                  disabled={false}>
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
