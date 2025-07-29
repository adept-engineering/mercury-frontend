"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCurrentSession } from "@/hooks/use-current-session";
import { toast } from "@/hooks/use-toast";
import { EditEndpointDialog } from "./edit-endpoint-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateApiRegistration } from "@/actions/api-registration";
import { useManageApiRegistration } from "@/hooks/use-manage-api-registration";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "API name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

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

interface ApiData {
  id: string;
  name: string;
  description: string;
  default_version: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  registration_id: string;
  tenant_id: string;
  endpoints: Array<{
    url: string;
    version: number;
    input_parameters: string;
    output_parameters: string;
    is_default: boolean;
  }>;
}

interface EditApiRegistrationFormProps {
  apiData: ApiData;
}

export function EditApiRegistrationForm({
  apiData,
}: EditApiRegistrationFormProps) {
  // Filter to only show the latest version of each endpoint
  const latestEndpoints = apiData.endpoints.reduce((acc, endpoint) => {
    const existingEndpoint = acc.find((e) => e.url === endpoint.url);
    if (!existingEndpoint || endpoint.version > existingEndpoint.version) {
      // Remove the old version and add the new one
      const filtered = acc.filter((e) => e.url !== endpoint.url);
      return [...filtered, endpoint];
    }
    return acc;
  }, [] as Endpoint[]);

  const [endpoints, setEndpoints] = useState<Endpoint[]>(latestEndpoints);
  const { session } = useCurrentSession();
  const router = useRouter();
  const { updateApiRegistrationMutation, isUpdatingApiRegistration } =
    useManageApiRegistration();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: apiData.name,
      description: apiData.description,
    },
  });

  console.log(endpoints);

  // Custom validation function to check only required fields
  const isFormValid = () => {
    const values = form.getValues();
    const hasName = values.name && values.name.length >= 2;
    const hasDescription = values.description && values.description.length > 0;
    const hasEndpoints = endpoints.length === 1; // Require exactly one endpoint

    return hasName && hasDescription && hasEndpoints;
  };

  function onSubmit(values: FormValues) {
    console.log({ ...values, endpoints });

    try {
      updateApiRegistrationMutation({
        id: apiData.id,
        registration_id: apiData.registration_id,
        data: { ...values, endpoints },
      });
      toast({
        title: "Success",
        description: "API updated successfully",
        variant: "success",
      });
      router.push("/api-registration");
    } catch (error) {
      console.error("Error updating API:", error);
      toast({
        title: "Error",
        description: "Failed to update API. Please try again.",
        variant: "destructive",
      });
    }
  }

  const editEndpoint = (index: number, updatedEndpoint: Endpoint) => {
    // Increment version when endpoint is edited
    const endpointWithIncrementedVersion = {
      ...updatedEndpoint,
      version: updatedEndpoint.version + 1,
    };

    const newEndpoints = endpoints.map((endpoint, i) =>
      i === index ? endpointWithIncrementedVersion : endpoint
    );
    setEndpoints(newEndpoints);
  };

  const removeEndpoint = (index: number) => {
    setEndpoints([]);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="space-y-8 rounded-md border p-8">
            <div className="grid grid-cols-1 w-[50%] gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter API Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter API Description"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">Endpoints</h1>
              </div>

              <div className="space-y-4">
                {endpoints.map((endpoint, i) => (
                  <Card key={`endpoint-${i}`} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">
                            {endpoint.url || "No URL"}
                          </CardTitle>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                            Default (v{endpoint.version})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <EditEndpointDialog
                            endpoint={endpoint}
                            onEditEndpoint={(updatedEndpoint) =>
                              editEndpoint(i, updatedEndpoint)
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeEndpoint(i)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Input Parameters
                          </h4>
                          <div className="text-xs bg-gray-50 p-2 rounded border overflow-auto ">
                            <pre className="whitespace-pre-wrap">
                              {(() => {
                                try {
                                  console.log(
                                    "Raw input_parameters:",
                                    endpoint.input_parameters
                                  );
                                  // First, try to parse as JSON
                                  let parsed = JSON.parse(
                                    endpoint.input_parameters
                                  );

                                  // If the parsed result is a string (with escaped characters), parse it again
                                  if (typeof parsed === "string") {
                                    parsed = JSON.parse(parsed);
                                  }

                                  return JSON.stringify(parsed, null, 2);
                                } catch (error) {
                                  console.error(
                                    "Error parsing input_parameters:",
                                    error
                                  );
                                  return endpoint.input_parameters;
                                }
                              })()}
                            </pre>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Output Parameters
                          </h4>
                          <div className="text-xs bg-gray-50 p-2 rounded border overflow-auto ">
                            <pre className="whitespace-pre-wrap">
                              {(() => {
                                try {
                                  console.log(
                                    "Raw output_parameters:",
                                    endpoint.output_parameters
                                  );
                                  // First, try to parse as JSON
                                  let parsed = JSON.parse(
                                    endpoint.output_parameters
                                  );

                                  // If the parsed result is a string (with escaped characters), parse it again
                                  if (typeof parsed === "string") {
                                    parsed = JSON.parse(parsed);
                                  }

                                  return JSON.stringify(parsed, null, 2);
                                } catch (error) {
                                  console.error(
                                    "Error parsing output_parameters:",
                                    error
                                  );
                                  return endpoint.output_parameters;
                                }
                              })()}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              type="submit"
              disabled={!isFormValid()}>
              Update API
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
}
