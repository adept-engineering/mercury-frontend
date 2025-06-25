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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createComplianceRuleController } from "@/actions/compliance-rules";

const formSchema = z.object({
  entityid_relationship_id: z.string(),
  rule: z.string(),
  rule_title: z.string(),
});

export function ComplianceRuleForm({
  entityid_relationship_id,
}: {
  entityid_relationship_id: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityid_relationship_id,
      rule: "",
      rule_title: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createComplianceRuleController,
    onSuccess: () => {
      toast({
        title: "Successfully created Compliance Rule",
      });
      router.refresh();

    },
    onError: (error) => {
      toast({
        title: "Failed to create compliance rule",
        variant: "destructive",
      });
      console.error("Error creating compliance rule:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="entityid_relationship_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter relationship ID"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rule_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter rule title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule</FormLabel>
              <FormControl>
                <Input placeholder="Enter rule description" {...field} />
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
