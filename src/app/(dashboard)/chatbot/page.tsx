"use client";
import React, { useState } from "react";
import {
  AIMessage,
  AIMessageAvatar,
  AIMessageContent,
} from "@/components/ui/kibo-ui/ai/message";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChatInput from "@/components/chatbot/chat-input";
import { useChatsSession } from "@/hooks/use-chats";
import { useCurrentSession } from "@/hooks/use-current-session";

const ChatBot = () => {
  const { session } = useCurrentSession();
  const [chats, setChats] = useState([
    { id: 1, title: "New Chat 1" },
    { id: 2, title: "New Chat 2" },
  ]);
  const { data: chatSession } = useChatsSession(session?.user.token || "");
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id);
  const [messages, setMessages] = useState<
    {
      from: "user" | "assistant";
      content: string;
      avatar: string;
      name: string;
    }[]
  >([
    {
      from: "user",
      content: "Hello, how are you?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      from: "assistant",
      content: "I am fine, thank you!",
      avatar: "https://github.com/openai.png",
      name: "OpenAI",
    },
    {
      from: "user",
      content: "What is the weather in Tokyo?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      from: "assistant",
      content: "The weather in Tokyo is sunny.",
      avatar: "https://github.com/openai.png",
      name: "OpenAI",
    },
    {
      from: "user",
      content: "Hello, how are you?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      from: "assistant",
      content: "I am fine, thank you!",
      avatar: "https://github.com/openai.png",
      name: "OpenAI",
    },
    {
      from: "user",
      content: "What is the weather in Tokyo?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      from: "assistant",
      content: "The weather in Tokyo is sunny.",
      avatar: "https://github.com/openai.png",
      name: "OpenAI",
    },
    {
      from: "user",
      content: "Hello, how are you?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      from: "assistant",
      content: "I am fine, thank you!",
      avatar: "https://github.com/openai.png",
      name: "OpenAI",
    },
    {
      from: "user",
      content: "What is the weather in Tokyo?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      from: "assistant",
      content: "The weather in Tokyo is sunny.",
      avatar: "https://github.com/openai.png",
      name: "OpenAI",
    },
  ]);

  const addNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([...chats, { id: newChatId, title: `New Chat ${newChatId}` }]);
    setSelectedChatId(newChatId);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar with chat history */}
      <div className="w-64 border-r p-4 flex flex-col">
        <p className="p-2 text-muted-foreground font-semibold text-sm ">
          Chat history
        </p>
        <div className="flex-grow overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 cursor-pointer text-sm ${
                selectedChatId === chat.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              {chat.title}
            </div>
          ))}
          {/* Add Chat Button */}
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={addNewChat}
          >
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
      </div>

      {/* Messages View */}
      <section className="relative w-full">
        <div className="flex-grow p-6 overflow-y-auto max-h-[70%]">
          {messages.map(({ content, ...message }, index) => (
            <AIMessage from={message.from} key={index}>
              <AIMessageContent>{content}</AIMessageContent>
              <AIMessageAvatar name={message.name} src={message.avatar} />
            </AIMessage>
          ))}
        </div>
        <div className=" bg-background p-4">
          <ChatInput />
        </div>
      </section>
    </div>
  );
};

export default ChatBot;
