"use client";

import { useState } from "react";
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
import { Plus, Trash2 } from "lucide-react";

interface Parameter {
  name: string;
  description: string;
}

interface InputParameter {
  name: string;
  description: string;
  display_name: string;
  mandatory: string;
}

interface Endpoint {
  url: string;
  input_parameters: string;
  output_parameters: string;
  is_default: boolean;
  version: number;
}

interface AddEndpointDialogProps {
  onAddEndpoint: (endpoint: Endpoint) => void;
  existingEndpointsCount: number;
}

export function AddEndpointDialog({
  onAddEndpoint,
  existingEndpointsCount,
}: AddEndpointDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [inputParameters, setInputParameters] = useState<InputParameter[]>([]);
  const [outputParameters, setOutputParameters] = useState<Parameter[]>([]);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addInputParameter = () => {
    setInputParameters([
      ...inputParameters,
      { name: "", description: "", display_name: "", mandatory: "no" },
    ]);
  };

  const removeInputParameter = (index: number) => {
    setInputParameters(inputParameters.filter((_, i) => i !== index));
  };

  const updateInputParameter = (
    index: number,
    field: keyof InputParameter,
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

  const convertInputParametersToJson = (parameters: InputParameter[]) => {
    const paramArray = parameters
      .filter((param) => param.name && param.description)
      .map((param) => ({
        name: param.name,
        description: param.description,
        display_name: param.display_name,
        mandatory: param.mandatory,
      }));
    return JSON.stringify(paramArray, null, 2);
  };

  const convertOutputParametersToJson = (parameters: Parameter[]) => {
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

    const inputJson = convertInputParametersToJson(inputParameters);
    const outputJson = convertOutputParametersToJson(outputParameters);

    onAddEndpoint({
      url: url.trim(),
      input_parameters: inputJson,
      output_parameters: outputJson,
      is_default: existingEndpointsCount === 0, // First endpoint is default
      version: existingEndpointsCount + 1, // Start with 1 and increment
    });

    // Reset form
    setUrl("");
    setInputParameters([]);
    setOutputParameters([]);
    setOpen(false);
  };

  const handleCancel = () => {
    setUrl("");
    setUrlError("");
    setInputParameters([]);
    setOutputParameters([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-primary hover:bg-primary/90 text-white px-6">
          <Plus className="mr-2 h-4 w-4" />
          Add Endpoint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Endpoint</DialogTitle>
          <DialogDescription>
            Add a new endpoint to your API registration. Fill in the details
            below.
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
                {inputParameters.map((param, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-3 border rounded-md">
                    <div className="flex gap-2 items-center">
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
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="Display name"
                        value={param.display_name}
                        onChange={(e) =>
                          updateInputParameter(
                            index,
                            "display_name",
                            e.target.value
                          )
                        }
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`mandatory-${index}`}
                          checked={param.mandatory === "yes"}
                          onChange={(e) =>
                            updateInputParameter(
                              index,
                              "mandatory",
                              e.target.checked ? "yes" : "no"
                            )
                          }
                          className="h-4 w-4"
                        />
                        <label
                          htmlFor={`mandatory-${index}`}
                          className="text-sm">
                          Mandatory
                        </label>
                      </div>
                    </div>
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
              Add Endpoint
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
