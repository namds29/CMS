import { IClient } from "../interfaces/sale-types";
import { useState, useEffect, useContext } from "react";
import saleService from "../../services/sale-service";
import { ReferSource } from "../interfaces/refer-source-types";
import { SaleContext } from "../../pages/sale/context/sale-context";
import utilsService from "../../services/utils-service";
import { parseDate } from "../utils/parseDate";

const useFetchDataClient = () => {
  const [data, setData] = useState<IClient[]>();
  const [total, setTotal] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isSuccess } = useContext(SaleContext);

  const fetchClients = async () => {
    const resClient = await saleService.fetchClient(currentPage, pageSize);
    setTotal(resClient.length);
    console.log("resClient.data", resClient.data);

    const mapData = resClient.map((client: IClient) => {
      const createdAt = parseDate(client.createdAt);
      const dob = parseDate(client.dateOfBirth!);
      const lastCareTime = parseDate(client.lastCareTime!);
      return {
        ...client,
        createdAt: createdAt,
        dateOfBirth: dob,
        lastCareTime: lastCareTime,
      };
    });
    setData(mapData);
  };
  useEffect(() => {
    fetchClients();
  }, [currentPage, isSuccess]);
  return { data, total, currentPage, setCurrentPage, setPageSize };
};

export default useFetchDataClient;
