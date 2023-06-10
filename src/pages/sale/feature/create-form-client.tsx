import { Button, Modal } from "antd";
import { FC, useState } from "react";

interface FormClientProps {}

const CreateFormClient: FC<FormClientProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="text-right mb-4">
        <Button type="primary" onClick={showModal}>
          Tạo khách hàng
        </Button>
      </div>
      <Modal
        title="FORM TẠO MỚI KHÁCH HÀNG"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Bỏ
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Tạo
            </Button>,
           
          ]}
      >
        <div className="flex justify-between items-center mt-6">
          <p className="font-bold ">
            Họ và tên<span className="text-red-600">*</span> :
          </p>
          <input
            type="text"
            className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-bold ">
            SĐT<span className="text-red-600">*</span> :
          </p>
          <input
            type="number"
            className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-bold ">Địa chỉ:</p>
          <input
            type="number"
            className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-bold ">Năm sinh:</p>
          <input
            type="date"
            className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-bold ">
            Nguồn<span className="text-red-600">*</span> :
          </p>
          <select
            className="w-[calc(100%-90px)] max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
            defaultValue=""
            // onChange={handleSelectChange}
          >
            <option value="" disabled>
              Trung tâm chính
            </option>
            <option value="1">Trường chinh</option>
            <option value="2">Đống Đa</option>
          </select>
        </div>
        <div className="flex flex-col mt-6">
          <p className="font-bold ">Tình trạng khách hàng:</p>
          <textarea
            className="w-full max-w-full border-grey rounded p-2 h-24"
            placeholder="Ghi chú..."
          ></textarea>
        </div>
      </Modal>
    </>
  );
};

export default CreateFormClient;
