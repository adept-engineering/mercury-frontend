import { GraphData } from "@/components/graph-visualization/graph";
import { axiosLocal, axiosPython } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getSenders = async () => {
  const response = await axiosPython.get(`/graph/senders`);
  return response.data.senders;
};

export const useSenders = () => {
  return useQuery({
    queryKey: ["senders"],
    queryFn: () => getSenders(),
  });
};

export const getGraph = async (sender_id: string) => {
  const response = await axiosPython.get(`/graph/data/${sender_id}`);
  return response.data;
};

export const useGraph = (sender_id: string) => {
  return useQuery<GraphData>({
    queryKey: ["graph", sender_id],
    queryFn: () => getGraph(sender_id),
    enabled: !!sender_id,
  });
};

export const getTransactionGraph = async (info_id: string) => {
  const response = await axiosPython.get(`/graph/transaction/${info_id}`);
  return response.data;
};

export const useTransactionGraph = (info_id: string) => {
  return useQuery<GraphData>({
    queryKey: ["transaction-graph", info_id],
    queryFn: () => getTransactionGraph(info_id),
    enabled: !!info_id,
  });
};
