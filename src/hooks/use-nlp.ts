import { useQuery } from "@tanstack/react-query";
import { getAllFormats, getVersionByFormat, getTransactionSetByVersion, getSegmentByTransactionSet, getElementBySegment } from "../actions/nlp";

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

export const useGetElementBySegment = (segment: string, agency: string) => {
    return useQuery({
        queryKey: ["element", segment, agency],
        queryFn: () => getElementBySegment(segment, agency),
        enabled: !!segment && !!agency,
    });
}

