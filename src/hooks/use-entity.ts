import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkIfTenantHasCompanyEntity, createEntity, updateEntity } from "@/actions/entity";
import { useToast } from "@/hooks/use-toast";
import { EntityData } from "@/lib/types";
import { useCurrentSession } from "./use-current-session";
import axiosInstance from "@/lib/axios";

interface CreateEntityData {
  name: string;
  email_address?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  organization_type?: "COMPANY" | "PARTNER";
  referenceIDs?: Array<{
    docType: string;
    interchangeNumber?: string;
    groupID?: string;
    applicationID?: string;
  }>;
}

type EntityIdExtension = {
  reference_name: string;
  reference_value: string;
};

type EntityIdTable = {
  reference_id_type: string;
  entityidtbl_extn: EntityIdExtension[];
};

type Entity = {
  id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  email_address: string;
  created_by: string | null;
  created_date: string;
  updated_by: string | null;
  updated_date: string | null;
  status: string | null;
  entityid_id: string;
  organization_type: string;
  tenant_id: string;
  entityidtbl: EntityIdTable[];
};

interface UpdateEntityData extends CreateEntityData {
  entityId: string;
}

export function useCreateEntity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { session } = useCurrentSession();

  return useMutation({
    mutationFn: async (entityData: EntityData) =>
      createEntity(entityData, session?.user?.token ?? ""),
    onSuccess: () => {
      // Invalidate and refetch entities list
      queryClient.invalidateQueries({ queryKey: ["entities"] });
    },
    onError: (error: any) => {
      console.error("Error creating entity:", error);
      throw error;
    },
  });
}

export function useUpdateEntity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { session } = useCurrentSession();

  return useMutation({
    mutationFn: async ({
      entityData,
      entityId,
    }: {
      entityData: EntityData;
      entityId: string;
    }) => {
      // Transform the form data to match the API expected format
      return await updateEntity(
        entityData,
        entityId,
        session?.user?.token ?? ""
      );
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Entity updated successfully",
        variant: "default",
      });
      // Invalidate and refetch entities list and the specific entity
      queryClient.invalidateQueries({ queryKey: ["entities"] });
      queryClient.invalidateQueries({
        queryKey: ["entity", variables.entityId],
      });
    },
    onError: (error: any) => {
      console.error("Error updating entity:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to update entity. Please try again.",
        variant: "destructive",
      });
    },
  });
}

// Combined hook that provides both create and update functionality
export function useEntity() {
  const createEntity = useCreateEntity();
  const updateEntity = useUpdateEntity();

  return {
    createEntity,
    updateEntity,
    isCreating: createEntity.isPending,
    isUpdating: updateEntity.isPending,
    isLoading: createEntity.isPending || updateEntity.isPending,
  };
}

export const getEntities = async (token: string) => {
  const response = await axiosInstance(token).get("/entities");

  return response.data;
};

export const useEntities = (token: string) => {
  return useQuery<Entity[]>({
    queryKey: ["entities"],
    queryFn: () => getEntities(token),
    enabled: !!token,
  });
};

export const useCheckIfTenantHasCompanyEntity = (token: string) => {
  return useQuery<boolean>({
    queryKey: ["checkIfTenantHasCompanyEntity"],
    queryFn: () => checkIfTenantHasCompanyEntity(token),
    enabled: !!token,
  });
};
