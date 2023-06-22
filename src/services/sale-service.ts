import axios from "axios";
import QueryString from "qs";
import { IClient, IDetailFormClient, IUpdateFormClient } from "../shared/interfaces/sale-types";

async function fetchClient() {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "clients",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
}

async function fetchClientResponseStatus() {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "client-response-statuses",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
}
async function updateDetailClient(
  clientId: number,
  client: IUpdateFormClient
) {
  const token = localStorage.getItem("token");
  const data = QueryString.stringify(
    {
      name: client.name || undefined,
      phone: client.phone || undefined,
      address: client.address || undefined,
      dateOfBirth: client.dateOfBirth || undefined,
      addZaloFriend: client.addZaloFriend,
      moveToPrivateGroup: client.moveToPrivateGroup,
      isDeleted: client.isDeleted || undefined,
      referSourceID: client.referSourceID || undefined,
      clientHeathStatus: client.clientHeathStatus || undefined,
      intakeCenterID: client.intakeCenterID || undefined,
      userID: client.userID || undefined,
    }
  );

  const config = {
    method: "put",
    url: import.meta.env.VITE_API_URL + "clients/" + clientId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const res = await axios.request(config);
  return res.data;
}

async function createClient(client: IDetailFormClient) {
  const token = localStorage.getItem("token");

  const config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "clients",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: QueryString.stringify({
      name: client.name,
      phone: client.phone,
      address: client.address,
      dateOfBirth: client.dateOfBirth || undefined,
      addZaloFriend: client.addZaloFriend,
      moveToPrivateGroup: client.moveToPrivateGroup,
      isDeleted: client.isDeleted,
      referSourceID: client.referSourceID,
      clientHeathStatus: client.clientHeathStatus,
      intakeCenterID: client.intakeCenterID || undefined,
      userID: client.userID,
    }),
  };
  const res = await axios.request(config);
  return res;
}
async function editClient(clientId: number, client: IClient) {
  const token = localStorage.getItem("token");
  console.log({
    id: clientId,
    name: client.fullName,
    phone: client.phone,
    address: client.address,
    dateOfBirth: client.dateOfBirth || undefined,
    referSourceID: client.referSourceId,
    intakeCenterID: client.intakeCenterID || undefined,
  });

  const config = {
    method: "put",
    url: import.meta.env.VITE_API_URL + "clients/" + clientId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: QueryString.stringify({
      name: client.fullName,
      phone: client.phone,
      address: client.address,
      dateOfBirth: client.dateOfBirth || undefined,
      referSourceID: client.referSourceId,
      intakeCenterID: client.intakeCenterID || undefined,
    }),
  };
  const res = await axios.request(config);
  return res;
}

async function createClientCareHistory(
  clientId: number,
  content: string,
  startingDate: string,
  nextCallSchedule: string,
  visitingDate: string,
  userID: number,
  responseStatusID: number,
  note: string,
  centerId: number,
  sessionId: number,
  courseID: number
) {
  const token = localStorage.getItem("token");
  const config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "client-care-histories/" + clientId,
    headers: {
      Authorization: `Bearer ${token}`,
    },

    data: QueryString.stringify({
      content: content,
      startingDate: startingDate,
      nextCallSchedule: nextCallSchedule,
      visitingDate: visitingDate,
      userID: userID,
      responseStatusID: responseStatusID,
      note: note,
      centerID: centerId,
      sessionID: sessionId,
      courseID: courseID
    }),
  };
  const res = await axios.request(config);
  return res;
}

async function fetchClientCareHistories(clientId: number) {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "client-care-histories/" + clientId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
}

export default {
  fetchClient,
  createClient,
  fetchClientResponseStatus,
  updateDetailClient,
  createClientCareHistory,
  fetchClientCareHistories,
  editClient
};
