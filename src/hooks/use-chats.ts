import axiosInstance, { axiosPython } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const getChatSession = async (token: string) => {
  const response = await axiosInstance(token).get(`/chat/sessions`);
  return response.data;
};

export const useChatsSession = (token: string) => {
  return useQuery<
    {
      id: string;
      user_id: string | null;
      chat_count: number;
      _count: {
        chat_chat: number;
      };
      created_at: Date;
      title: string | null;
      session_uid: string;
      updated_at: Date;
    }[]
  >({
    queryKey: ["chat-session"],
    queryFn: () => getChatSession(token),
    enabled: !!token,
  });
};

export const getChats = async (sessionId: string, token: string) => {
  const response = await axiosInstance(token).get(
    `/chat/sessions/${sessionId}/chats`
  );
  return response.data;
};

export const useChats = (sessionId: string, token: string) => {
  return useQuery<
    {
      id: string;
      session_id_id: string | null;
      question: string | null;
      answer: string | null;
      reference: string | null;
      created_at: Date;
      disliked_by_user: boolean;
      html_path: string | null;
      table: string;
    }[]
  >({
    queryKey: ["chats", sessionId],
    queryFn: () => getChats(sessionId, token),
    enabled: !!token && !!sessionId,
  });
};

export const createChatSession = async (title: string, token: string) => {
  const response = await axiosInstance(token).post(`/chat/sessions`, {
    title,
  });
  return response.data;
};

export const useCreateChatSession = (token: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (title: string) => createChatSession(title, token),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Session created successfully",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["chat-session"] });
    },
    onError: (error: any) => {
      console.error("Error creating chat session:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to create chat session. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const createChat = async (
  sessionId: string,
  question: string,
  answer: string,
  token: string
) => {
  const response = await axiosInstance(token).post(
    `/chat/sessions/${sessionId}/chats`,
    {
      question,
      answer,
      reference: null,
      disliked_by_user: false,
      html_path: null,
      table: "",
    }
  );
  return response.data;
};

export const createLLMChat = async (
  clientId: string,
  sessionId: string,
  question: string,
  token: string
) => {
  const response = await axiosPython.post(`/chat`, {
    query: question,
    client_id: "Company A",
    stream: false,
  });
  return response.data;
};

export const useCreateLLMChat = (token: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({
      sessionId,
      clientId,
      question,
    }: {
      clientId: string;
      sessionId: string;
      question: string;
    }) => createLLMChat(clientId, sessionId, question, token),
    onSuccess: async (data, variables) => {
      console.log("data", data);
      await createChat(
        variables.sessionId,
        variables.question,
        data.response,
        token
      );
      toast({
        title: "Success",
        description: "LLM response received",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["chats", variables.sessionId],
      });
    },
    onError: (error: any) => {
      console.error("Error with LLM chat:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to get LLM response. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useCreateChat = (token: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({
      sessionId,
      question,
      answer,
    }: {
      sessionId: string;
      question: string;
      answer: string;
    }) => createChat(sessionId, question, answer, token),
    onSuccess: (variables) => {
      toast({
        title: "Success",
        description: "Message sent successfully",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["chats", variables.sessionId],
      });
    },
    onError: (error: any) => {
      console.error("Error creating chat message:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });
};
