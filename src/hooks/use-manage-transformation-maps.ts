import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransformMap, getTransformationMaps } from "@/actions/transformationMaps";
import { useCurrentSession } from "./use-current-session";

export const useManageTransformationMaps = () => {
    const queryClient = useQueryClient();
    const { session } = useCurrentSession();


    const { data: transformationMaps, isLoading: isLoadingTransformationMaps, error: errorTransformationMaps } = useQuery({
        queryKey: ["transformationMaps"],
        queryFn: () => getTransformationMaps(session?.user?.token ?? ''),
    })

    const { mutate: createTransformationMap, isPending: isCreatingTransformationMap } = useMutation({
        mutationFn: (data: { map_title: string, map_description: string, rules: { rule: string, rule_title: string }[] }) => createTransformMap(session?.user?.token ?? '', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transformationMaps"] })
        }
    })

    return {
        transformationMaps: transformationMaps,
        isLoadingTransformationMaps,
        errorTransformationMaps,
        createTransformationMap,
        isCreatingTransformationMap
    }
}