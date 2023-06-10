import { FC } from "react";
import TableForSale from "../../components/table/table-sale";
import FetchDataTable from "./feature/fetch-data-table";
import CreateFormClient from "./feature/create-form-client";

interface indexProps {}

const SalePage: FC<indexProps> = ({}) => {
  return (
    <>
      <CreateFormClient />
      <FetchDataTable />
    </>
  );
};

export default SalePage;
