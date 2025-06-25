import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";

interface CreateUserData {
    email: string;
    entityIds: string[];
    firstName: string;
    lastName: string;
    role: string;
}

export function useCreateUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (userData: CreateUserData) => {
            return await createUser(
                userData.email,
                userData.entityIds,
                userData.firstName,
                userData.lastName,
                userData.role
            );
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "User created successfully",
                variant: "default",
            });
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            console.error("Error creating user:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to create user. Please try again.",
                variant: "destructive",
            });
        },
    });
}
