import { useState } from "react";
import jsonData from "../../mock/data-table-sale.json";
import ModalForSale from "../modal/modal-for-sale";
const TableForSale = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const data = jsonData;

  const showModal = (item: any) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nguồn
            </th>
            <th scope="col" className="px-6 py-3">
              Tình trạng
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tiếp nhận
            </th>
            <th scope="col" className="px-6 py-3">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3">
              SĐT
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3">
              Năm sinh
            </th>
            <th scope="col" className="px-6 py-3">
              Lần chăm sóc gần nhất
            </th>
            <th scope="col" className="px-6 py-3">
              Kết bạn Zalo
            </th>
            <th scope="col" className="px-6 py-3">
              Đưa vào nhóm kín
            </th>
            <th scope="col" className="px-6 py-3 sticky right-0 bg-gray-100">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-bottom-solid"
            >
              <td className="px-6 py-4">{item.nguon}</td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">{item.takeDate}</td>
              <td className="px-6 py-4">{item.fullname}</td>
              <td className="px-6 py-4">{item.phone}</td>
              <td className="px-6 py-4">{item.address}</td>
              <td className="px-6 py-4">{item.dob}</td>
              <td className="px-6 py-4">{item.takeCare}</td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  defaultChecked={item.addZalo}
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  defaultChecked={item.addGroup}
                />
              </td>
              <td className="sticky right-0 bg-gray-100">
                <div className="flex">
                  {/* <div className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div> */}
                  <div className="text-center w-full font-bold">
                    <button
                      className="border-none bg-transparent text-blue-600 hover:underline cursor-pointer"
                      onClick={() => showModal(item)}
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
            />
          )}
    </div>
    
  );
};

export default TableForSale;
