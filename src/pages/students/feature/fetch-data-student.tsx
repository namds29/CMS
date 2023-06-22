import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { parseDate, parseDateTime } from "../../../shared/utils/parseDate";
import { IClient } from "../../../shared/interfaces/sale-types";
import { useFetchStudents } from "../../../shared/hooks/useFetchStudents";
import ModalTakeCare from "../../../components/modal/modal-takecare";

interface Props {}
interface DataType {
  key: React.Key;
  data: IClient;
}
const FetchDataStudent: FC<Props> = ({}) => {
  const { data } = useFetchStudents();
  const [clientInfor, setClientInfor] = useState<IClient>();
  const [isModalTakeCareOpen, setIsModalTakeCareOpen] = useState(false);

  const listStudent: DataType[] =
    data &&
    data.map((item: IClient) => ({
      key: 'student'+item.id,
      ...item,
      createdAt: parseDateTime(item.createdAt),
      dateOfBirth: item.dateOfBirth && parseDate(item.dateOfBirth),
    }));

  const showModalTakeCare = (client: any) => {
    console.log(client);
    setClientInfor(client);
    setIsModalTakeCareOpen(true);
  };

  const handleOk = () => {
    setIsModalTakeCareOpen(false);
  };

  const handleCancel = () => {
    setIsModalTakeCareOpen(false);
  };
  const columnNames = [
    "Họ và tên",
    "SĐT",
    "Nguồn",
    "Tình trạng",
    "Ngày tiếp nhận",
    "Địa chỉ",
    "Năm sinh",
    "Kết bạn Zalo",
    "Đưa vào nhóm kín",
    "Tác vụ",
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: columnNames[0],
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      fixed: "left",
    },
    {
      title: columnNames[1],
      dataIndex: "phone",
      key: "phone",
      width: 150,
      fixed: "left",
    },
    {
      title: columnNames[2],
      width: 100,

      dataIndex: "referSourceName",
      key: "referSourceName",
    },
    {
      title: columnNames[3],
      dataIndex: "responseStatusName",
      key: "responseStatusName",
      width: 150,
      render: (responseStatusName: string) => (
        <span>
          <Tag
            style={{ fontSize: "0.9rem" }}
            color={responseStatusName === "Chốt" ? "green" : "blue"}
          >
            {responseStatusName}
          </Tag>
        </span>
      ),
    },
    {
      title: columnNames[4],
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
    },

    {
      title: columnNames[5],
      dataIndex: "address",
      key: "address",
      width: 250,
    },
    {
      title: columnNames[6],
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 150,
    },
    {
      title: columnNames[7],
      dataIndex: "addZaloFriend",
      key: "addZaloFriend",
      width: 150,
      render: (addZaloFriend: number) => (
        <input
          type="checkbox"
          checked={addZaloFriend === 0 ? false : true}
          readOnly
        />
      ),
    },
    {
      title: columnNames[8],
      dataIndex: "moveToPrivateGroup",
      key: "moveToPrivateGroup",
      width: 150,
      render: (moveToPrivateGroup: number) => (
        <input
          type="checkbox"
          checked={moveToPrivateGroup === 0 ? false : true}
          readOnly
        />
      ),
    },
      {
        title: columnNames[9],
        dataIndex: "actions",
        key: "actions",
        width: 150,
        fixed: "right",
        render: (_, data) => (
          <div className="text-center w-full font-bold">
            <button
              className="border-none bg-transparent text-blue-600 hover:underline cursor-pointer"
              onClick={() => showModalTakeCare(data)}
            >
              Chăm sóc
            </button>
          </div>
        ),
      },

    // Add the remaining columns using columnNames[index]
  ];

  return (
    <div>
      <p className="text-xl mb-4 text-slate-500 text-center italic ">
        Danh sách học viên
      </p>
      <Table
        columns={columns}
        dataSource={listStudent}
        scroll={{ x: 1500 }}
        // sticky
      />

      {isModalTakeCareOpen && (
          <ModalTakeCare
            isModalOpen={isModalTakeCareOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            clientInfor={clientInfor}
          />
        )}
    </div>
  );
};

export default FetchDataStudent;
