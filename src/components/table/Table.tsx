import { useState } from "react";

import { IClient } from "../../shared/interfaces/sale-types";
// import useFetchDataQueryClient from "../../shared/hooks/useFetchDataQueryClient";
import ModalForSale from "../modal/modal-for-sale";
import { useFetchDataQueryClient } from "../../shared/hooks/useDataClient";

const columnNames = [
  "Nguồn",
  "Tình trạng",
  "Ngày tiếp nhận",
  "Họ và tên",
  "SĐT",
  "Địa chỉ",
  "Năm sinh",
  "Lần chăm sóc gần nhất",
  "Kết bạn Zalo",
  "Đưa vào nhóm kín",
];

const TableComponent = () => {
  const { data } = useFetchDataQueryClient();
  const [clientInfor, setClientInfor] = useState<IClient>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalTakeCare = (client: IClient) => {
    console.log(client);
    setClientInfor(client);
    setIsModalOpen(true);
  };

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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-[calc(100vh-15rem)]">
        <table className="w-full text-sm text-left text-gray-500  border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columnNames.map((columnName, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap"
                >
                  {columnName === "Địa chỉ" ? (
                    <>
                      {columnName}
                      <span className="opacity-0">add more space</span>
                    </>
                  ) : (
                    columnName
                  )}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 sticky right-0 bg-gray-100">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!data && (
              <tr className="relative">
                <td className="opacity-0 py-16">No data</td>
              </tr>
            )}
            {data &&
              data.map((item: IClient, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50 border-bottom-solid"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.referSourceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.responseStatusName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.dateOfBirth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.lastCareTime}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={item.addZaloFriend ? true : false}
                      readOnly
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={item.moveToPrivateGroup}
                      readOnly={true}
                    />
                  </td>
                  <td className="sticky right-0 bg-gray-100 whitespace-nowrap">
                    <div className="flex">
                      <div className="text-center w-full font-bold">
                        <button
                          className="border-none bg-transparent text-blue-600 hover:underline cursor-pointer"
                          onClick={() => showModalTakeCare(item)}
                        >
                          Chăm sóc
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isModalOpen && (
          <ModalForSale
            isModalOpen={isModalOpen}
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            clientInfor={clientInfor}
          />
        )}
      </div>
    </>
  );
};

export default TableComponent;
