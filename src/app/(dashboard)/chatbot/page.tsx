"use client";
import React, { useState } from "react";
import {
  AIMessage,
  AIMessageAvatar,
  AIMessageContent,
} from "@/components/ui/kibo-ui/ai/message";
import { AIResponse } from "@/components/ui/kibo-ui/ai/response";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChatInput from "@/components/chatbot/chat-input";
import {
  useChats,
  useChatsSession,
  useCreateChatSession,
  useCreateLLMChat,
} from "@/hooks/use-chats";
import { useCurrentSession } from "@/hooks/use-current-session";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const ChatBot = () => {
  const { session } = useCurrentSession();
  const [showCreateInput, setCreateInput] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");
  const [input, setInput] = useState("");
  const { data: chatSession } = useChatsSession(session?.user.token || "");
  const [selectedChatId, setSelectedChatId] = useState(
    chatSession ? chatSession[0]?.id : null
  );

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages } = useChats(
    selectedChatId || "",
    session?.user.token || ""
  );

  const { mutate: createSession } = useCreateChatSession(
    session?.user.token || ""
  );

  const { mutate: sendToLLM, isPending } = useCreateLLMChat(
    session?.user.token || ""
  );

  const handleSubmit = () => {
    if (!selectedChatId) {
      toast({
        title: "Select a chat session",
        variant: "destructive",
      });
    }
    // Optimistically add the user's question to the messages
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      question: input,
      answer: "Thinking...",
      created_at: new Date(),
      session_id_id: selectedChatId,
      disliked_by_user: false,
      html_path: null,
      table: "",
    };

    // Update the local state to show the user's message immediately
    const updatedMessages = messages
      ? [...messages, optimisticMessage]
      : [optimisticMessage];
    setInput("");

    queryClient.setQueryData(["chats", selectedChatId], updatedMessages);
    sendToLLM({
      clientId: session?.user.id || "",
      sessionId: selectedChatId || "",
      question: input,
    });
  };

  const handleShowInput = () => {
    setCreateInput(!showCreateInput);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar with chat history */}
      <div className="w-64 border-r p-4 flex flex-col">
        <p className="p-2 text-muted-foreground font-semibold text-sm ">
          Chat history
        </p>
        <div className="flex-grow overflow-y-auto">
          {chatSession?.map((chatSession) => (
            <div
              key={chatSession.id}
              className={`p-2 cursor-pointer text-sm ${
                selectedChatId === chatSession?.id.toString()
                  ? "bg-gray-100"
                  : ""
              }`}
              onClick={() => setSelectedChatId(chatSession.id)}
            >
              {chatSession.title}
            </div>
          ))}
          {showCreateInput && (
            <div className="flex items-center space-x-2 p-2">
              <Input
                placeholder="Create new chat session"
                className="flex-grow"
                value={newChatTitle}
                onChange={(e) => setNewChatTitle(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (newChatTitle.trim()) {
                    createSession(newChatTitle);
                    setCreateInput(false);
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={handleShowInput}
          >
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
      </div>

      {/* Messages View */}
      {selectedChatId && (
        <section className="relative w-full">
          <div className="flex-grow p-6 overflow-y-auto max-h-[70%]">
            {messages?.map(({ question, answer, ...message }, index) => (
              <section key={message.id}>
                <AIMessage from="user" key={`user-${index}`}>
                  <AIMessageContent>{question}</AIMessageContent>
                  <AIMessageAvatar name="User" src="" />
                </AIMessage>
                <AIMessage from="assistant" key={`assistant-${index}`}>
                  <AIResponse>{answer}</AIResponse>
                  <AIMessageAvatar name="Assistant" src="/auth-Logo.svg" />
                </AIMessage>
              </section>
            ))}
          </div>
          <div className=" bg-background p-4 sticky bottom-0 ">
            <ChatInput
              text={input}
              setText={setInput}
              onSubmit={handleSubmit}
              disabled={isPending}
            />
          </div>
        </section>
      )}

      {!selectedChatId && (
        <div className="flex flex-col items-center justify-center h-full w-full p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-muted-foreground"
              >
                <path d="M3 11v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
                <path d="M12 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6.5" />
                <path d="M16 19h2" />
                <path d="M20 15c0 1.1-.9 2-2 2h-5.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Start a New Conversation
            </h2>
            <p className="text-muted-foreground">
              Select a chat from your history or create a new chat to interact
              with our AI assistant.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <Button
                variant="default"
                onClick={handleShowInput}
                className="px-6 py-3"
              >
                <Plus className="mr-2 h-4 w-4" /> Create New Chat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
