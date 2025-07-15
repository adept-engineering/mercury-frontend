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
import { refIDS } from "@/lib/constants";


const organizationTypes = [
    { value: "COMPANY", label: "Company" },
    { value: "PARTNER", label: "Partner" }
];

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
    organization_type: z.enum(["COMPANY", "PARTNER"], {
        required_error: "Please select an organization type.",
    }),
    referenceIDs: z.array(
        z.object({
            docType: z.string(),
            interchangeNumber: z.string().optional(),
            groupID: z.string().optional(),
            applicationID: z.string().optional(),
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
            city: defaultValues?.city || "",
            country: defaultValues?.country || "",
            state: defaultValues?.state || "",
            zipCode: defaultValues?.zipCode || "",
            organization_type: defaultValues?.organization_type || "COMPANY",
            referenceIDs: defaultValues?.referenceIDs || [],
        },
    });

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        try {
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
                organization_type: values.organization_type,
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
        const newRef = {
            docType: refID,
            interchangeNumber: "",
            groupID: "",
            applicationID: "",
        };
        const newRefs = [...currentRefs, newRef];
        form.setValue("referenceIDs", newRefs, { shouldValidate: true });
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
                            <div></div>
                        </div>

                        {/* Reference IDs Section */}
                        <section className="flex items-center justify-between my-6">
                            <h1 className="text-xl font-medium">Reference IDs</h1>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6">
                                        Add Reference ID
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {refIDS?.map((ref: any, index: any) => (
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
                                                            name={`referenceIDs.${i}.interchangeNumber`}
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
                                                            className="p-2 bg-[#F1335A14] h-full w-[50px]"
                                                            onClick={() => {
                                                                const currentRefs = form.getValues("referenceIDs");
                                                                form.setValue(
                                                                    "referenceIDs",
                                                                    currentRefs.filter((_, index) => index !== i)
                                                                );
                                                            }}
                                                        >
                                                            <Trash2 className="text-[#F1335A] h-6 w-6" />
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
                                                        className="p-2 bg-[#F1335A14] h-full w-[50px]"
                                                        onClick={() => {
                                                            const currentRefs = form.getValues("referenceIDs");
                                                            form.setValue(
                                                                "referenceIDs",
                                                                currentRefs.filter((_, index) => index !== i)
                                                            );
                                                        }}
                                                    >
                                                        <Trash2 className="text-[#F1335A] h-6 w-6" />
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
                    </section>
                </form>
            </Form>
        </div>
    );
} 