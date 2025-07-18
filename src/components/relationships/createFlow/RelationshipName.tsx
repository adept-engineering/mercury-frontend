"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEntities } from "@/hooks/use-entity";
import { useSession } from "next-auth/react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { EdiTree } from "../edi-formats/edi-tree";
import { getEntityReferences } from "@/lib/utils";

export function RelationshipDetails() {
  const { session } = useCurrentSession();
  const { data: entities } = useEntities(session?.user.token || "");
  const [selectedSenderEntity, setSelectedSenderEntity] = useState<string>("");
  const [selectedReceiverEntity, setSelectedReceiverEntity] =
    useState<string>("");
  const [selectedSenderReference, setSelectedSenderReference] =
    useState<string>("");
  const [senderReferences, setSenderReferences] = useState<any>([]);
  const [receiverReferences, setReceiverReferences] = useState<any>([]);

  useEffect(() => {
    console.log(selectedSenderEntity, "selectedSenderEntity");
    if (selectedSenderEntity && entities) {
      const senderReference = getEntityReferences(
        selectedSenderEntity,
        entities
      );
      console.log(senderReference, "senderReference");
      setSenderReferences(senderReference);
    }
    if (selectedReceiverEntity && entities) {
      const receiverReference = getEntityReferences(
        selectedReceiverEntity,
        entities
      );
      console.log(receiverReference, "receiverReference");
      setReceiverReferences(receiverReference);
    }
  }, [selectedSenderEntity, selectedReceiverEntity, entities]);
  const filterEntities = (entityId: string) => {
    return entities;
  };
  return (
    <div className="space-y-6 ">
      <div className="space-y-2">
        <Label htmlFor="relationship-name" className="text-sm font-medium">
          Relationship Name
        </Label>
        <Input
          id="relationship-name"
          type="text"
          placeholder="Enter relationship name"
          className="w-full"
        />
      </div>

      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sender-entity" className="text-sm font-medium">
            Sender Entity
          </Label>
          <Select
            value={selectedSenderEntity}
            onValueChange={setSelectedSenderEntity}
          >
            <SelectTrigger className="w-full" id="sender-entity">
              <SelectValue placeholder="Select sender entity" />
            </SelectTrigger>
            <SelectContent>
              {entities?.map((entity) => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="receiver-entity" className="text-sm font-medium">
            Receiver Entity
          </Label>
          <Select
            value={selectedReceiverEntity}
            onValueChange={setSelectedReceiverEntity}
          >
            <SelectTrigger className="w-full" id="receiver-entity">
              <SelectValue placeholder="Select receiver entity" />
            </SelectTrigger>
            <SelectContent>
              {entities?.map((entity) => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="space-y-2">
        <Label htmlFor="sender-reference" className="text-sm font-medium">
          Sender Reference
        </Label>
        <Select
          value={selectedSenderReference}
          onValueChange={setSelectedSenderReference}
        >
          <SelectTrigger className="w-full" id="sender-reference">
            <SelectValue placeholder="Select Sender format type" />
          </SelectTrigger>
          <SelectContent>
            {selectedSenderEntity &&
              senderReferences.map((references: any) => (
                <SelectItem
                  key={references.reference_id}
                  value={references.reference_id}
                >
                  {references.reference_id}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="receiver-reference" className="text-sm font-medium">
          Receiver Reference
        </Label>
        <Select>
          <SelectTrigger className="w-full" id="sender-reference">
            <SelectValue placeholder="Select Reciever Reference" />
          </SelectTrigger>
          <SelectContent>
            {selectedReceiverEntity &&
              receiverReferences.map((references: any) => (
                <SelectItem
                  key={references.reference_id}
                  value={references.reference_id}
                >
                  {references.reference_id}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
