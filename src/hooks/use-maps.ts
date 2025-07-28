import { useQuery } from "@tanstack/react-query";
import { getTransformationMaps } from "@/actions/transformationMaps";
import { useCurrentSession } from "./use-current-session";

export const useMaps = () => {
    const {session} = useCurrentSession();
    const { data, isLoading, error } = useQuery({
        queryKey: ["maps"],
        queryFn: () => getTransformationMaps(session?.user?.token ?? ""),
    });
    const filterMapsByType = (type: "TRANSFORMATION" | "RESEARCH"|"COMPLIANCE") => {
        return data?.filter((map: any) => map.map_type === type);
    }
    const filterMapsByIds = (id: string) => {
        return data?.find((map: any) => map.map_id === id);
    }
    return {
        maps: data,
        isLoading,
        error,
        filterMapsByType,
        filterMapsByIds,
    };
}