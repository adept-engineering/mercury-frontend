import { useQuery ,useMutation} from "@tanstack/react-query";
import { getTransformationMaps ,createMap, deleteMap, createMapRules, deleteMapRules, editMapRules} from "@/actions/maps";
import { useCurrentSession } from "./use-current-session";

export const useMaps = () => {
  const { session } = useCurrentSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["maps"],
    queryFn: () => getTransformationMaps(session?.user?.token ?? ""),
  });
  const filterMapsByType = (
    type: "TRANSFORMATION" | "RESEARCH" | "COMPLIANCE"
  ) => {
    return data?.filter((map: any) => map.map_type === type);
  };
  const filterMapsByIds = (id: string) => {
    return data?.find((map: any) => map.map_id === id);
  };
  const { mutate: createMapMutation, isPending: isCreatingMap } = useMutation({
    mutationFn: (data: { map_name: string; map_description: string; map_type: string; maps_rules: { rule: string; rule_title: string; position: number; }[]; }) => createMap(session?.user?.token ?? "", data),
  });
  const { mutate: deleteMapMutation, isPending: isDeletingMap } = useMutation({
    mutationFn: (data: { mapId: string; maps_id: string }) => deleteMap(session?.user?.token ?? "", data.mapId, data.maps_id),
  });
  
  return {
    maps: data,
    isLoading,
    error,
    filterMapsByType,
    filterMapsByIds,
    createMapMutation,
    isCreatingMap,
    deleteMapMutation,
    isDeletingMap,
  };
};


export const useMapRules = () => {
  const { session } = useCurrentSession();
  const { mutate: createMapRulesMutation, isPending: isCreatingMapRules } = useMutation({
    mutationFn: (data: { mapId: string; map_id: string; ruleTitle: string; rule: string; position: number }) => createMapRules(session?.user?.token ?? "", data.mapId, data),
  });
  const { mutate: deleteMapRulesMutation, isPending: isDeletingMapRules } = useMutation({
    mutationFn: (data: { mapId: string; id: string }) => deleteMapRules(session?.user?.token ?? "", data.mapId, data.id),
  });
  const { mutate: editMapRulesMutation, isPending: isEditingMapRules } = useMutation({
    mutationFn: (data: { mapId: string; ruleTitle: string; rule: string; position: number; id: string }) => editMapRules(session?.user?.token ?? "", data.mapId, data),
  });
  return {
    createMapRulesMutation,
    isCreatingMapRules,
    deleteMapRulesMutation,
    isDeletingMapRules,
    editMapRulesMutation,
    isEditingMapRules,
  };
}
