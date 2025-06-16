"use client";
import { FileText, Settings } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "../file-uploader/uploadContainer";
import { Button } from "../ui/button";

export default function PerformTestContainer() {
  const [file, setFile] = useState<File>();

  const [view, setView] = useState<"upload" | "process">("upload");
  console.log(view);
  const handleScreenMove = (state: "upload" | "process") => {
    setView(state);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Perform A Test</h1>
        <p className="text-muted-foreground text-sm">
          Upload an EDI file to view its original content and see the NLP
          conversion result side by side.
          <br /> Use the Convert button to process the file, and clear or reset
          to start a new task.
        </p>
      </div>

      {/* Container Section */}
      <section className="my-6 w-full text-center space-y-6">
        <div className="flex items-center gap-4">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <h1 className="text-lg font-semibold text-secondary-foreground">
            Upload Interface
          </h1>
        </div>

        <div className="border-dashed">
          <FileUploader
            maxFileCount={Infinity}
            className={`flex-shrink-0  dark:bg-[#012A3C] bg-primaryBlue/10`}
            message={`Drag and drop files here`}
            maxSize={8 * 1024 * 1024}
            onValueChange={(files) => setFile(files[files.length - 1])}
          />
        </div>

        <Button
          className="bg-pink-500 hover:bg-pink-600 text-white my-6 mx-auto"
          type="submit"
          onClick={() => handleScreenMove("process")}
          disabled={!file}
        >
          <Settings className="w-2 h-2 text-white mr-2" />
          Process file
        </Button>
      </section>
    </div>
  );
}
