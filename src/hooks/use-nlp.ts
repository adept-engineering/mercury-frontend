import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFormats, getVersionByFormat, getTransactionSetByVersion, getSegmentByTransactionSet, getElementBySegment, setElementBySegment } from "../actions/nlp";
import { useCurrentSession } from "./use-current-session";

export const useGetAllFormats = () => {
    return useQuery({
        queryKey: ["formats"],
        queryFn: getAllFormats,
    });
}

export const useGetVersionByFormat = (format: string) => {
    return useQuery({
        queryKey: ["version", format],
        queryFn: () => getVersionByFormat(format),
        enabled: !!format,
    });
}

export const useGetTransactionSetByVersion = (version: string, agency: string) => {
    return useQuery({
        queryKey: ["transactionSet", version, agency],
        queryFn: () => getTransactionSetByVersion(version, agency),
        enabled: !!version && !!agency,
    });
}

export const useGetSegmentByTransactionSet = (transactionSet: string, version: string, agency: string) => {
    return useQuery({
        queryKey: ["segment", transactionSet, version, agency],
        queryFn: () => getSegmentByTransactionSet(transactionSet, version, agency),
        enabled: !!transactionSet && !!version && !!agency,
    });
}

export const useGetElementBySegment = (segment: string, version: string, agency: string) => {
    const { session } = useCurrentSession();
    const tenant_id = session?.user?.tenantId;
    return useQuery({
        queryKey: ["element", segment, version, agency],
        queryFn: () => getElementBySegment(segment, version, agency, tenant_id??""),
        enabled: !!segment && !!agency,
    });
}

export const useSetElementBySegment = (segment: string, version: string, agency: string) => {
    const { session } = useCurrentSession();
    const tenant_id = session?.user?.tenantId;
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (elements: any) => setElementBySegment(segment, version, agency, tenant_id??"", elements),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["element", segment, version, agency] });
        },
    });
}

