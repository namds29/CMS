import { useState } from "react";
import ModalForSale from "../modal/modal-for-sale";
import useFetchDataClient from "../../shared/hooks/useFetchDataClient";
import { IClient } from "../../shared/interfaces/sale-types";
import { Pagination } from "antd";

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
const TableForSale = () => {
  const { data, total, setCurrentPage, currentPage } = useFetchDataClient();
  // console.log(data);
  const [clientInfor, setClientInfor] = useState<IClient>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalTakeCare = (client: IClient) => {
    console.log(client);
    setClientInfor(client);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (page: number) => {
    console.log(page);

    setCurrentPage(page);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-[calc(100vh-15rem)]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-bottom-solid"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.referSource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
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
                      checked={item.addZaloFriend}
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
        {!data && (
          <div
            className="absolute w-full flex justify-center items-center"
            x-show="!items.length"
          >
            <p className="text-gray-500 text-xxl">No data available</p>
          </div>
        )}

        {isModalOpen && (
          <ModalForSale
            clientInfor={clientInfor}
            isModalOpen={isModalOpen}
            showModal={showModalTakeCare}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        )}
      </div>
      <div className="mt-4 text-right">
        <Pagination onChange={onChange} defaultCurrent={currentPage} total={total} pageSize={12} />
      </div>
    </>
  );
};

export default TableForSale;
