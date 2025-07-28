"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetVersionByFormat,useGetTransactionSetByVersion } from "@/hooks/use-nlp";
import { ReusableCombobox } from "@/components/ui/combobox";

interface RelationshipDetailsProps {
  entities: any[] | undefined;
  selectedSenderEntity: string;
  setSelectedSenderEntity: (value: string) => void;
  selectedReceiverEntity: string;
  setSelectedReceiverEntity: (value: string) => void;
  selectedSenderReference: string;
  setSelectedSenderReference: (value: string) => void;
  selectedReceiverReference: string;
  setSelectedReceiverReference: (value: string) => void;
  relationshipName: string;
  setRelationshipName: (value: string) => void;
  senderReferences: any[];
  receiverReferences: any[];
  docType: string;
  setDocType: (value: string) => void;
  selectedVersion: string;
  setSelectedVersion: (value: string) => void;
  selectedTransactionSet: string;
  setSelectedTransactionSet: (value: string) => void;
  isEdit?: boolean;
}

export function RelationshipDetails({
  entities,
  selectedSenderEntity,
  setSelectedSenderEntity,
  selectedReceiverEntity,
  setSelectedReceiverEntity,
  selectedSenderReference,
  setSelectedSenderReference,
  selectedReceiverReference,
  setSelectedReceiverReference,
  relationshipName,
  setRelationshipName,
  senderReferences,
  receiverReferences,
  docType,
  setDocType,
  selectedVersion,
  setSelectedVersion,
  selectedTransactionSet,
  setSelectedTransactionSet,
  isEdit,
}: RelationshipDetailsProps) {
  const handleSenderReferenceChange = (reference: string) => {
    const docType = senderReferences.find((ref: any) => ref.reference_id === reference)?.docType || "";
    setSelectedSenderReference(reference);
    setDocType(docType);
    console.log('doctypeSet', docType);
  };

  console.log('selectedSenderReference', selectedSenderReference);
  console.log('selectedReceiverReference', selectedReceiverReference);
  
  const { data: versions } = useGetVersionByFormat(docType === "EDI/EDIFACT" ? "E" : "X");
  const { data: transactionSets } = useGetTransactionSetByVersion(selectedVersion,docType === "EDI/EDIFACT" ? "E" : "X");


  
  return (
    <div className="space-y-6 ">
    { !isEdit && <div className="space-y-2">
        <Label htmlFor="relationship-name" className="text-sm font-medium">
          Relationship Name
        </Label>
        <Input
          id="relationship-name"
          type="text"
          placeholder="Enter relationship name"
          className="w-full"
          value={relationshipName}
          onChange={(e) => setRelationshipName(e.target.value)}
        />
      </div>}

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

      <section className="grid grid-cols-2 gap-4">
       
     

      <div className="space-y-2">
        <Label htmlFor="sender-reference" className="text-sm font-medium">
          Sender Reference
        </Label>
        <Select
          value={selectedSenderReference}
          onValueChange={handleSenderReferenceChange}
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
        <Select
          value={selectedReceiverReference}
          onValueChange={setSelectedReceiverReference}
        >
          <SelectTrigger className="w-full" id="receiver-reference">
            <SelectValue placeholder="Select Receiver Reference" />
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
      </section>

      {/* Version and Transaction Set Selection for EDI formats */}
      {(docType === "EDI/EDIFACT" || docType === "EDI/X12") && (
        <section className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="version" className="text-sm font-medium">
              Version
            </Label>
            <ReusableCombobox
              options={versions?.map((version: any) => ({
                value: version.Version,
                label: version.Version,
              })) || []}
              value={selectedVersion}
              onValueChange={setSelectedVersion}
              placeholder="Select version"
              emptyText="No versions available"
            />
          </div>

          {selectedVersion && (
            <div className="space-y-2">
              <Label htmlFor="transaction-set" className="text-sm font-medium">
                Transaction Set
              </Label>
              <ReusableCombobox
                options={transactionSets?.map((transactionSet: any) => ({
                  value: transactionSet.TransactionSet,
                  label: transactionSet.TransactionSet,
                })) || []}
                value={selectedTransactionSet}
                onValueChange={setSelectedTransactionSet}
                placeholder="Select transaction set"
                emptyText="No transaction sets available"
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
