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

export function useTransactionNames(entitydttbl_id: string) {
  return useQuery({
    queryKey: ["trnsaction-names", entitydttbl_id],
    queryFn: async () => {
      return [810, 997, 856, 850];
    },
    enabled: !!entitydttbl_id,
  });
}
