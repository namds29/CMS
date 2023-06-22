import { FC, useState } from "react";
import ModalForSale from "../../../components/modal/modal-for-sale";
import { IClient } from "../../../shared/interfaces/sale-types";
import { useFetchDataQueryClient } from "../../../shared/hooks/useDataClient";
import { parseDate, parseDateTime } from "../../../shared/utils/parseDate";
import { Tag } from "antd";
import EditFormClient from "./edit-form-client";

interface DataTableProps {}
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
  "Cơ sở chuyển",
];
const FetchDataTable: FC<DataTableProps> = () => {
  const { data = [] } = useFetchDataQueryClient();
  const [clientInfor, setClientInfor] = useState<IClient>();
  const [isModalTakeCareOpen, setIsModalTakeCareOpen] = useState(false);
  const [isModalEditClientOpen, setIsModalEditClientOpen] = useState(false);
  // console.log(data);

  const transformData = data.sort((a: IClient, b: IClient) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  const showModalTakeCare = (client: IClient) => {
    console.log(client);
    setClientInfor(client);
    setIsModalTakeCareOpen(true);
  };

  const showModalEditClient = (client: IClient) => {
    console.log(client);
    setClientInfor(client);
    setIsModalEditClientOpen(true);
  };

  const handleOk = () => {
    setIsModalTakeCareOpen(false);
  };

  const handleCancel = () => {
    setIsModalTakeCareOpen(false);
    setIsModalEditClientOpen(false);
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
                    <Tag
                      style={{ fontSize: "1rem" }}
                      color={
                        item.responseStatusName === "Chốt" ? "green" : "blue"
                      }
                    >
                      {item.responseStatusName}
                    </Tag>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parseDateTime(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.dateOfBirth && parseDate(item.dateOfBirth)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.lastCareTime ? parseDateTime(item.lastCareTime) : ""}
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
                  <td className="px-6 py-4">{item.intakeCenterName}</td>
                  <td className="sticky right-0 bg-gray-100 whitespace-nowrap">
                    <div className="flex">
                      <div className="text-center w-full font-bold">
                        <button
                          className="border-none bg-transparent text-blue-600 hover:underline cursor-pointer border-r-solid"
                          onClick={() => showModalEditClient(item)}
                        >
                          Chỉnh sửa
                        </button>
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
        {isModalEditClientOpen && (
          <EditFormClient
            clientInfor={clientInfor}
            isModalOpen={isModalEditClientOpen}
            setIsModalOpen={setIsModalEditClientOpen}
            handleCancel={handleCancel}
          />
        )}

        {isModalTakeCareOpen && (
          <ModalForSale
            isModalOpen={isModalTakeCareOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            clientInfor={clientInfor}
          />
        )}
      </div>
    </>
  );
};

export default FetchDataTable;
