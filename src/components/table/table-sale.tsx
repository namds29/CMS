import { useFetchDataQueryClient } from "../../shared/hooks/useDataClient";
import { IClient } from "../../shared/interfaces/sale-types";
import { useState } from "react";
import ModalForSale from "../modal/modal-for-sale";
import { parseDate } from "../../shared/utils/parseDate";

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
  "Cơ sở chuyển"
];
const TableForSale = () => {
  const { data = [] } = useFetchDataQueryClient();
  const [clientInfor, setClientInfor] = useState<IClient>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(data);

  const transformData = data.sort((a: IClient, b: IClient) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });
  // console.log('trán',transformData);

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
            {!transformData && (
              <tr className="relative">
                <td className="opacity-0 py-16">No data</td>
              </tr>
            )}
            {transformData &&
              transformData.map((item: IClient, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50 border-bottom-solid"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.referSourceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.responseStatusName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parseDate(item.createdAt)}
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
                    {item.lastCareTime ? parseDate(item.lastCareTime) : ""}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={item.addZaloFriend === 0 ? false : true}
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
                  <td className="px-6 py-4">{item.intakeCenterName}</td>
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

export default TableForSale;
