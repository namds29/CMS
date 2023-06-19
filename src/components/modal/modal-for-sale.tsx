import { FC, useState, useEffect, useContext } from "react";
import { Button, Modal } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import {
  IClient,
  IClientCareHistories,
  ResponseStatus,
} from "../../shared/interfaces/sale-types";
import saleService from "../../services/sale-service";
import { AuthContext } from "../../shared/contexts/authContext";
import { SaleContext } from "../../pages/sale/context/sale-context";
import utilsService from "../../services/utils-service";
import { Course, Session } from "../../shared/interfaces/utils-types";
import { useForm } from "react-hook-form";
import { parseDate } from "../../shared/utils/parseDate";

interface modalForSaleProps {
  clientInfor: IClient | undefined;
  isModalOpen: boolean;
  setIsModalOpen?: any;
  showModal: (item: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
}

const ModalForSale: FC<modalForSaleProps> = ({
  clientInfor,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      feedback: "",
      responseStatus: "",
      nextCallDate: "",
      startingDate: "",
      note: "",
      centerId: "",
      sessionId: "",
      courseId: "",
      visitingDate: "",
    },
  });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [clientResponseStatus, setClientResponseStatus] =
    useState<ResponseStatus[]>();
  const [clientCareHistories, setClientCareHistories] = useState<
    IClientCareHistories[]
  >([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isUpdatedSuccess, setIsUpdatedSuccess] = useState(false);
  const { userID } = useContext(AuthContext);
  const { setIsSuccess } = useContext(SaleContext);

  // handle action
  const handleCheckAddZalo = async (addZaloFriend: boolean) => {
    if (clientInfor) {
      const res = await saleService.updateStatusAddZalo(
        clientInfor.id,
        addZaloFriend,
        userID
      );
      res.success && setIsSuccess(true);
    }
  };
  const handleCheckMoveToGroup = async (moveToPrivateGroup: boolean) => {
    if (clientInfor) {
      const res = await saleService.updateStatusMoveToPrivateGroup(
        clientInfor.id,
        moveToPrivateGroup,
        userID
      );
      res.success && setIsSuccess(true);
    }
  };
  const handleSelectChange = (event: any) => {
    setSelectedStatus(event.target.value);
    const fieldsToReset = [
      "feedback",
      "nextCallDate",
      "startingDate",
      "note",
      "centerId",
      "sessionId",
      "courseId",
      "visitingDate",
    ];
    fieldsToReset.forEach((field: any) => {
      if (field !== "responseStatus") {
        setValue(field, "");
      }
    });
  };

  // Fetch
  const fetchClientResponseStatus = async () => {
    try {
      const res = await saleService.fetchClientResponseStatus();
      setClientResponseStatus(res);
      console.log("res status");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await utilsService.fetchCourses();
      setCourses(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSessions = async () => {
    try {
      const res = await utilsService.fetchSessions();
      setSessions(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientCareHistories = async () => {
    try {
      if (clientInfor) {
        const res = await saleService.fetchClientCareHistories(clientInfor.id);
        console.log("histories", res);
        setClientCareHistories(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: any) => {
    const form = {
      content: data.feedback.trim(),
      userID: userID,
      responseStatus: Number(data.responseStatus),
      nextCallDate: data.nextCallDate,
      startingDate: data.startingDate,
      visitingDate: data.visitingDate,
      note: data.note.trim(),
      centerId: Number(data.centerId),
      sessionId: Number(data.sessionId),
      courseID: Number(data.courseId),
    };
    console.log(form);
    
    if (clientInfor) {
      const res = await saleService.createClientCareHistory(
        clientInfor.id,
        form.content,
        form.startingDate,
        form.nextCallDate,
        form.visitingDate,
        form.userID,
        form.responseStatus,
        form.note,
        form.centerId,
        form.sessionId,
        form.courseID
      );
      if (res.status === 200) {
        setIsUpdatedSuccess(true);  
        Modal.success({
          content: "Lưu thành công!",
          onOk() {
            setIsUpdatedSuccess(false)  
          },
        });
      } else {
        Modal.error({
          content: "Lưu thất bại!",
        });
      }
    }
  };
  useEffect(() => {
    fetchClientCareHistories();
  }, [isUpdatedSuccess]);

  useEffect(() => {
    fetchCourses();
    fetchClientResponseStatus();
    fetchSessions();

    return () => setIsSuccess(false);
  }, []);
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
              Tên:<span className="ml-2 font-bold">{clientInfor?.fullName}</span>
            </p>
            <p>
              Ngày sinh:
              <span className="ml-2 font-bold">{clientInfor?.dateOfBirth}</span>
            </p>
            <p>
              SĐT:<span className="ml-2 font-bold">{clientInfor?.phone}</span>
            </p>
            <p>
              Ngày tiếp nhận:
              <span className="ml-2 font-bold">{clientInfor?.createdAt}</span>
            </p>
          </div>
          <div>
            <div className="flex items-center pt-3">
              <span className="mr-2">Kết bạn zalo:</span>
              <input
                type="checkbox"
                name=""
                id=""
                defaultChecked={clientInfor?.addZaloFriend}
                onChange={(e) => handleCheckAddZalo(e.target.checked)}
              />
            </div>
            <div className="flex items-center pt-3">
              <span className="mr-2">Vào nhóm kín:</span>
              <input
                type="checkbox"
                name=""
                id=""
                defaultChecked={clientInfor?.moveToPrivateGroup}
                onChange={(e) => handleCheckMoveToGroup(e.target.checked)}
              />
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
          {clientCareHistories.length < 1 && (
            <div className="my-8 text-center">Chưa có lịch sử chăm sóc</div>
          )}
          {clientCareHistories.length >= 1 && (
            <div className="p-4 rounded border border-dashed 	border-gray-400 max-h-60 overflow-y-auto first:pt-0">
              {clientCareHistories &&
                clientCareHistories.map((item, index) => (
                  <div
                    key={index}
                    className="border-bottom-solid pb-3 last:border-b-0"
                  >
                    <div className="flex justify-between pt-3 ">
                      <p className="font-bold text-base">
                        {parseDate(item.createdAt)}
                      </p>
                      {item.responseStatusName !== "Chốt" && (
                        <div className="px-3 bg-yellow-600 rounded leading-6 text-white">
                          {item.responseStatusName}
                        </div>
                      )}
                       {item.responseStatusName === "Chốt" && (
                        <div className="px-3 bg-green-600 rounded leading-6 text-white">
                          {item.responseStatusName}
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <p className="underline text-base">Nội dung:</p>
                      {item.content === "" && (
                        <p className="my-4 italic">Không có nội dung</p>
                      )}
                      {item.content !== "" && <p>{item.content}</p>}
                    </div>
                    <div className="mt-3">
                      <p className="underline text-base">Ghi chú:</p>
                      {item.note === "" && (
                        <p className="my-4 italic">Không có ghi chú</p>
                      )}
                      {item.note !== "" && <p>{item.note}</p>}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      ),
    },
    {
      key: "3",
      label: "Phản hồi khách hàng",
      children: (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <textarea
              className="w-full max-w-full p-2 h-32"
              placeholder="Phản hồi khách hàng..."
              {...register("feedback")}
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
                // onChange={handleSelectChange}
                {...register("responseStatus", {
                  required: true,
                  onChange: (e) => handleSelectChange(e),
                })}
              >
                <option value="" disabled>
                  Chọn
                </option>
                {clientResponseStatus &&
                  clientResponseStatus.map((status) => (
                    <option key={status.id + status.name} value={status.id}>
                      {status.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {["1", "2", "4", "3", "5"].includes(selectedStatus) && (
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
                    {...register("nextCallDate", { required: true })}
                  />
                </div>
              </div>
            </>
          )}
          {selectedStatus === "3" && (
            <>
              <div className="flex mt-2 items-center">
                <p className="text-base font-bold">
                  Chọn ngày đến<span className="text-red-600">*</span> :
                </p>
                <div className="flex ml-8">
                  <input
                    type="date"
                    className="w-52 h-8 px-2  text-gray-900 border-grey rounded bg-gray-50"
                    placeholder="Enter text..."
                    {...register("visitingDate", { required: true })}
                  />
                </div>
              </div>
            </>
          )}
          {selectedStatus === "6" && (
            <>
              <div className="flex mt-2 items-center">
                <p className="text-base font-bold">
                  Chọn khóa học<span className="text-red-600">*</span> :
                </p>
                <div className="flex ml-8">
                  <select
                    className="w-52 max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                    defaultValue=""
                    {...register("courseId", { required: true })}
                  >
                    <option value="" disabled>
                      Chọn khóa
                    </option>
                    {courses &&
                      courses.map((item) => (
                        <option key={item.id + item.name} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex mt-2 items-center">
                <p className="text-base font-bold">
                  Chọn ngày bắt đầu<span className="text-red-600">*</span> :
                </p>
                <div className="flex ml-8">
                  <input
                    type="date"
                    className="w-52 h-8 px-2  text-gray-900 border-grey rounded bg-gray-50"
                    placeholder="Enter text..."
                    {...register("startingDate")}
                  />
                </div>
              </div>
              <div className="flex mt-2 items-center">
                <p className="text-base font-bold">
                  Chọn ca<span className="text-red-600">*</span> :
                </p>
                <div className="flex ml-8">
                  <select
                    className="w-52 max-w-full h-8 px-2 text-sm text-gray-900 border-grey rounded bg-gray-50 "
                    defaultValue=""
                    {...register("sessionId")}
                  >
                    <option value="" disabled>
                      Chọn ca
                    </option>
                    {sessions &&
                      sessions.map((item) => (
                        <option key={item.id + item.name} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </>
          )}
          {selectedStatus === "7" && (
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
            </>
          )}
          <div className="mt-3">
            <p className="text-base font-bold">Ghi chú:</p>
            <div className="w-full">
              <textarea
                className="w-full max-w-full p-2 h-24"
                placeholder="Thêm ghi chú..."
                {...register("note")}
              ></textarea>
            </div>
          </div>
          <div className="mt-6 text-right">
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </form>
      ),
    },
  ];

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
            key={"btn-close"}
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
