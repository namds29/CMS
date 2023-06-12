import axios from "axios";
import QueryString from "qs";
import {  ICreateFormClient } from "../shared/interfaces/sale-types";



async function fetchClient(page: number, per_page: number) {
    const token = localStorage.getItem('token')
    let config = {
        method: "get",
        url: import.meta.env.VITE_API_URL + "clients",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: page,
            perPage: per_page
        }
    };
    const res = await axios.request(config);
    return res.data;
}
async function fetchReferSource() {
    const token = localStorage.getItem('token')
    let config = {
        method: "get",
        url: import.meta.env.VITE_API_URL + "refer-sources",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.request(config);
    return res.data;
}
async function createClient({ name, phone, address, dateOfBirth, referSource }: ICreateFormClient) {
    const token = localStorage.getItem('token')

    let config = {
        method: "post",
        url: import.meta.env.VITE_API_URL + "clients",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: QueryString.stringify({ name, phone, address, dateOfBirth, referSource })
    };
    const res = await axios.request(config);
    return res;
}

export default { fetchClient, fetchReferSource, createClient }
