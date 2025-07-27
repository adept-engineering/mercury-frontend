import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createResearchMap, getResearchMaps } from "@/actions/researchMaps";
import { useCurrentSession } from "./use-current-session";

export const useManageResearchMaps = () => {
  const queryClient = useQueryClient();
  const { session } = useCurrentSession();

  const {
    data: researchMaps,
    isLoading: isLoadingResearchMaps,
    error: errorResearchMaps,
  } = useQuery({
    queryKey: ["ResearchMaps"],
    queryFn: () => getResearchMaps(session?.user?.token ?? ""),
  });

  const {
    mutate: createResearchMapMutation,
    isPending: isCreatingResearchMap,
  } = useMutation({
    mutationFn: (data: {
      map_title: string;
      map_description: string;
      rules: { rule: string; rule_title: string }[];
    }) => createResearchMap(session?.user?.token ?? "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ResearchMaps"] });
    },
  });

  return {
    researchMaps,
    isLoadingResearchMaps,
    errorResearchMaps,
    createResearchMap: createResearchMapMutation,
    isCreatingResearchMap,
  };
};
