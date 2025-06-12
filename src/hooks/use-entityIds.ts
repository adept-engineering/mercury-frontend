import { getEntity, getEntityIds } from "@/actions/entity";
import { useQuery } from "@tanstack/react-query";

export function useEntityIds() {
  return useQuery({
    queryKey: ["entity-id"],
    queryFn: async () => {
      return await getEntityIds();
    },
  });
}

export function useEntities(entityID: string) {
  return useQuery({
    queryKey: ["entity", entityID],
    queryFn: async () => {
      return await getEntity(entityID);
    },
    enabled: !!entityID,
  });
}
