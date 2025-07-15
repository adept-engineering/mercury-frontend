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
            toast({
                title: "Success",
                description: "Entity created successfully",
                variant: "default",
            });
            // Invalidate and refetch entities list
            queryClient.invalidateQueries({ queryKey: ["entities"] });
        },
        onError: (error: any) => {
            console.error("Error creating entity:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to create entity. Please try again.",
                variant: "destructive",
            });
        },
    });
}

export function useUpdateEntity() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { session } = useCurrentSession();

    return useMutation({
        mutationFn: async ({ entityId, ...entityData }: UpdateEntityData) => {
            // Transform the form data to match the API expected format
            const apiData: EntityData = {
                name: entityData.name,
                email_address: entityData.email_address ?? "",
                address1: entityData.address1 ?? "",
                address2: entityData.address2 ?? "",
                city: entityData.city ?? "",
                state: entityData.state ?? "",
                country: entityData.country ?? "",
                zipcode: entityData.zipcode ?? "",
                organization_type: entityData.organization_type ?? "COMPANY",
                referenceIDs: entityData.referenceIDs ?? [],
            };

            return await updateEntity(apiData, entityId, session?.user?.token ?? "");
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
