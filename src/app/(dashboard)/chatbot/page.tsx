"use client";
import React, { useState, useEffect } from "react";
import {
  AIMessage,
  AIMessageAvatar,
  AIMessageContent,
} from "@/components/ui/kibo-ui/ai/message";
import { AIResponse } from "@/components/ui/kibo-ui/ai/response";
import { Button } from "@/components/ui/button";
import { ChartLine, CopyIcon, Plus, RefreshCcw, Share, ThumbsDown, ThumbsUp } from "lucide-react";
import ChatInput from "@/components/chatbot/chat-input";
import {
  useChats,
  useChatsSession,
  useCreateChatSession,
  useCreateLLMChat,
} from "@/hooks/use-chats";
import { useCurrentSession } from "@/hooks/use-current-session";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipTrigger  } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ReactMarkdown from "react-markdown";
import GraphModalVisualization from "@/components/graph-visualization/GraphModalVisualization";
import { useTransactionGraph } from "@/hooks/use-graph";

type Message = {
  id: string;
  session_id_id?: string | null;
  question?: string | null;
  answer?: string | null;
  reference?: string | null;
  created_at: Date;
  disliked_by_user: boolean;
  html_path?: string | null;
  table?: string;
  metadata?: string[]; // <-- Add this line
}
const ShareModal = ({message}: {message: Message | null}) => {
  if (!message) return null;
  return (
    <Dialog>
      <DialogTrigger>
      <TooltipTrigger>
        <Button variant="ghost" size="icon">
          <Share className="h-4 w-4" />
        </Button>
        <TooltipContent side="bottom" className="text-white p-2 border border-black rounded-2xl text-sm">Share</TooltipContent>
      </TooltipTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{message.question || "Share this response"}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="bg-muted rounded-lg p-4 text-sm h-[300px] overflow-y-auto">
          <ReactMarkdown>{message.answer || ""}</ReactMarkdown>
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={() => {
            navigator.clipboard.writeText(message.answer || "");
            toast({
              title: "Copied to clipboard",
              variant: "success",
            });
          }}>Copy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};  

const ChatBot = () => {
  const { session } = useCurrentSession();
  const [showCreateInput, setCreateInput] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");
  const [input, setInput] = useState("");
  const { data: chatSession } = useChatsSession(session?.user.token || "");
  const [selectedChatId, setSelectedChatId] = useState(
    chatSession ? chatSession[0]?.id : null
  );
  const [likedMessages, setLikedMessages] = useState<Record<string, boolean>>({});
  const [dislikedMessages, setDislikedMessages] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [graphModalInfoId, setGraphModalInfoId] = useState<string | null>(null);
  // Remove old graphData, graphLoading, graphError state and useEffect

  // Use TanStack Query for graph data
  const { data: graphData, isLoading: graphLoading, error: graphError } = useTransactionGraph(graphModalInfoId || "");

  const { data: messages } = useChats(
    selectedChatId || "",
    session?.user.token || ""
  );

  const { mutate: createSession } = useCreateChatSession(
    session?.user.token || ""
  );

  const { mutate: sendToLLM, isPending } = useCreateLLMChat(
    session?.user.token || "",
  );

  const handleLike = (messageId: string) => {
    // if liked, remove it. if disliked, remove it from dislikedMessages and add it to likedMessages.
    if (likedMessages?.[messageId]) {
      setLikedMessages((prev) => ({
        ...prev,
        [messageId]: false,
      }));
      return;
    }
    if (dislikedMessages?.[messageId]) {
      setDislikedMessages((prev) => ({
        ...prev,
        [messageId]: false,
      }));
    }
    setLikedMessages((prev) => ({
      ...prev,
      [messageId]: true,
    }));
  };

  const handleDislike = (messageId: string) => {
    // if disliked, remove it. if liked, remove it from likedMessages and add it to dislikedMessages.
    if (dislikedMessages?.[messageId]) {
      setDislikedMessages((prev) => ({
        ...prev,
        [messageId]: false,
      }));
      return;
    }
    if (likedMessages?.[messageId]) {
      setLikedMessages((prev) => ({
        ...prev,
        [messageId]: false,
      }));
    }
    setDislikedMessages((prev) => ({
      ...prev,
      [messageId]: true,
    }));
  };

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
      clientId: session?.user.client || "",
      sessionId: selectedChatId || "",
      question: input,
    });
  };

  const handleCopy = (messageId: string) => {
    // copy the message to the clipboard
    navigator.clipboard.writeText(messages?.find((message) => message.id === messageId)?.answer || "");
    toast({
      title: "Copied to clipboard",
      variant: "success",
    });
  };

  const handleShowInput = () => {
    setCreateInput(!showCreateInput);
  };

  return (
    <div className="flex overflow-hidden max-h-[90vh]">
      {/* Sidebar with chat history */}
      <div className="w-64 border-r p-4 flex flex-col">
        <p className="p-2 text-muted-foreground font-semibold text-sm ">
          Chat history
        </p>
        <div className="flex-grow overflow-y-auto space-y-1">
          {chatSession?.map((chatSession) => (
            <div
              key={chatSession.id}
              className={`p-2 cursor-pointer text-sm line-clamp-1 truncate rounded-lg hover:bg-gray-100 ${
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
        <section className="relative w-full flex flex-col">
          <div className="flex-grow p-6 overflow-y-auto h-[calc(100vh-200px)]">
            {messages?.map((msg, index) => {
              const { question, answer, metadata, ...message } = msg as Message & { metadata?: string[] };
              console.log({metadata})
              return (
                <section key={message.id}>
                  <AIMessage from="user" key={`user-${index}`}> 
                    <AIMessageContent>{question}</AIMessageContent>
                    <AIMessageAvatar name="User" src="" />
                  </AIMessage>
                  <AIMessage from="assistant" key={`assistant-${index}`}> 
                    <AIResponse>{answer}</AIResponse>
                    <AIMessageAvatar name="Assistant" src="/auth-Logo.svg" />
                  </AIMessage>
                  {/* Actions row */}
                  <div className="flex items-center gap-1">
                    <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(message.id)}>
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-white p-2 border border-black rounded-2xl text-sm">Copy</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                    {/* <TooltipTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleLike(message.id)}
                        >
                          {likedMessages?.[message.id] ? (
                            <ThumbsUp className="h-4 w-4 fill-primary text-primary" />
                          ) : (
                            <ThumbsUp className="h-4 w-4" />
                          )}
                        </Button>
                      <TooltipContent side="bottom" className="text-white p-2 border border-black rounded-2xl text-sm">Like</TooltipContent>
                    </TooltipTrigger>
                    </Tooltip>
                    <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="icon"
                      onClick={() => {
                            // Toggle disliked state for this message
                            handleDislike(message.id);
                            // if in likedMessages, remove it
                            // handleLike(message.id);
                          }}
                      >
                        {dislikedMessages?.[message.id] ? (
                            <ThumbsDown className="h-4 w-4 fill-primary text-primary" />
                          ) : (
                            <ThumbsDown className="h-4 w-4" />
                          )}
                      </Button>
                      <TooltipContent side="bottom" className="text-white p-2 border border-black rounded-2xl text-sm">Dislike</TooltipContent>
                    </TooltipTrigger> */}
                    </Tooltip>
                    <Tooltip>
                    <ShareModal message={{ ...message, question: question || "", answer: answer || "" }} />
                    </Tooltip>
                    <Tooltip>
                    {/* <TooltipTrigger>
                      <Button variant="ghost" size="icon">
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                      <TooltipContent side="bottom" className="text-white p-2 border border-black rounded-2xl text-sm">Regenerate</TooltipContent>
                    </TooltipTrigger> */}
                    </Tooltip>
                    {/* Graph button for testing with a sample info_id */}
                    {/* <Tooltip>
                      <TooltipTrigger>
                        <Button variant="ghost" size="icon" onClick={() => setGraphModalInfoId('8c12b574-4f63-46eb-837a-4edf74620a6f')}>
                          <ChartLine className="h-4 w-4" />
                        </Button>
                        <TooltipContent side="bottom" className="text-white p-2 border border-black rounded-2xl text-sm">Graph this transaction</TooltipContent>
                      </TooltipTrigger>
                    </Tooltip> */}
                    {metadata && metadata.length > 0 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <ChartLine className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {metadata.slice(0, 1).map((meta: any, index: number) => (
                                <DropdownMenuItem key={index} onClick={() => setGraphModalInfoId(meta)}>
                                  Graph Transaction
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-white p-2 border border-black rounded-2xl text-sm">Graph transaction</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
          <div className="bg-background p-4 sticky bottom-0 mt-auto">
            <ChatInput
              text={input}
              setText={setInput}
              onSubmit={handleSubmit}
              disabled={isPending}
            />
          </div>
          {/* Graph Modal */}
          {graphModalInfoId && (
            <Dialog open={!!graphModalInfoId} onOpenChange={() => setGraphModalInfoId(null)}>
              <DialogContent className="!w-screen !max-w-screen h-screen flex flex-col p-0">
                <DialogHeader className="p-6 border-b">
                  <DialogTitle>Transaction Graph</DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex items-center justify-center bg-background">
                  {graphLoading && <div>Loading...</div>}
                  {graphError && <div className="text-red-500">{graphError instanceof Error ? graphError.message : String(graphError)}</div>}
                  {graphData && (
                    <div className="w-full h-full">
                      <GraphModalVisualization data={graphData} />
                    </div>
                  )}
                  {!graphLoading && !graphError && !graphData && <div>No data.</div>}
                </div>
              </DialogContent>
            </Dialog>
          )}
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
