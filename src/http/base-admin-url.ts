import axios from "axios";
import {SERVER_URL} from "./server-url";

const httpAdminApi = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL
});

// httpAdminApi.interceptors.request.use((config: any) => {
//     if (config === undefined) return console.log(`the config in interceptor is undefined`);
//     config.headers.Authorization = `Bearer ${config.headers.Authorization.split(` `)[1]}`;
//     console.log('config', config);
//     return config;
// });

export default httpAdminApi;