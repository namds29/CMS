// import { useEffect, useRef, useState } from "react";
// import ModalForSale from "../modal/modal-for-sale";
// import useFetchDataClient from "../../shared/hooks/useFetchDataClient";
// import { IClient } from "../../shared/interfaces/sale-types";

// const columnNames = [
//   "Nguồn",
//   "Tình trạng",
//   "Ngày tiếp nhận",
//   "Họ và tên",
//   "SĐT",
//   "Địa chỉ",
//   "Năm sinh",
//   "Lần chăm sóc gần nhất",
//   "Kết bạn Zalo",
//   "Đưa vào nhóm kín",
// ];
// type FilterType = {
//   referSource: string;
//   name: string;
//   phone: string;
// };
// const TableComponent = () => {
//   const { data } = useFetchDataClient();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // filter
//   const [filteredData, setFilteredData] = useState([]);
//   const [filters, setFilters] = useState({
//     referSource: "",
//     name: "",
//     phone: "",
//   });
//   const filterInput = useRef(null);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   // const applyFilter = () => {
//   //   if (data) {
//   //     const filtered = data.filter((item: FilterType) =>
//   //       item.name.toLowerCase().includes(filters.name)
//   //     );

//   //     setFilteredData(filtered);
//   //   }
//   // };
//   const handleFilterChange = (event: any) => {
//     console.log(filterInput.current);

//     setFilters(event.target.value);
//   };
//   useEffect(() => {
//     applyFilter();
//   }, [filters]);
//   return (
//     <>
//       <input
//         type="text"
//         value={filters.name}
//         ref={filterInput}
//         onChange={handleFilterChange}
//       />
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap border-collapse">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               {columnNames.map((columnName, index) => (
//                 <th key={index} scope="col" className="px-6 py-3">
//                   {columnName}
//                 </th>
//               ))}
//               <th scope="col" className="px-6 py-3 sticky right-0 bg-gray-100">
//                 <span className="sr-only">Edit</span>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data &&
//               data.map((item: IClient, index: number) => (
//                 <tr
//                   key={index}
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-bottom-solid"
//                 >
//                   <td className="px-6 py-4">{item.referSource}</td>
//                   <td className="px-6 py-4">{item.status}</td>
//                   <td className="px-6 py-4">{item.createdAt}</td>
//                   <td className="px-6 py-4">{item.name}</td>
//                   <td className="px-6 py-4">{item.phone}</td>
//                   <td className="px-6 py-4">{item.address}</td>
//                   <td className="px-6 py-4">{item.dateOfBirth}</td>
//                   <td className="px-6 py-4">{item.lastCareTime}</td>
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       name=""
//                       id=""
//                       defaultChecked={item.addZaloFriend}
//                     />
//                   </td>
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       name=""
//                       id=""
//                       defaultChecked={item.moveToPrivateGroup}
//                     />
//                   </td>
//                   <td className="sticky right-0 bg-gray-100">
//                     <div className="flex">
//                       {/* <div className="px-6 py-4 text-right">
//                     <button className="text-blue-600 hover:underline">
//                       Edit
//                     </button>
//                   </div> */}
//                       <div className="text-center w-full font-bold">
//                         <button
//                           className="border-none bg-transparent text-blue-600 hover:underline cursor-pointer"
//                           onClick={() => showModal()}
//                         >
//                           Chăm sóc
//                         </button>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//         {/* {isModalOpen && (
//           <ModalForSale
//             isModalOpen={isModalOpen}
//             showModal={showModal}
//             handleOk={handleOk}
//             handleCancel={handleCancel}
//           />
//         )} */}
//       </div>
//     </>
//   );
// };

// export default TableComponent;
