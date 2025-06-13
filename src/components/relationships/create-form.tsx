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

import {
  useEntities,
  useEntityIds,
  useTransactionNames,
} from "@/hooks/use-entityIds";
import { EntityTbl } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createRelationshipController } from "@/actions/relationships";

const formSchema = z.object({
  entityid_id_sender: z.string(),
  entityid_id_receiver: z.string(),
  id: z.number(),
  transaction_name: z.string(),
  sender_id: z.string(),
  receiver_id: z.string(),
  std_version: z.string(),
});

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

  const { toast } = useToast();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createRelationshipController,
    onSuccess: (data) => {
      toast({
        title: "Successfully created Relationship",
      });
      router.refresh();
      console.log("Relationship created successfully:", data);
    },
    onError: (error) => {
      toast({
        title: "Failed to create",
      });
      console.error("Error creating relationship:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const { data: entityIds } = useEntityIds();

  const { data: senderEntity } = useEntities(form.watch("entityid_id_sender"));
  const { data: receiverEntity } = useEntities(
    form.watch("entityid_id_receiver")
  );

  const { data: transactionNames } = useTransactionNames("test");

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
                    <SelectTrigger className="!h-[50px] w-full">
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
                    <SelectTrigger className="!h-[50px] w-full">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="!h-[50px] w-full">
                    <SelectValue placeholder="Select transaction name" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionNames &&
                    transactionNames.map((name: number) => (
                      <SelectItem key={name} value={name.toString()}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
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
                    <SelectTrigger className="!h-[50px] w-full">
                      <SelectValue placeholder="Select sender ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {senderEntity &&
                      senderEntity
                        .filter(
                          (sender: EntityTbl) =>
                            sender.entityid_id ===
                            form.getValues("entityid_id_sender")
                        )
                        .map((entity: EntityTbl) => (
                          <SelectItem
                            key={entity.reference_id}
                            value={entity.reference_id}
                          >
                            {entity.reference_id}
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
                    <SelectTrigger className="!h-[50px] w-full">
                      <SelectValue placeholder="Select receiver ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {receiverEntity &&
                      receiverEntity
                        .filter(
                          (receiver: EntityTbl) =>
                            receiver.entityid_id ===
                            form.getValues("entityid_id_receiver")
                        )
                        .map((receiver: EntityTbl) => (
                          <SelectItem
                            key={receiver.reference_id}
                            value={receiver.reference_id}
                          >
                            {receiver.reference_id}
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
              <FormControl>
                <Input type="text" placeholder="Enter version" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
