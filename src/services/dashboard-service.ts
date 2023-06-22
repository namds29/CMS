import axios from "axios";

async function fetchSaleToDo() {
    const token = localStorage.getItem("token");
    const config = {
        method: "get",
        url: import.meta.env.VITE_API_URL + "clients/saleToDo",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.request(config);
    return res.data;
}
export default {fetchSaleToDo}