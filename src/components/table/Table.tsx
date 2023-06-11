const Table = () => {
  // const data = jsonData

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
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
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="sticky right-0 bg-gray-100">
              <div className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 hover:underline">
                  Edit
                </a>
              </div>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
            <td className="sticky right-0 bg-gray-100">
              <div className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 hover:underline">
                  Edit
                </a>
              </div>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
            <td className="sticky right-0 bg-gray-100">
              <div className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 hover:underline">
                  Edit
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
