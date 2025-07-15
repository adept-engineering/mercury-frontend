"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import * as z from "zod";
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
import { ChevronDown, Trash2, ArrowLeft } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectTrigger,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useUpdateEntity } from "@/hooks/use-entity";
import { refIDS, organizationTypes } from "@/lib/constants";
import { EntitySchema as formSchema } from "@/lib/schema";
import { EntityData } from "@/lib/types";





type FormValues = z.infer<typeof formSchema>;

interface EditEntityFormProps {
    defaultValues?: Partial<FormValues>;
    id: string;
}

export function EditEntityForm({ defaultValues, id }: EditEntityFormProps) {
    const router = useRouter();
    const { mutate: updateEntity } = useUpdateEntity();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    async function onSubmit(values: FormValues) {
        console.log(values);
        const apiData: EntityData = {
            ...values,
            referenceIDs: values.referenceIDs.map((ref) => ({
                docType: ref.docType,
                extn: [
                    ref.interchangeID && {
                        reference_name: "Interchange ID",
                        reference_value: ref.interchangeID ?? "",
                    },
                    ref.groupID && {
                        reference_name: "Group ID",
                        reference_value: ref.groupID ?? "",
                    },
                    ref.applicationID && {
                        reference_name: "Application ID",
                        reference_value: ref.applicationID ?? "",
                    },
                ].filter((item): item is { reference_name: string; reference_value: string } => !!item),
            })),
        };
        try {
            console.log("Updating entity:", values);
            updateEntity({ entityData: apiData, entityId: id });

            toast({
                title: "Success",
                description: "Entity updated successfully",
            });

            router.push("/entities");
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to update entity",
                variant: "destructive",
            });
        }
    }

    const insertNewRefrenceID = (refID: string) => {
        const currentRefs = form.getValues("referenceIDs") || [];
        const newRef = {
            docType: refID,
            interchangeID: "",
            groupID: "",
            applicationID: "",
        };
        const newRefs = [...currentRefs, newRef];
        form.setValue("referenceIDs", newRefs, { shouldValidate: true });
    };

    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* header section before the main form */}
        

        

        <section className="space-y-8 rounded-md border p-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Entity Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Address Line 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Address Line 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Zipcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="organization_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}

                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organizationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>

          <section className="flex items-center justify-between my-6">
            <h1 className="text-xl font-medium">Reference IDs</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                  Add Reference ID
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {refIDS?.map((ref: any, index: any) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => insertNewRefrenceID(ref)}
                  >
                    {ref}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          <section className="border rounded-md">
            <header className="bg-[#F7F7F7] grid grid-cols-2 p-4">
              <h2 className="font-medium">DOCUMENT FORMAT</h2>
              <h2 className="font-medium">REFERENCE DETAILS</h2>
            </header>

            {form.watch("referenceIDs")?.map((reference, i) => (
              <div key={`ref-${i}-${reference.docType}`}>
                <div className="grid grid-cols-2 gap-4 p-4">
                  <FormField
                    control={form.control}
                    name={`referenceIDs.${i}.docType`}
                    render={({
                      field,
                    }: {
                      field: ControllerRenderProps<
                        FormValues,
                        `referenceIDs.${typeof i}.docType`
                      >;
                    }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full !h-[50px]">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="text-left w-full ">
                              {refIDS?.map((r: any, idx: any) =>
                              (
                                <SelectItem key={idx} value={r}>
                                  {r}
                                </SelectItem>
                              )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    {reference.docType === "EDI/X12" || reference.docType === "EDI/EDIFACT" ? (
                      <>
                        <div className="flex gap-2">
                          <FormField
                            control={form.control}
                            name={`referenceIDs.${i}.interchangeID`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input placeholder="Interchange ID" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="p-2 bg-primary/10 h-full w-[50px]"
                            onClick={() => {
                              const currentRefs = form.getValues("referenceIDs");
                              form.setValue(
                                "referenceIDs",
                                currentRefs.filter((_, index) => index !== i)
                              );
                            }}
                          >
                            <Trash2 className="text-primary h-6 w-6" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <FormField
                            control={form.control}
                            name={`referenceIDs.${i}.groupID`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input placeholder="Group ID" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="w-[50px]"></div>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`referenceIDs.${i}.applicationID`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input placeholder="Application ID" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="p-2 bg-primary/10 h-full w-[50px]"
                          onClick={() => {
                            const currentRefs = form.getValues("referenceIDs");
                            form.setValue(
                              "referenceIDs",
                              currentRefs.filter((_, index) => index !== i)
                            );
                          }}
                        >
                          <Trash2 className="text-primary h-6 w-6" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {i < form.watch("referenceIDs").length - 1 && (
                  <div className="border-b border-gray-100" />
                )}
              </div>
            ))}
          </section>
          <Button
            className="bg-primary hover:bg-primary/90 text-white"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Confirm
          </Button>
        </section>
      </form>
    </Form>
    );
} 