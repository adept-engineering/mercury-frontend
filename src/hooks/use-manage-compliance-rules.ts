import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComplianceRules, getComplianceRuleById, createComplianceRule, updateComplianceRule, deleteComplianceRule } from "@/actions/compliance-rules";
import { useCurrentSession } from "./use-current-session";
import { useToast } from "./use-toast";

export function useManageComplianceRules() {
    const queryClient = useQueryClient();

    const { session } = useCurrentSession();

    // const { data: complianceRules, isLoading: isLoadingComplianceRules, error: errorComplianceRules } = useQuery({
    //     queryKey: ["complianceRules"],
    //     queryFn: () => getComplianceRules(session?.user?.token ?? ""),
    // })

    const { mutate: createComplianceRuleMutation } = useMutation({
        mutationFn: (data: { rule: string, rule_title: string }) => createComplianceRule(data, session?.user?.token ?? ""),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["complianceRules"] });

        },
        onError: (error) => {
            throw error;
        },
    })

    const { mutate: updateComplianceRuleMutation } = useMutation({
        mutationFn: ({ data, complianceRuleId }: { data: { rule: string, rule_title: string }, complianceRuleId: string }) => updateComplianceRule(data, session?.user?.token ?? "", complianceRuleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["complianceRules"] });
        },
        onError: (error) => {
            throw error;
        },
    })

    const { mutate: deleteComplianceRuleMutation } = useMutation({
        mutationFn: (complianceRuleId: string) => deleteComplianceRule(session?.user?.token ?? "", complianceRuleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["complianceRules"] });
        },
        onError: (error) => {
            throw error;
        },
    })
    //  complianceRules, isLoadingComplianceRules, errorComplianceRules,
    return {  createComplianceRuleMutation, updateComplianceRuleMutation, deleteComplianceRuleMutation }

}

export function useGetComplianceRuleById( complianceRuleId: string) {
    const { session } = useCurrentSession();
    const { data: complianceRule, isLoading: isLoadingComplianceRule, error: errorComplianceRule } = useQuery({
        queryKey: ["complianceRule", complianceRuleId],
        queryFn: () => getComplianceRuleById(session?.user?.token ?? "", complianceRuleId),
    })
    return { complianceRule, isLoadingComplianceRule, errorComplianceRule }
}