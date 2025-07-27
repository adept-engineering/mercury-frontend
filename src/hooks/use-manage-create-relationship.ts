import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRelationship } from "@/actions/relationships";
import { useCurrentSession } from "./use-current-session";

interface CreateRelationshipData {
  entityid_id_sender: string;
  entityid_id_receiver: string;
  transaction_name: string;
  sender_id: string;
  receiver_id: string;
  std_version: string;
  extn_data: Array<{
    reference_name: string;
    reference_value: string;
    position: number;
  }>;
}

interface BusinessRule {
  map_type: "COMPLIANCE" | "TRANSFORMATION" | "RESEARCH";
  id: string;
  map_title: string;
  map_description: string;
}

export function useManageCreateRelationship() {
  const queryClient = useQueryClient();
  const { session } = useCurrentSession();
  const createRelationshipMutation = useMutation({
    mutationFn: async (data: CreateRelationshipData) => {
      return await createRelationship(data, session?.user?.token || "");
    },
    onSuccess: () => {
      // Invalidate and refetch relationships list
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
  });

  const createRelationshipWithData = async (
    senderEntity: string,
    receiverEntity: string,
    transactionSet: string,
    senderReference: string,
    receiverReference: string,
    standardVersion: string,
    endpointUrl: string,
    businessRules: BusinessRule[]
  ) => {
    // Build extn_data array
    const extn_data: Array<{
      reference_name: string;
      reference_value: string;
      position: number;
    }> = [];

    // Add endpoint URL
    if (endpointUrl) {
      extn_data.push({
        reference_name: "endpoint",
        reference_value: endpointUrl,
        position: 0,
      });
    }

    // Add business rules
    businessRules.forEach((rule, index) => {
      extn_data.push({
        reference_name: rule.map_type,
        reference_value: rule.id,
        position: index + 1,
      });
    });

    const relationshipData: CreateRelationshipData = {
      entityid_id_sender: senderEntity,
      entityid_id_receiver: receiverEntity,
      transaction_name: transactionSet,
      sender_id: senderReference,
      receiver_id: receiverReference,
      std_version: standardVersion,
      extn_data,
    };

    return createRelationshipMutation.mutateAsync(relationshipData);
  };

  return {
    createRelationshipWithData,
    createRelationshipMutation,
  };
}
