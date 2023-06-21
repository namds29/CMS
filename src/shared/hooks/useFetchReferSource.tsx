import utilsService from "../../services/utils-service";
import { useEffect, useState } from "react";
import { ReferSource } from "../interfaces/utils-types";
const useFetchReferSource = () => {
  const [referSources, setReferSources] = useState<ReferSource[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const fetchReferSource = async () => {
    const res = await utilsService.fetchReferSource();
    setReferSources(res);
  };
  useEffect(()=>{
    fetchReferSource()
  },[])
  return { referSources };
};

export default useFetchReferSource;
