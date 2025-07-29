import { useMutation } from "@tanstack/react-query";
import { createApiRegistration, deleteApiRegistration, updateApiRegistration } from "@/actions/api-registration";
import { useCurrentSession } from "./use-current-session";
import { useQueryClient } from "@tanstack/react-query";

export const useManageApiRegistration = () => {
  const queryClient = useQueryClient();
  const { session } = useCurrentSession();
  const {
    mutate: createApiRegistrationMutation,
    isPending: isCreatingApiRegistration,
  } = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      endpoints: {
        url: string;
        input_parameters: string;
        output_parameters: string;
        is_default: boolean;
        version: number;
      }[];
    }) => createApiRegistration(data, session?.user?.token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-registration"] });
    },
  });

  const { mutate: deleteApiRegistrationMutation, isPending: isDeletingApiRegistration } = useMutation({
    mutationFn: (data: { id: string; registration_id: string }) =>
      deleteApiRegistration(data, session?.user?.token || ""),
  });

  const { mutate: updateApiRegistrationMutation, isPending: isUpdatingApiRegistration } = useMutation({
    mutationFn: (data: { id: string; registration_id: string; data: { name: string; description: string; endpoints: { url: string; input_parameters: string; output_parameters: string; is_default: boolean; version: number; }[]; } }) =>
      updateApiRegistration(data, session?.user?.token || ""),
  });

  return {
    createApiRegistrationMutation,
    isCreatingApiRegistration,
    deleteApiRegistrationMutation,
    isDeletingApiRegistration,
    updateApiRegistrationMutation,
    isUpdatingApiRegistration,
  };
};
