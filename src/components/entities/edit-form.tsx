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

const refIDS = ["EDI/X12", "EDI/EDIFACT", "XML", "JSON", "IDOC", "CSV", "API"];

const formSchema = z.object({
    entityName: z.string().min(2, {
        message: "Entity name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    addressLine1: z.string().min(1, {
        message: "Address line 1 is required.",
    }),
    addressLine2: z.string().optional(),
    // phoneNumber: z.string().min(10, {
    //     message: "Please enter a valid phone number.",
    // }),
    zipCode: z.string().min(1, {
        message: "Zip code is required.",
    }),
    city: z.string().min(1, {
        message: "City is required.",
    }),
    country: z.string().min(1, {
        message: "Country is required.",
    }),
    state: z.string().min(1, {
        message: "State is required.",
    }),
    referenceIDs: z.array(
        z.object({
            docType: z.string(),
            id: z.string(),
            groupID: z.string().optional(),
        })
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface EditEntityFormProps {
    defaultValues?: Partial<FormValues>;
    id: string;
}

export function EditEntityForm({ defaultValues, id }: EditEntityFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutate: updateEntity } = useUpdateEntity();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entityName: defaultValues?.entityName || "",
            email: defaultValues?.email || "",
            addressLine1: defaultValues?.addressLine1 || "",
            addressLine2: defaultValues?.addressLine2 || "",
            // phoneNumber: entityData.phone_number || "",
            city: defaultValues?.city || "",
            country: defaultValues?.country || "",
            state: defaultValues?.state || "",
            zipCode: defaultValues?.zipCode || "",
            referenceIDs: defaultValues?.referenceIDs || [],
        },
    });

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        try {
            // TODO: Implement entity update API call
            console.log("Updating entity:", values);
            updateEntity({
                entityId: id,
                name: values.entityName,
                email_address: values.email,
                address1: values.addressLine1,
                address2: values.addressLine2,
                city: values.city,
                country: values.country,
                state: values.state,
                zipcode: values.zipCode,
                referenceIDs: values.referenceIDs,
            });

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
        } finally {
            setIsSubmitting(false);
        }
    }

    const insertNewReferenceID = (refID: string) => {
        const currentRefs = form.getValues("referenceIDs") || [];
        form.setValue(
            "referenceIDs",
            [...currentRefs, { docType: refID, id: "" }],
            { shouldDirty: true, shouldTouch: true }
        );
    };

    return (
        <div className="p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Header section */}
                    <section className="flex items-center justify-between my-6">
                        <div className="flex flex-col items-start gap-4">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => router.back()}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                            <h1 className="text-2xl font-semibold">Edit Entity</h1>
                        </div>
                        <Button
                            className="bg-pink-500 hover:bg-pink-600 text-white"
                            type="submit"
                            disabled={!form.formState.isDirty || isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </section>

                    <section className="space-y-8 rounded-md border p-8">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="entityName"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "entityName">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Entity Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter entity name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "email">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="addressLine1"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "addressLine1">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Address Line 1</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter address line 1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="addressLine2"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "addressLine2">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Address Line 2</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter address line 2" {...field} />
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
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "country">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "state">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter state" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "zipCode">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Zip Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter zip code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<FormValues, "city">;
                                }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter city" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>



                        {/* Reference IDs Section */}
                        <section className="flex items-center justify-between my-6">
                            <h2 className="text-xl font-medium">Reference IDs</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6">
                                        Add Reference ID
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {refIDS.map((ref, index) => (
                                        <DropdownMenuItem
                                            key={index}
                                            onClick={() => insertNewReferenceID(ref)}
                                        >
                                            {ref}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </section>

                        <section className="border rounded-md">
                            <header className="bg-[#F7F7F7] grid grid-cols-2 p-4">
                                <h3 className="font-medium">DOCUMENT FORMAT</h3>
                                <h3 className="font-medium">ID</h3>
                            </header>

                            {form.watch("referenceIDs")?.map((reference, i) => (
                                <div key={i}>
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
                                                            <SelectContent className="text-left w-full">
                                                                {refIDS.map((r, idx) => (
                                                                    <SelectItem key={idx} value={r}>
                                                                        {r}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex gap-2">
                                            <FormField
                                                control={form.control}
                                                name={`referenceIDs.${i}.id`}
                                                render={({
                                                    field,
                                                }: {
                                                    field: ControllerRenderProps<
                                                        FormValues,
                                                        `referenceIDs.${typeof i}.id`
                                                    >;
                                                }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Input placeholder="Enter value" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="p-2 bg-[#F1335A14] h-full w-[50px]"
                                                onClick={() => {
                                                    const currentRefs = form.getValues("referenceIDs");
                                                    form.setValue(
                                                        "referenceIDs",
                                                        currentRefs.filter((_, index) => index !== i),
                                                        { shouldDirty: true }
                                                    );
                                                }}
                                            >
                                                <Trash2 className="text-[#F1335A] h-6 w-6" />
                                            </Button>
                                        </div>
                                    </div>
                                    {i < form.watch("referenceIDs").length - 1 && (
                                        <div className="border-b border-gray-100" />
                                    )}
                                </div>
                            ))}

                            {(!form.watch("referenceIDs") || form.watch("referenceIDs").length === 0) && (
                                <div className="p-8 text-center text-gray-500">
                                    No reference IDs added yet. Click Add Reference ID to get started.
                                </div>
                            )}
                        </section>
                    </section>
                </form>
            </Form>
        </div>
    );
} 