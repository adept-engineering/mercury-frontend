import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getChatSession = async (token: string) => {
  const response = await axiosInstance(token).get(`/chat/sessions`);
  return response.data.senders;
};

export const useChatsSession = (token: string) => {
  return useQuery({
    queryKey: ["chat-session"],
    queryFn: () => getChatSession(token),
    enabled: !!token,
  });
};
