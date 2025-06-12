import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getEntityIds } from "@/actions/entity";
import { useEntities, useEntityIds } from "@/hooks/use-entityIds";

const formSchema = z.object({
  entityid_id_sender: z.string(),
  entityid_id_receiver: z.string(),
  id: z.number(),
  transaction_name: z.string(),
  sender_id: z.string(),
  receiver_id: z.string(),
  std_version: z.string(),
});

const dummySenders = [
  { id: "6303207447", name: "Company A" },
  { id: "925485US00", name: "Company B" },
];

const dummyReceivers = [
  { id: "6303207447", name: "Company A" },
  { id: "925485US00", name: "Company B" },
];

const dummyVersions = ["004010", "005010", "006010"];

export function RelationshipForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityid_id_sender: "",
      entityid_id_receiver: "",
      id: 1,
      transaction_name: "",
      sender_id: "",
      receiver_id: "",
      std_version: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const { data: entityIds } = useEntityIds();

  const { data: senderEntity } = useEntities(form.watch("entityid_id_sender"));
  const { data: receiverEntity } = useEntities(
    form.watch("entityid_id_sender")
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="entityid_id_sender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sender Entity</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sender entity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {entityIds &&
                      entityIds.map((sender: string, i: any) => (
                        <SelectItem key={i} value={sender}>
                          {sender}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entityid_id_receiver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver Entity</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select receiver entity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {entityIds &&
                      entityIds
                        .filter(
                          (receiver: string) =>
                            receiver !== form.watch("entityid_id_sender")
                        )
                        .map((receiver: string, i: any) => (
                          <SelectItem key={i} value={receiver}>
                            {receiver}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="transaction_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Auto-generated"
                  value={`${form.watch("sender_id")}_${form.watch(
                    "receiver_id"
                  )}_${field.value}`}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="sender_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sender ID</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sender ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dummySenders.map((sender) => (
                      <SelectItem key={sender.id} value={sender.id}>
                        {sender.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receiver_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver ID</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select receiver ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dummyReceivers.map((receiver) => (
                      <SelectItem key={receiver.id} value={receiver.id}>
                        {receiver.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="std_version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standard Version</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select version" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dummyVersions.map((version) => (
                    <SelectItem key={version} value={version}>
                      {version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
