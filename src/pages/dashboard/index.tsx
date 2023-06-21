// import Table from "../../components/table/Table";

import { useState } from "react";
import TableComponent from "../../components/table/Table";
import { Button } from "antd";
import CreateFormClient from "./feature/create-form-client";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
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
      <TableComponent />
    </>
  );
}
export default Dashboard;
