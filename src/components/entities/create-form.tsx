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
import { useCreateEntity } from "@/hooks/use-entity";
import { useRouter } from "next/navigation";
import { refIDS } from "@/lib/constants";




const organizationTypes = [
  { value: "COMPANY", label: "Company" },
  { value: "PARTNER", label: "Partner" }
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Entity name must be at least 2 characters.",
  }),
  email_address: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address1: z.string().min(1, {
    message: "Address line 1 is required.",
  }),
  address2: z.string().optional(),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  zipcode: z.string().min(1, {
    message: "Zipcode is required.",
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
      organization_type: "COMPANY",
      referenceIDs: [],
    },
  });
  const { mutate: createEntity } = useCreateEntity();
  const router = useRouter();
  function onSubmit(values: FormValues) {
    console.log(values);
    createEntity(values);
    router.push("/entities");
  }

  const insertNewRefrenceID = (refID: string) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* header section before the main form */}
        <section className="flex items-center justify-between my-6">
          <h1 className="text-2xl font-semibold"></h1>
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Confirm
          </Button>
        </section>

        <section className="space-y-8 rounded-md border p-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
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
              name="email_address"
              render={({ field }) => (
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
              name="address1"
              render={({ field }) => (
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
              name="address2"
              render={({ field }) => (
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
              render={({ field }) => (
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
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter zipcode" {...field} />
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
                    <Input placeholder="Enter country" {...field} />
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
                    <FormControl  className="w-full">
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
  );
}
