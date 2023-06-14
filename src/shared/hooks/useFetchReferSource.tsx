import { useQuery } from "@tanstack/react-query";
import utilsService from "../../services/utils-service";

const useFetchReferSource = () => {
  const { isLoading, isError, data: referSources, error } = useQuery({
    queryKey: ["referSource"],
    queryFn: utilsService.fetchReferSource,
  });

  return { isLoading, isError, referSources, error };
};

export default useFetchReferSource;
