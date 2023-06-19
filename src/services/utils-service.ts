import axios from "axios";

async function fetchReferSource() {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "refer-sources",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
}
async function fetchCourses() {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "courses",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
}
async function fetchSessions() {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "sessions",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
}
async function fetchCenters() {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    url: import.meta.env.VITE_API_URL + "centers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
}

export default { fetchReferSource, fetchCourses, fetchSessions, fetchCenters };
