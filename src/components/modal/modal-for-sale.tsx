import { Dispatch, FC, useState } from "react";
import { Modal } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

interface modalForSaleProps {
  isModalOpen: boolean;
  setIsModalOpen?: any;
  showModal: (item: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ModalForSale: FC<modalForSaleProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-between">
          <div>Thông tin khách hàng</div>
          <div className="border rounded bg-green-200 px-4 ">KH Mới</div>
        </div>
      ),
      children: (
        <>
          <div className="border-bottom-solid pb-3">
            <p>Tên:<span className="ml-2 font-bold">Đoàn Sĩ Nam</span></p>
            <p>SĐT:<span className="ml-2 font-bold">0123456789</span></p>
          </div>
          <div>
            <div className="flex items-center pt-3">
              <span className="mr-2">Kết bạn zalo:</span>
              <input type="checkbox" name="" id="" defaultChecked={true} />
            </div>
            <div className="flex items-center pt-3">
              <span className="mr-2">Vào nhóm kín:</span>
              <input type="checkbox" name="" id="" defaultChecked={true} />
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Lịch sử chăm sóc khách hàng",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "Phản hồi khách hàng",
      children: <p>{text}</p>,
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <>
      <Modal
        title="Chăm sóc khách hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
      </Modal>
    </>
  );
};

export default ModalForSale;
