import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntity, updateEntity } from "@/actions/entity";
import { useToast } from "@/hooks/use-toast";
import { EntityData } from "@/lib/types";
import { useCurrentSession } from "./use-current-session";

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

interface UpdateEntityData extends CreateEntityData {
    entityId: string;
}

export function useCreateEntity() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { session } = useCurrentSession();

    return useMutation({
        mutationFn: async (entityData: EntityData) => createEntity(entityData, session?.user?.token ?? ""),
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
        mutationFn: async ({ entityData, entityId }: { entityData: EntityData; entityId: string }) => {
            // Transform the form data to match the API expected format
            return await updateEntity(entityData, entityId, session?.user?.token ?? "");
        },
        onSuccess: (data, variables) => {
            toast({
                title: "Success",
                description: "Entity updated successfully",
                variant: "default",
            });
            // Invalidate and refetch entities list and the specific entity
            queryClient.invalidateQueries({ queryKey: ["entities"] });
            queryClient.invalidateQueries({ queryKey: ["entity", variables.entityId] });
        },
        onError: (error: any) => {
            console.error("Error updating entity:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to update entity. Please try again.",
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
