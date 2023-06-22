import { useQuery } from "@tanstack/react-query";
import dashboardService from "../../services/dashboard-service";

export const useFetchSaleTodos = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["saleTodos"],
    queryFn: dashboardService.fetchSaleToDo,
  });
  return { data, isLoading, error };
};
