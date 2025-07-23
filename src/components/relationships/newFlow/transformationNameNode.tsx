import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { RelationshipDetails } from "../createFlow/RelationshipName";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Edit } from "lucide-react";
import { ComplianceRulesPage } from "../createFlow/reciever-information";
import { TransformationRuleInformation } from "../createFlow/sender-information";

type NumberNode = Node<{ number: number }, "number">;

export function RelationshipNameNode({ data }: NodeProps<NumberNode>) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            Set Relationship Details <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Relationship Details</DialogTitle>
            <DialogDescription>
              Configure the details of your relationship
            </DialogDescription>
          </DialogHeader>
          <RelationshipDetails />
        </DialogContent>
      </Dialog>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function CreateEntityNodeOrRelationshipNode(props: any) {
  const [selectedOption, setSelectedOption] = useState<
    "complianceGuide" | "transformationRule" | null
  >(null);

  const handleOptionSelect = useCallback(
    (option: "complianceGuide" | "transformationRule") => {
      setSelectedOption(option);
    },
    []
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={
              selectedOption === "complianceGuide" ? "default" : "outline"
            }
            onClick={() => handleOptionSelect("complianceGuide")}
          >
            Create Compliance Guide
          </Button>
          {/* <div className="space-y-4">
            <Button
              variant={
                selectedOption === "complianceGuide" ? "default" : "outline"
              }
              onClick={() => handleOptionSelect("complianceGuide")}
            >
              Create Compliance Guide
            </Button>
            <p>or</p>
            <Button
              variant={
                selectedOption === "transformationRule" ? "default" : "outline"
              }
              onClick={() => handleOptionSelect("transformationRule")}
            >
              Create Transformation Rule
            </Button>
          </div> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Relationship Details</DialogTitle>
            <DialogDescription>
              Configure the details of your relationship
            </DialogDescription>
          </DialogHeader>

          {selectedOption === "complianceGuide" && <ComplianceRulesPage />}
          {selectedOption === "transformationRule" && (
            <TransformationRuleInformation />
          )}
        </DialogContent>
      </Dialog>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
