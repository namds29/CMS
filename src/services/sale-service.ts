import axios from "axios";
import QueryString from "qs";
import { ICreateFormClient } from "../shared/interfaces/sale-types";

async function fetchClient(page: number, per_page: number) {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "clients",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      perPage: per_page,
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
async function updateStatusAddZalo(
  clientId: number,
  addZaloFriend: boolean,
  userID: number
) {
  const token = localStorage.getItem("token");
  const data = QueryString.stringify({ addZaloFriend, userID });
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
async function updateStatusMoveToPrivateGroup(
  clientId: number,
  moveToPrivateGroup: boolean,
  userID: number
) {
  const token = localStorage.getItem("token");
  const data = QueryString.stringify({ moveToPrivateGroup, userID });
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

async function createClient({
  name,
  phone,
  address,
  dateOfBirth,
  referSource,
  clientHeathStatus,
  userID,
}: ICreateFormClient) {
  const token = localStorage.getItem("token");

  const config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "clients",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: QueryString.stringify({
      name,
      phone,
      address,
      dateOfBirth,
      referSource,
      clientHeathStatus,
      userID,
    }),
  };
  const res = await axios.request(config);
  return res;
}

async function createClientCareHistory(
  clientId: number,
  content: string,
  startingDate: string,
  userID: number,
  responseStatus: number
) {
  const token = localStorage.getItem("token");

  const config = {
    method: "post",
    url: import.meta.env.VITE_API_URL + "client-care-histories/"+ clientId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: QueryString.stringify({
      content,
      startingDate,
      userID,
      responseStatus,
    }),
  };
  const res = await axios.request(config);
  return res;
}

async function fetchClientCareHistories(clientId: number) {
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: import.meta.env.VITE_API_URL + "client-care-histories/"+ clientId,
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
  updateStatusAddZalo,
  updateStatusMoveToPrivateGroup,
  createClientCareHistory,
  fetchClientCareHistories
};
