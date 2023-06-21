import { Modal } from "antd";
import { FC, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../shared/contexts/authContext";
import { useCreateDataClient } from "../../../shared/hooks/useDataClient";
import {
  useFetchCenters,
  useFetchReferSources,
} from "../../../shared/hooks/useFetchUtilsData";
import { ReferSource } from "../../../shared/interfaces/utils-types";

interface FormClientProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  showModal: () => void;
  handleCancel: () => void;
}

const CreateFormClient: FC<FormClientProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleCancel,
}) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const { referSources } = useFetchReferSources();
  const { centers } = useFetchCenters();
  const { createClient } = useCreateDataClient();
  const { userID } = useContext(AuthContext);

  const handleOk = async (data: any) => {
    const form = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      dateOfBirth: data.dateOfBirth ?? undefined,
      addZaloFriend: data.addZaloFriend ?? 0,
      moveToPrivateGroup: data.moveToPrivateGroup ?? 0,
      isDeleted: 1,
      referSourceID: Number(data.referSource),
      clientHeathStatus: data.clientHeathStatus,
      intakeCenterID: Number(data.centers) ?? undefined,
      userID: userID,
    };
    console.log(form);

    createClient(form, {
      onSuccess: (data) => {
        if (data.status === 200) {
          Modal.success({
            content: "Thêm khách hàng thành công!",
            onOk() {
              setIsModalOpen(false);
            },
          });
        }
      },
    });
  };

  useEffect(() => {}, []);
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
              {
                <select
                  className="w-[calc(100%-90px)] max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                  {...register("referSource")}
                  defaultValue={referSources[0].id}
                >
                  {referSources.map((item: ReferSource, index: number) => (
                    <option key={index + item.name} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              }
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold ">Cơ sở:</p>
              <select
                className="w-[calc(100%-90px)] max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                {...register("centers")}
                defaultValue={""}
              >
                <option value="" disabled>
                  Chọn cơ sở
                </option>
                {centers.map((item: ReferSource, index: number) => (
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
