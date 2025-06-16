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
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
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

export function EntryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityName: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      phoneNumber: "",
      city: "",
      country: "",
      state: "",
      referenceIDs: [],
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  const insertNewRefrenceID = (refID: string) => {
    const currentRefs = form.getValues("referenceIDs") || [];
    form.setValue(
      "referenceIDs",
      [...currentRefs, { docType: refID, id: "" }],
      { shouldDirty: false, shouldTouch: false }
    );
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
              name="phoneNumber"
              render={({
                field,
              }: {
                field: ControllerRenderProps<FormValues, "phoneNumber">;
              }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
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
                {refIDS.map((ref, index) => (
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
              <h2 className="font-medium">ID</h2>
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
                            defaultValue={refIDS[0]}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full !h-[50px]">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="text-left w-full ">
                              {refIDS.map((r, i) => (
                                <SelectItem key={i} value={r}>
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
                          currentRefs.filter((_, index) => index !== i)
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
          </section>
        </section>
      </form>
    </Form>
  );
}
