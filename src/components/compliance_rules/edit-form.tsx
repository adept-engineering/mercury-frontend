"use client"
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
import { updateComplianceRule } from "@/actions/compliance-rules";
import { ComplianceRuleSchema as formSchema } from "@/lib/schema";
import { useCurrentSession } from "@/hooks/use-current-session";



export function EditComplianceRuleForm({complianceRuleId,defaultValues}: {complianceRuleId: string,defaultValues: z.infer<typeof formSchema>}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
        defaultValues,
  });

  const { toast } = useToast();
  const router = useRouter();
  const { session } = useCurrentSession();
  const { mutate } = useMutation({
    mutationFn:(data: z.infer<typeof formSchema>) => updateComplianceRule(data, session?.user?.token ?? "",complianceRuleId),
    onSuccess: () => {
      toast({
        title: "Successfully edited Compliance Rule",
      });
      router.push("/compliance-rules");

    },
    onError: (error) => {
      toast({
        title: "Failed to edit compliance rule",
        variant: "destructive",
      });
      console.error("Error editing compliance rule:", error);
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
          name="rule_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter rule title"  {...field} />
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

        <Button type="submit" className="">Submit</Button>
      </form>
    </Form>
  );
}
