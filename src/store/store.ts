import {IAdmin} from "../interface/IAdmin";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/authService";
import {AuthResponse} from "../interface/auth-response";
import $httpAdminApi from "../http/base-admin-url";

export default class Store {
    admin = {} as IAdmin;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setAdmin(admin: IAdmin) {
        this.admin = admin;
    }

    async registration(username: string | undefined, password: string | undefined) {
        try {
            const response = await AuthService.registration(username!, password!);
            console.log(response);
            this.setAdmin(response.data.admin)
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async login(username: string | undefined, password: string | undefined) {
        try {
            const response = await AuthService.login(username!, password!);
            console.log(`LOGIN`, response)

            this.setAuth(true);
            this.setAdmin(response.data.admin);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await $httpAdminApi.get<AuthResponse>(`/check-auth`, {withCredentials: true});
            console.log(`checkAuth`, response.data);
            const isTokenExpired = response.data;
            console.log(`token is expired: ${isTokenExpired}`)

            if (isTokenExpired) {
                this.setAuth(false);
                return false;
            } else {
                this.setAuth(true);
                this.setAdmin(response.data.admin);
                return true;
            }

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
}