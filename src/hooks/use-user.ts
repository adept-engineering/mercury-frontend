import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/actions/user";
import { ForgotPassword } from "@/actions/auth";
import { toast } from "./use-toast";

export const useDeleteUser = () => {
  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: async (id: string) => await deleteUser(id),
    onSuccess: () => {
      toast({
        title: "User deleted successfully",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete user",
        variant: "destructive",
      });
    },
  });
  const { mutate: forgotPasswordMutation } = useMutation({
    mutationFn: async (email: string) => await ForgotPassword(email),
    onSuccess: () => {
      toast({
        title: "Password reset email sent",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Failed to send password reset email",
        variant: "destructive",
      });
    },
  });
  return { deleteUserMutation, forgotPasswordMutation };
};