import axios from 'axios';
// import { BASE_URL } from "../config/environment";

const api = axios.create({
    //   baseURL: BASE_URL,
    baseURL: 'http://localhost:3000',
});

export default api;
