import axios from "axios";
import {SERVER_URL} from "./server-url";

const http = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

export default http;