import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL, // đổi IP sang server của bạn
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});


export default api;