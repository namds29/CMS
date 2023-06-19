import { useQuery } from "@tanstack/react-query";
import utilsService from "../../services/utils-service";

export const useFetchReferSources = () => {
  const {
    isLoading: isLoadingReferSources,
    error,
    data: referSources,
  } = useQuery({
    queryKey: ["referSources"],
    queryFn: utilsService.fetchReferSource,
  });
  return { referSources, isLoadingReferSources, error };
};

export const useFetchCourses = () => {
  const {
    isLoading,
    error,
    data: courses,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: utilsService.fetchCourses,
  });
  return { courses, isLoading, error };
};

export const useFetchSession = () => {
  const {
    isLoading: isLoadingSessions,
    error,
    data: sessions,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: utilsService.fetchSessions,
  });
  return { sessions, isLoadingSessions, error };
};

export const useFetchCenters = () => {
  const {
    isLoading: isLoadingCenters,
    error,
    data: centers,
  } = useQuery({
    queryKey: ["centers"],
    queryFn: utilsService.fetchCenters,
  });
  return { centers, isLoadingCenters, error };
};
