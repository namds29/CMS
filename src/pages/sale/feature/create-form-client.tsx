import { Button, Modal } from "antd";
import { FC, useState } from "react";
import saleService from "../../../services/sale-service";
import { useForm } from "react-hook-form";
import useFetchReferSource from "../../../shared/hooks/useFetchReferSource";
import { ReferSource } from "../../../shared/constants/refer-source-types";

interface FormClientProps {}

const CreateFormClient: FC<FormClientProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { referSources } = useFetchReferSource();
  console.log(referSources);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (data: any) => {
    const form = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      referSource: Number(data.referSource),
    };
    const res = await saleService.createClient(form);
    if (res.status === 200) {
      Modal.success({
        content: "Thêm khách hàng thành công!",
        onOk() {
          setIsModalOpen(false);
        },
      });
    }else{
      Modal.error({
        content: 'Thêm khách hàng thất bại!',
      });
    }
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
      {isModalOpen && (
        <Modal
          title="FORM TẠO MỚI KHÁCH HÀNG"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={handleSubmit(handleOk)}>
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold ">
                Họ và tên<span className="text-red-600">*</span> :
              </p>
              <input
                type="text"
                className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold ">
                SĐT<span className="text-red-600">*</span> :
              </p>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
                {...register("phone", { required: true })}
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold ">Địa chỉ:</p>
              <input
                type="text"
                className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
                {...register("address")}
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold ">Năm sinh:</p>
              <input
                type="date"
                className="border-grey rounded px-2 h-8 w-[calc(100%-90px)]"
                {...register("dateOfBirth")}
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold ">
                Nguồn<span className="text-red-600">*</span> :
              </p>
              <select
                className="w-[calc(100%-90px)] max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                {...register("referSource", { required: true })}
              >
                {referSources &&
                  referSources.map((item: ReferSource, index: number) => (
                    <option key={index + item.name} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col mt-6">
              <p className="font-bold ">Tình trạng khách hàng:</p>
              <textarea
                className="w-full max-w-full border-grey rounded p-2 h-24"
                placeholder="Ghi chú..."
              ></textarea>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="ml-2 text-gray-500 border-none mr-4 px-4 py-1 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-none cursor-pointer hover:bg-blue-400 "
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateFormClient;
