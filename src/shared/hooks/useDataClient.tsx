import { IClient, ICreateFormClient } from "../interfaces/sale-types";
import saleService from "../../services/sale-service";
import { parseDate } from "../utils/parseDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchClients = async () => {
  const resClient = await saleService.fetchClient(1, 12);
  console.log("resClient.data", resClient);
  const mapData = resClient.map((client: IClient) => {
    const createdAt = parseDate(client.createdAt);
    const dob = parseDate(client.dateOfBirth!);
    const lastCareTime = parseDate(client.lastCareTime!);

    return {
      ...client,
      createdAt: createdAt,
      dateOfBirth: dob,
      lastCareTime: lastCareTime,
    };
  });
  return mapData;
};

export const useFetchDataQueryClient = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useCreateDataClient = () => {
  const queryClient = useQueryClient();
  const { isSuccess, mutate: createClient } = useMutation({
    mutationFn: (client: ICreateFormClient) => {
      return saleService.createClient(client);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["clients"]);
    },
  });
  return { isSuccess, createClient };
};
