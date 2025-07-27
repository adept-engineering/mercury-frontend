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
import { ChevronDown, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetAllFormats } from "@/hooks/use-nlp";
import { useCheckIfTenantHasCompanyEntity, useCreateEntity } from "@/hooks/use-entity";
import { useRouter } from "next/navigation";
import { refIDS, organizationTypes } from "@/lib/constants";
import { EntityData } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { EntitySchema as formSchema } from "@/lib/schema";
import { useCurrentSession } from "@/hooks/use-current-session";








type FormValues = z.infer<typeof formSchema>;

export function EntryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email_address: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      zipcode: "",
      organization_type: "PARTNER",
      referenceIDs: [],
    },
  });
 
  const { mutate: createEntity } = useCreateEntity();
  const { session } = useCurrentSession();
  const { data: hasCompany } = useCheckIfTenantHasCompanyEntity(session?.user?.token ?? "");
  const router = useRouter();
  console.log(hasCompany);
  
  // Custom validation function to check only required fields
  const isFormValid = () => {
    const values = form.getValues();
    const hasName = values.name && values.name.length >= 2;
    const hasEmail = values.email_address && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email_address);
    const hasOrgType = values.organization_type && values.organization_type.length > 0;
    const hasReferenceIDs = values.referenceIDs && values.referenceIDs.length > 0;
    
    return hasName && hasEmail && hasOrgType && hasReferenceIDs;
  };
  
  function onSubmit(values: FormValues) {
    console.log(values);
    const apiData: EntityData = {
      ...values,
      address1: values.address1 ?? "",
      address2: values.address2 ?? "",
      city: values.city ?? "",
      country: values.country ?? "",
      state: values.state ?? "",
      zipcode: values.zipcode ?? "",
      referenceIDs: values.referenceIDs.map((ref) => ({
        docType: ref.docType,
        extn: [
          ref.InterchangeID && {
            reference_name: "InterchangeID",
            reference_value: ref.InterchangeID ?? "",
          },
          ref.GroupID && {
            reference_name: "GroupID",
            reference_value: ref.GroupID ?? "",
          },
          ref.ApplicationID && {
            reference_name: "ApplicationID",
            reference_value: ref.ApplicationID ?? "",
          },
        ].filter((item): item is { reference_name: string; reference_value: string } => !!item),
      })),
    };
    try {
      createEntity(apiData);
      toast({
        title: "Success",
        description: "Entity created successfully",
        variant: "default",
      });
      router.push("/entities");
    } catch (error) {
      console.error("Error creating entity:", error);
      toast({
        title: "Error",
        description: "Failed to create entity. Please try again.",
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
                    <Input placeholder="Enter Zip code" {...field} />
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
                      {organizationTypes.filter((type) => type.value !== "COMPANY" || !hasCompany).map((type) => (
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
            <h1 className="text-lg font-medium">Reference IDs</h1>
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
              <h2 className="font-medium text-sm">DOCUMENT FORMAT</h2>
              <h2 className="font-medium text-sm">REFERENCE DETAILS</h2>
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
                            <SelectTrigger className="w-full !h-[40px]">
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
                            name={`referenceIDs.${i}.InterchangeID`}
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
                            name={`referenceIDs.${i}.GroupID`}
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
                          name={`referenceIDs.${i}.ApplicationID`}
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
            disabled={!isFormValid()}
          >
            Confirm
          </Button>
        </section>
      </form>
    </Form>
  );
}
