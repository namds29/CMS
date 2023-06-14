import { FC, useState } from "react";
import FetchDataTable from "./feature/fetch-data-table";
import CreateFormClient from "./feature/create-form-client";
import { Button } from "antd";
import { SaleProvider } from "./context/sale-context";

interface indexProps {}

const SalePage: FC<indexProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <SaleProvider>
      
        <div className="text-right mb-4">
          <Button type="primary" onClick={showModal}>
            Tạo khách hàng
          </Button>
        </div>
        {isModalOpen && (
          <CreateFormClient
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showModal={showModal}
            handleCancel={handleCancel}
          />
        )}
        <FetchDataTable />
      
    </SaleProvider>
  );
};

export default SalePage;
