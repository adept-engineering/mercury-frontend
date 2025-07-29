"use client";

import { useState } from "react";
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
import { AddEndpointDialog } from "./add-endpoint-dialog";
import { EditEndpointDialog } from "./edit-endpoint-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface Endpoint {
  url: string;
  input_parameters: string;
  output_parameters: string;
  is_default: boolean;
  version: number;
}

export function ApiRegistrationForm() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const { createApiRegistrationMutation, isCreatingApiRegistration } =
    useManageApiRegistration();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { session } = useCurrentSession();
  const router = useRouter();

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
      createApiRegistrationMutation({ ...values, endpoints });

      toast({
        title: "Success",
        description: "API registered successfully",
        variant: "success",
      });
      router.push("/api-registration");
    } catch (error) {
      console.error("Error creating API:", error);
      toast({
        title: "Error",
        description: "Failed to register API. Please try again.",
        variant: "destructive",
      });
    }
  }

  const addNewEndpoint = (endpoint: Endpoint) => {
    // Since only one endpoint is allowed, it's automatically the default
    const endpointWithDefault = {
      ...endpoint,
      is_default: true,
    };
    setEndpoints([endpointWithDefault]);
  };

  const removeEndpoint = (index: number) => {
    const newEndpoints = endpoints.filter((_, i) => i !== index);

    // If we're removing the default endpoint and there are other endpoints, make the first one default
    if (endpoints[index].is_default && newEndpoints.length > 0) {
      newEndpoints[0].is_default = true;
    }

    setEndpoints(newEndpoints);
  };

  const editEndpoint = (index: number, updatedEndpoint: Endpoint) => {
    const newEndpoints = endpoints.map((endpoint, i) =>
      i === index ? updatedEndpoint : endpoint
    );
    setEndpoints(newEndpoints);
  };

  const setDefaultEndpoint = (index: number) => {
    const newEndpoints = endpoints.map((endpoint, i) => ({
      ...endpoint,
      is_default: i === index,
    }));
    setEndpoints(newEndpoints);
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
                {endpoints.length === 0 && (
                  <AddEndpointDialog
                    onAddEndpoint={addNewEndpoint}
                    existingEndpointsCount={endpoints.length}
                  />
                )}
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
                            Default
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
                          <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto max-h-20">
                            {endpoint.input_parameters}
                          </pre>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Output Parameters
                          </h4>
                          <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto max-h-20">
                            {endpoint.output_parameters}
                          </pre>
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
              Register API
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
}
