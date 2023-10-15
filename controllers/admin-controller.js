import adminService from "../services/admin-service.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/token-service.js";

class adminController {

    async registration(request, response, next) {
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()) return next(ApiError.badRequest('Error during validation'), errors.array());

            const {username, password} = request.body;
            const adminData = await adminService.registration(username, password);

            return response.json(adminData);
        } catch (e) {
            next(e);
        }
    }

    async login(request, response, next) {
        try {
            const {username, password} = request.body;
            const adminData = await adminService.login(username, password);

            //The res.cookie() method is used for setting the cookie name to value. The value parameter can be a string or an object converted to JSON.
            // if https - to add 'flagSecure: true
            response.cookie('accessToken', adminData.accessToken, {maxAge: 10 * 60 * 60 * 1000, httpOnly: true});
            return response.json(adminData);
        } catch (e) {
            next(e);
        }
    }

    async logout(request, response, next) {
        console.log('request', request.headers);
        try {
            const {refreshToken} = request.cookies;
            const token = await adminService.logout(refreshToken);
            response.clearCookie('refreshToken');
            return response.json(token);
        } catch (e) {
            next(e);
        }
    }

    async checkToken(request, response, next) {
        try {
            const accessToken = request.cookies.accessToken;
            const userData = await adminService.checkToken(accessToken);

            if (userData) await tokenService.removeToken(accessToken) && response.clearCookie(`accessToken`);
            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new adminController();