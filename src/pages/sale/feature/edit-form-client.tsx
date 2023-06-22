import { Modal } from "antd";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  useFetchCenters,
  useFetchReferSources,
} from "../../../shared/hooks/useFetchUtilsData";
import { ReferSource } from "../../../shared/interfaces/utils-types";
import { IClient } from "../../../shared/interfaces/sale-types";
import { parseDateTypeInput } from "../../../shared/utils/parseDate";
import saleService from "../../../services/sale-service";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  clientInfor: IClient | undefined;
  isModalOpen: boolean;
  setIsModalOpen: any;
  handleCancel: () => void;
};

const EditFormClient: FC<Props> = ({
  clientInfor,
  isModalOpen,
  setIsModalOpen,
  handleCancel,
}) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: clientInfor?.fullName,
      phone: clientInfor?.phone,
      address: clientInfor?.address,
      dateOfBirth:
        clientInfor?.dateOfBirth &&
        parseDateTypeInput(clientInfor?.dateOfBirth),
      referSource: clientInfor?.referSourceId,
      centers: clientInfor?.intakeCenterID,
    },
  });
  console.log(clientInfor?.dateOfBirth && parseDateTypeInput(clientInfor?.dateOfBirth), clientInfor?.dateOfBirth);
  
  const { referSources } = useFetchReferSources();
  const { centers } = useFetchCenters();
  const queryClient = useQueryClient();

  const handleOk = async (data: any) => {
    if (clientInfor) {
      const form: any = {
        fullName: data.name,
        phone: data.phone,
        address: data.address,
        dateOfBirth: data.dateOfBirth ?? undefined,
        referSourceId: Number(data.referSource),
        intakeCenterID: Number(data.centers) ?? undefined,
      };
      console.log(form);
      const res = await saleService.editClient(clientInfor.id, form);
      if (res.status === 200) {
        Modal.success({
          content: "Sửa thông tin khách hàng thành công!",
          onOk() {
            queryClient.invalidateQueries(["clients"]);
            setIsModalOpen(false);
          },
        });
      }
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          title="SỬA THÔNG TIN KHÁCH HÀNG"
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
                  {...register("referSource", { required: true })}
                  defaultValue={""}
                >
                  <option value={""}>
                    Chọn nguồn
                  </option>
                  {referSources.map((item: ReferSource, index: number) => (
                    <option key={index + item.name} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              }
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold ">Cơ sở tiếp nhận:</p>
              <select
                className="w-[calc(100%-90px)] max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                {...register("centers")}
                defaultValue={""}
              >
                <option value="">
                  Chọn cơ sở
                </option>
                {centers.map((item: ReferSource, index: number) => (
                  <option key={index + item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                Cập nhật
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditFormClient;
