import { Button, Modal } from "antd";
import { FC, useContext, useEffect } from "react";
import saleService from "../../../services/sale-service";
import { useForm } from "react-hook-form";
import useFetchReferSource from "../../../shared/hooks/useFetchReferSource";
import { ReferSource } from "../../../shared/interfaces/refer-source-types";
import { SaleContext } from "../context/sale-context";
import { AuthContext } from "../../../shared/contexts/authContext";

interface FormClientProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  showModal: () => void;
  handleCancel: () => void;
}

const CreateFormClient: FC<FormClientProps> = ({
  isModalOpen,
  setIsModalOpen,
  showModal,
  handleCancel,
}) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const { referSources } = useFetchReferSource();
  const { isSuccess, setIsSuccess } = useContext(SaleContext);
  const {userID} = useContext(AuthContext);
  console.log(referSources);
  
  const handleOk = async (data: any) => {
    const form = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      referSource: Number(data.referSource),
      clientHeathStatus: data.clientHeathStatus,
      userID: userID,
    };
    console.log(form);
    const res = await saleService.createClient(form);
    if (res.status === 200) {
      Modal.success({
        content: "Thêm khách hàng thành công!",
        onOk() {
          setIsModalOpen(false);
          setIsSuccess(true);
        },
      });
    } else {
      Modal.error({
        content: "Thêm khách hàng thất bại!",
      });
    }
  };
  useEffect(() => {
    return () => setIsSuccess(false);
  }, []);
  return (
    <>
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
                {...register("referSource")}  value={1}
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
                {...register("clientHeathStatus")}
              ></textarea>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="mr-4 border-none px-4 py-1 rounded cursor-pointer hover:bg-gray-200"
              >
                Đóng
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-none cursor-pointer hover:bg-blue-400 "
              >
                Tạo
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateFormClient;
