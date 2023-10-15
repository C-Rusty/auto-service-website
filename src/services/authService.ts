import $httpAdminApi from "../http/base-admin-url";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../interface/auth-response";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $httpAdminApi.post<AuthResponse>('/login', {username, password});
    }

    static async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $httpAdminApi.post<AuthResponse>('/registration', {username, password});
    }
}