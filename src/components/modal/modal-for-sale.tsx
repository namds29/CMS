import { Modal } from "antd";
import { Dispatch, FC, useState } from "react";

interface modalForSaleProps {
  isModalOpen: boolean,
  setIsModalOpen?: any,
  showModal: (item: any) => void,
  handleOk: () => void,
  handleCancel: () => void,
}

const ModalForSale: FC<modalForSaleProps> = ({isModalOpen, handleOk, handleCancel}) => {

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalForSale;
