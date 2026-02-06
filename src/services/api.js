import axios from "axios";

const api = axios.create({
  baseURL: "https://money-manager-backend-cyp6.onrender.com",

});

export default api;
