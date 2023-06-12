import { IClient } from "../interfaces/sale-types";
import saleService from "../../services/sale-service";
import { ReferSource } from "../interfaces/refer-source-types";
import { useQuery } from "@tanstack/react-query";

const parseDate = (params: string) => {
  return params
    ? new Date(Date.parse(params!)).toLocaleDateString("en-GB")
    : "";
};
const fetchClients = async () => {
  const resClient = await saleService.fetchClient(1, 20);
  console.log(resClient);
  
  const resReferSource = await saleService.fetchReferSource();

  const mapData = resClient.map((client: IClient) => {
    const createdAt = parseDate(client.createdAt);
    const dob = parseDate(client.dateOfBirth!);
    const lastCareTime = parseDate(client.lastCareTime!);
    const matchingReferSource = resReferSource.find(
      (item: ReferSource) => item.id === client.referSource
    );
    return matchingReferSource
      ? {
          ...client,
          referSource: matchingReferSource.name,
          createdAt: createdAt,
          dateOfBirth: dob,
          lastCareTime: lastCareTime,
        }
      : { ...client };
  });
  return mapData;
};

const useFetchDataClient = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 360000, // cache for 1 hour
  });

  return { isLoading, isError, data, error };
};

export default useFetchDataClient;
