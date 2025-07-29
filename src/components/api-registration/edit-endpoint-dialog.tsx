"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

interface Parameter {
  name: string;
  description: string;
}

interface Endpoint {
  url: string;
  input_parameters: string;
  output_parameters: string;
  is_default: boolean;
  version: number;
}

interface EditEndpointDialogProps {
  endpoint: Endpoint;
  onEditEndpoint: (updatedEndpoint: Endpoint) => void;
}

export function EditEndpointDialog({
  endpoint,
  onEditEndpoint,
}: EditEndpointDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [inputParameters, setInputParameters] = useState<Parameter[]>([]);
  const [outputParameters, setOutputParameters] = useState<Parameter[]>([]);

  // Parse JSON parameters to Parameter objects
  function mapToNameTypeArray(input: string | object) {
    let obj = input;

    // Step 1: parse once if it's a string
    if (typeof obj === "string") {
      try {
        obj = JSON.parse(obj);

        // Step 2: if it's STILL a string, parse again
        if (typeof obj === "string") {
          obj = JSON.parse(obj);
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        return [];
      }
    }

    // Check if it's already an array of parameters
    if (Array.isArray(obj)) {
      return obj.map((item) => ({
        name: item.name || "",
        description: item.description || "",
      }));
    }

    // If it's an object, convert to array format
    if (typeof obj === "object" && obj !== null) {
      return Object.entries(obj).map(([key, value]) => ({
        name: key,
        description: value as string,
      }));
    }

    return [];
  }

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Initialize parameters when dialog opens
  useEffect(() => {
    if (open) {
      setUrl(endpoint.url);
      setUrlError("");
      console.log("Input parameters string:", endpoint.input_parameters);
      console.log("Output parameters string:", endpoint.output_parameters);

      const parsedInput = mapToNameTypeArray(endpoint.input_parameters);
      const parsedOutput = mapToNameTypeArray(endpoint.output_parameters);

      console.log("Parsed input parameters:", parsedInput);
      console.log("Parsed output parameters:", parsedOutput);

      setInputParameters(parsedInput);
      setOutputParameters(parsedOutput);

      console.log("Setting input parameters to:", parsedInput);
      console.log("Setting output parameters to:", parsedOutput);
    }
  }, [open, endpoint]);

  // Debug: Log state changes
  useEffect(() => {
    console.log("Current inputParameters state:", inputParameters);
  }, [inputParameters]);

  const addInputParameter = () => {
    setInputParameters([...inputParameters, { name: "", description: "" }]);
  };

  const removeInputParameter = (index: number) => {
    setInputParameters(inputParameters.filter((_, i) => i !== index));
  };

  const updateInputParameter = (
    index: number,
    field: keyof Parameter,
    value: string
  ) => {
    const updated = [...inputParameters];
    updated[index] = { ...updated[index], [field]: value };
    setInputParameters(updated);
  };

  const addOutputParameter = () => {
    setOutputParameters([...outputParameters, { name: "", description: "" }]);
  };

  const removeOutputParameter = (index: number) => {
    setOutputParameters(outputParameters.filter((_, i) => i !== index));
  };

  const updateOutputParameter = (
    index: number,
    field: keyof Parameter,
    value: string
  ) => {
    const updated = [...outputParameters];
    updated[index] = { ...updated[index], [field]: value };
    setOutputParameters(updated);
  };

  const convertParametersToJson = (parameters: Parameter[]) => {
    const paramArray = parameters
      .filter((param) => param.name && param.description)
      .map((param) => ({
        name: param.name,
        description: param.description,
      }));
    return JSON.stringify(paramArray, null, 2);
  };

  const handleSubmit = () => {
    // Validate URL
    if (!url.trim()) {
      setUrlError("URL is required");
      return;
    }

    if (!validateUrl(url)) {
      setUrlError("Please enter a valid URL");
      return;
    }

    setUrlError("");

    const inputJson = convertParametersToJson(inputParameters);
    const outputJson = convertParametersToJson(outputParameters);

    onEditEndpoint({
      url: url.trim(),
      input_parameters: inputJson,
      output_parameters: outputJson,
      is_default: endpoint.is_default,
      version: endpoint.version, // Preserve the existing version
    });

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Endpoint</DialogTitle>
          <DialogDescription>
            Update the endpoint details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url">Endpoint URL</Label>
            <Input
              id="url"
              placeholder="https://api.example.com/endpoint"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (urlError) setUrlError("");
              }}
            />
            {urlError && (
              <p className="text-sm text-destructive mt-1">{urlError}</p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Input Parameters</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addInputParameter}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Parameter
                </Button>
              </div>
              <div className="space-y-2">
                {inputParameters.length === 0 && (
                  <div className="text-sm text-gray-500 italic">
                    No parameters found. Add parameters below.
                  </div>
                )}
                {inputParameters.map((param, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Parameter name"
                      value={param.name}
                      onChange={(e) =>
                        updateInputParameter(index, "name", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Input
                      placeholder="Parameter description"
                      value={param.description}
                      onChange={(e) =>
                        updateInputParameter(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInputParameter(index)}
                      className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Output Parameters</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOutputParameter}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Parameter
                </Button>
              </div>
              <div className="space-y-2">
                {outputParameters.map((param, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Parameter name"
                      value={param.name}
                      onChange={(e) =>
                        updateOutputParameter(index, "name", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Input
                      placeholder="Parameter description"
                      value={param.description}
                      onChange={(e) =>
                        updateOutputParameter(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOutputParameter(index)}
                      className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Update Endpoint
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
