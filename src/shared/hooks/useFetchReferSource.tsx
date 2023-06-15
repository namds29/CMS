import utilsService from "../../services/utils-service";
import { ReferSource } from "../interfaces/refer-source-types";
import { useEffect, useState } from "react";
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
