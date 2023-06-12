import { FC, useState } from "react";
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
const takeCareHistory = [
  {
    date: "1/1/2020",
    status: "Cân nhắc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    date: "2/2/2022",
    status: "Chốt",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const ModalForSale: FC<modalForSaleProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSelectChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-between">
          <div>Thông tin khách hàng</div>
          <div className="border rounded bg-green-200 px-4 leading-6">
            KH Mới
          </div>
        </div>
      ),
      children: (
        <>
          <div className="border-bottom-solid pb-3">
            <p>
              Tên:<span className="ml-2 font-bold">Đoàn Sĩ Nam</span>
            </p>
            <p>
              SĐT:<span className="ml-2 font-bold">0123456789</span>
            </p>
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
      children: (
        <>
          <div className="p-4 rounded border border-dashed 	border-gray-400 max-h-60 overflow-y-auto first:pt-0">
            {takeCareHistory.map((item, index) => (
              <div
                key={index}
                className="border-bottom-solid pb-3 last:border-b-0"
              >
                <div className="flex justify-between pt-3 ">
                  <p className="font-bold text-base">{item.date}</p>
                  <div className="px-3 bg-red-200 rounded leading-6">
                    {item.status}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="underline text-base">Nội dung:</p>
                  <p>{item.content}</p>
                </div>
                <div className="mt-3">
                  <p className="underline text-base">Ghi chú:</p>
                  <p>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "Phản hồi khách hàng",
      children: (
        <>
          <div className="w-full">
            <textarea
              className="w-full max-w-full p-2 h-32"
              placeholder="Phản hồi khách hàng..."
            ></textarea>
          </div>
          <div className="flex mt-2 items-center">
            <p className="text-base font-bold">
              Trạng thái<span className="text-red-600">*</span> :
            </p>
            <div className="flex ml-4">
              <select
                className="w-52 max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                defaultValue=""
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Chọn
                </option>
                <option value="1">Đặt lịch học thử</option>
                <option value="2">Chốt</option>
                <option value="3">Từ chối</option>
              </select>
            </div>
          </div>
          {selectedStatus === "1" && (
            <>
              <div className="flex mt-2 items-center">
                <p className="text-base font-bold">
                  Đặt lịch<span className="text-red-600">*</span> :
                </p>
                <div className="flex ml-8">
                  <input
                    type="date"
                    className="w-52 h-8 px-2  text-gray-900 border-grey rounded bg-gray-50"
                    placeholder="Enter text..."
                  />
                </div>
              </div>
              <div className="flex mt-2 items-center">
                <p className="text-base font-bold">Cơ sở:</p>
                <div className="flex ml-14">
                  <select
                    className="w-52 max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Chọn cơ sở
                    </option>
                    <option value="a">Đống Đa</option>
                    <option value="b">Trường chinh</option>
                  </select>
                </div>
              </div>
            </>
          )}
          {selectedStatus === "3" && (
            <>
              <div className="bg-yellow-200 rounded-lg shadow-md p-4 mt-4">
                <div className="border-b-2 pb-4">
                  <span className="text-xl font-bold">Check list:</span>
                </div>
                <div className="text-gray-700">
                  <p>+ Kết bạn Zalo</p>
                  <p className="mt-2">+ Đưa vào nhóm đặc biệt</p>
                  <p className="mt-2">...</p>
                </div>
              </div>
              <div className="w-full mt-4 rounded">
                <textarea
                  className="w-full max-w-full p-2 h-24"
                  placeholder="Ghi chú..."
                ></textarea>
              </div>
            </>
          )}
        </>
      ),
    },
  ];
  // const onChange = (key: string | string[]) => {
  // };
  return (
    <>
      <Modal
        title="Chăm sóc khách hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            type="button"
            onClick={handleCancel}
            key={'btn-close'}
            className="mr-4 border-none px-4 py-1 rounded cursor-pointer hover:bg-gray-200"
          >
            Đóng
          </button>,
        ]}
      >
        <Collapse
          className="max-h-[calc(85vh-180px)] overflow-y-auto"
          overflow-y-auto
          items={items}
          defaultActiveKey={["1"]}
          // onChange={onChange}
        />
      </Modal>
    </>
  );
};

export default ModalForSale;
