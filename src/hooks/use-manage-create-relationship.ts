import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRelationship,
  deleteRelationship,
  getRelationshipById,
  updateRelationship,
} from "@/actions/relationships";
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
    position: number | null;
    stepName: string;
    registrationid: string;
  }>;
}

interface BusinessRule {
  reference_name: string;
  reference_value: string;
  position: number;
  stepName: string;
  registrationid: string;
}

export function useManageCreateRelationship() {
  const queryClient = useQueryClient();
  const { session } = useCurrentSession();
  const createRelationshipMutation = useMutation({
    mutationFn: async (data: CreateRelationshipData) => {
      return await createRelationship(data, session?.user?.token || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });

  const deleteRelationshipMutation = useMutation({
    mutationFn: async ({
      id,
      entityidtbl_relationship_id,
    }: {
      id: string;
      entityidtbl_relationship_id: string;
    }) => {
      return await deleteRelationship(
        id,
        entityidtbl_relationship_id,
        session?.user?.token || ""
      );
    },
  });

  const createRelationshipWithData = async (
    senderEntity: string,
    receiverEntity: string,
    transactionSet: string,
    senderReference: string,
    receiverReference: string,
    standardVersion: string,
 
    businessRules: BusinessRule[]
  ) => {
    // Build extn_data array
    const extn_data: Array<{
      reference_name: string;
      reference_value: string;
      position: number | null;
      stepName: string;
      registrationid: string;
    }> = [];


    // Add business rules
    businessRules.forEach((rule) => {
      extn_data.push({
        reference_name: rule.reference_name,
        reference_value: rule.reference_value,
        position: rule.position,
       
        stepName: rule.stepName,
        registrationid: rule.registrationid,
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
    deleteRelationshipMutation,
  };
}

export function useDeleteRelationship() {
  const queryClient = useQueryClient();
  const { session } = useCurrentSession();
  const deleteRelationshipMutation = useMutation({
    mutationFn: async ({
      id,
      entityidtbl_relationship_id,
    }: {
      id: string;
      entityidtbl_relationship_id: string;
    }) => {
      return await deleteRelationship(
        id,
        entityidtbl_relationship_id,
        session?.user?.token || ""
      );
    },
  });
  return {
    deleteRelationshipMutation,
  };
}
export function useGetRelationshipById() {
  const queryClient = useQueryClient();
  const { session } = useCurrentSession();
  const getRelationshipByIdMutation = useMutation({
    mutationFn: async (id: string) => {
      return await getRelationshipById(id, session?.user?.token || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });
  return {
    getRelationshipByIdMutation,
  };
}

export function useUpdateRelationship() {
  const queryClient = useQueryClient();
  const { session } = useCurrentSession();
  const updateRelationshipMutation = useMutation({
    mutationFn: async (data: {
      id: string;
      data: {
        entityid_id_sender: string;
        entityid_id_receiver: string;
        transaction_name: string;
        sender_id: string;
        receiver_id: string;
        std_version: string;
        extn_data: Array<{
          reference_name: string;
          reference_value: string;
          position: number | null;
          businessrule: "RULE" | "COMM";
        }>;
      };
    }) => {
      return await updateRelationship(
        data.id,
        data.data,
        session?.user?.token || ""
      );
    },
  });
  return {
    updateRelationshipMutation,
  };
}
