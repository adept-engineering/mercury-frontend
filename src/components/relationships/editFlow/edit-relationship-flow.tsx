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
import { updateRelationship } from "@/actions/relationships";
import { useUpdateRelationship } from "@/hooks/use-manage-create-relationship";

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
    description: "Endpoint URL",
  },
  {
    title: "Step 4",
    description: "Confirmation",
  },
];

interface EditRelationshipFlowProps {
  relationship: any;
}

export function EditRelationshipFlow({
  relationship,
}: EditRelationshipFlowProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const lastPage = steps.length - 1;
  const router = useRouter();

  // Relationship Details States with default values from relationship data
  const { session } = useCurrentSession();
  const { data: entities } = useEntities(session?.user.token || "");

  // Extract default values from relationship data
  const destinationEndpoint = relationship?.extndata?.find(
    (extn: any) => extn.reference_name === "DestinationEndPoint"
  );

  const defaultBusinessRules =
    relationship?.extndata
      ?.filter(
        (extn: any) =>
          extn.businessrule === "COMM" &&
          extn.reference_name !== "DestinationEndPoint"
      )
      .map((extn: any) => ({
        map_type: "COMPLIANCE" as const,
        id: extn.reference_value,
        map_title: extn.reference_name,
        map_description: extn.reference_value,
      })) || [];
  const getEntityIdbyEtityid_id = (entityid_id: string) => {
    return entities?.find((entity: any) => entity.entityid_id === entityid_id)
      ?.id;
  };
  console.log(relationship);

  const [selectedSenderEntity, setSelectedSenderEntity] = useState<string>(
    relationship?.entityid_id_sender || ""
  );
  const [selectedReceiverEntity, setSelectedReceiverEntity] = useState<string>(
    relationship?.entityid_id_receiver || ""
  );
  const [selectedSenderReference, setSelectedSenderReference] =
    useState<string>(relationship?.sender_id || "");
  const [selectedReceiverReference, setSelectedReceiverReference] =
    useState<string>(relationship?.receiver_id || "");
  const [relationshipName, setRelationshipName] = useState<string>("");
  const [senderReferences, setSenderReferences] = useState<any>([]);
  const [receiverReferences, setReceiverReferences] = useState<any>([]);
  const [docType, setDocType] = useState<string>(relationship?.docType || "");
  const [selectedVersion, setSelectedVersion] = useState<string>(
    relationship?.std_version || ""
  );
  const [selectedTransactionSet, setSelectedTransactionSet] = useState<string>(
    relationship?.transaction_name || ""
  );
  const [endPointUrl, setEndPointUrl] = useState<string>(
    destinationEndpoint?.reference_value || ""
  );
  console.log(selectedSenderEntity, selectedReceiverEntity);
  // Business Rules States with default values
  const [businessRules, setBusinessRules] = useState<
    {
      map_type: "COMPLIANCE" | "TRANSFORMATION" | "RESEARCH";
      id: string;
      map_title: string;
      map_description: string;
    }[]
  >(relationship?.maps || []);
  const { updateRelationshipMutation } = useUpdateRelationship();

  // Set default values when entities are loaded
  useEffect(() => {
    if (entities && entities.length > 0 && relationship) {
      const senderEntityId = getEntityIdbyEtityid_id(
        relationship.entityid_id_sender
      );
      const receiverEntityId = getEntityIdbyEtityid_id(
        relationship.entityid_id_receiver
      );

      if (senderEntityId && !selectedSenderEntity) {
        setSelectedSenderEntity(senderEntityId);
      }
      if (receiverEntityId && !selectedReceiverEntity) {
        setSelectedReceiverEntity(receiverEntityId);
      }
    }
  }, [entities, relationship, selectedSenderEntity, selectedReceiverEntity]);

  useEffect(() => {
    if (selectedSenderEntity && entities) {
      const senderReference = getEntityReferences(
        selectedSenderEntity,
        entities
      );
      setSenderReferences(senderReference);
    } else {
      setSenderReferences([]);
    }

    if (selectedReceiverEntity && entities) {
      const receiverReference = getEntityReferences(
        selectedReceiverEntity,
        entities
      );
      setReceiverReferences(receiverReference);
    } else {
      setReceiverReferences([]);
    }
  }, [selectedSenderEntity, selectedReceiverEntity, entities]);

  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleEndPointUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndPointUrl(value);
  };

  const handleNext = () => {
    if (endPointUrl !== "" && !validateUrl(endPointUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid HTTP/HTTPS URL",
        variant: "destructive",
      });
      return;
    }
    setCurrentTab(currentTab + 1 <= lastPage ? currentTab + 1 : lastPage);
  };

  const handleUpdateRelationship = async () => {
    try {
      // Prepare extension data
      const extn_data = [
        {
          reference_name: "DestinationEndPoint",
          reference_value: endPointUrl,
          position: 1,
          businessrule: "COMM" as const,
        },
        ...businessRules.map((rule,index) => ({
          reference_name: rule.map_title,
          reference_value: rule.id,
          position:index+1,
          businessrule: "RULE" as const,
        })),
      ];

      console.log({
        id: relationship.id,
        data: {
          entityid_id_sender: selectedSenderEntity,
          entityid_id_receiver: selectedReceiverEntity,
          transaction_name: selectedTransactionSet,
          sender_id: relationship.sender_id,
          receiver_id: relationship.receiver_id,
          std_version: selectedVersion,
          extn_data,
        },
      })

       updateRelationshipMutation.mutate({
        id: relationship.id,
        data: {
          entityid_id_sender: selectedSenderEntity,
          entityid_id_receiver: selectedReceiverEntity,
          transaction_name: selectedTransactionSet,
          sender_id: relationship.sender_id,
          receiver_id: relationship.receiver_id,
          std_version: selectedVersion,
          extn_data,
        },
      });

      toast({
        title: "Relationship updated successfully",
        description: "Relationship updated successfully",
        variant: "success",
      });
      router.push("/relationships");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update relationship",
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
      <h1 className="text-center text-2xl font-bold mb-6">Edit Relationship</h1>

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
                  isEdit={true}
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
              <div className="md:py-6 animate-fade-up w-full">
                <div className="space-y-2">
                  <Label htmlFor="endpoint-url">End Point URL</Label>
                  <Input
                    id="endpoint-url"
                    type="text"
                    placeholder="https://example.com/api/endpoint"
                    value={endPointUrl}
                    onChange={handleEndPointUrlChange}
                  />
                </div>
              </div>
            </StepperContent>

            <StepperContent step={3}>
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
                  endPointUrl={endPointUrl}
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
                  onClick={handleUpdateRelationship}
                  disabled={false}>
                  Update Relationship
                </Button>
              )}
            </footer>
          </section>
        </Stepper>
      </div>
    </div>
  );
}
