import { useQuery } from "@tanstack/react-query";
import saleService from "../../services/sale-service";

const useFetchReferSource = () => {
  const { isLoading, isError, data: referSources, error } = useQuery({
    queryKey: ["referSource"],
    queryFn: saleService.fetchReferSource,
    staleTime: 360000, // cache for 1 hour
  });

  return { isLoading, isError, referSources, error };
};

export default useFetchReferSource;
