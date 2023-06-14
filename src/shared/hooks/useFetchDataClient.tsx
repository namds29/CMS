import { IClient } from "../interfaces/sale-types";
import { useState, useEffect, useContext } from "react";
import saleService from "../../services/sale-service";
import { ReferSource } from "../interfaces/refer-source-types";
import { SaleContext } from "../../pages/sale/context/sale-context";
import utilsService from "../../services/utils-service";

const parseDate = (params: string) => {
  return params
    ? new Date(Date.parse(params!)).toLocaleDateString("en-GB")
    : "";
};

const useFetchDataClient = () => {
  const [data, setData] = useState<IClient[]>();
  const [total, setTotal] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isSuccess } = useContext(SaleContext);

  const fetchClients = async () => {
    const resClient = await saleService.fetchClient(currentPage, pageSize);
    setTotal(resClient.total);
    const resReferSource = await utilsService.fetchReferSource();
    console.log("resClient.data", resClient.data);

    const mapData = resClient.data.map((client: IClient) => {
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
    setData(mapData);
  };
  useEffect(() => {
    fetchClients();
  }, [currentPage, isSuccess]);
  return { data, total, currentPage, setCurrentPage };
};

export default useFetchDataClient;
