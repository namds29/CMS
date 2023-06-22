import { IDetailFormClient } from "../interfaces/sale-types";
import saleService from "../../services/sale-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchDataQueryClient = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["clients"],
    queryFn: saleService.fetchClient,
  });
  return { data, isLoading, error };
};

export const useCreateDataClient = () => {
  const queryClient = useQueryClient();
  const { mutate: createClient } = useMutation({
    mutationFn: (client: IDetailFormClient) => {
      return saleService.createClient(client);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["clients"]);
    },
  });
  return { createClient };
};

export const useUpdateStatusAddZalo = () => {
  const queryClient = useQueryClient();
  const { mutate: createClient } = useMutation({
    mutationFn: (client: IDetailFormClient) => {
      return saleService.createClient(client);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["clients"]);
    },
  });
  return { createClient };
};
