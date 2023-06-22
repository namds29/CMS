import { useQuery } from "@tanstack/react-query";
import studentsService from "../../services/students-service";

export const useFetchStudents = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: studentsService.fetchStudents,
  });
  return { data, isLoading, error };
};
