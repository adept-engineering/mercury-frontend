"use client";
import {
  AIInput,
  AIInputButton,
  AIInputModelSelect,
  AIInputModelSelectContent,
  AIInputModelSelectItem,
  AIInputModelSelectTrigger,
  AIInputModelSelectValue,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/kibo-ui/ai/input";
import { GlobeIcon, MicIcon, PlusIcon } from "lucide-react";
import { type FormEventHandler, useState } from "react";
const models = [
  { id: "llama-2-70b", name: "Llama 2 70B", provider: "meta.com" },
];
const ChatInput = () => {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<string>(models[0].id);
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    setStatus("submitted");
    setTimeout(() => {
      setStatus("streaming");
    }, 200);
    setTimeout(() => {
      setStatus("ready");
    }, 2000);
  };
  return (
    <AIInput onSubmit={handleSubmit}>
      <AIInputTextarea onChange={(e) => setText(e.target.value)} value={text} />
      <AIInputToolbar>
        <AIInputTools>
          <AIInputButton className="opacity-70">
            <PlusIcon size={16} />
          </AIInputButton>
          <AIInputButton>
            <MicIcon size={16} />
          </AIInputButton>
          <AIInputButton>
            <GlobeIcon size={16} />
          </AIInputButton>
          <AIInputModelSelect onValueChange={setModel} value={model}>
            <AIInputModelSelectTrigger>
              <AIInputModelSelectValue />
            </AIInputModelSelectTrigger>
            <AIInputModelSelectContent defaultValue={model[0]}>
              {models.map((model) => (
                <AIInputModelSelectItem key={model.id} value={model.id}>
                  {model.name}
                </AIInputModelSelectItem>
              ))}
            </AIInputModelSelectContent>
          </AIInputModelSelect>
        </AIInputTools>
        <AIInputSubmit disabled={!text} status={status} />
      </AIInputToolbar>
    </AIInput>
  );
};
export default ChatInput;
