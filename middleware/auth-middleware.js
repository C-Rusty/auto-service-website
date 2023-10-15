import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/token-service.js";

export default function authMiddleware (request, response, next) {
    try {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) return next(ApiError.unauthorizedError());

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) return next(ApiError.unauthorizedError());

        const adminData = tokenService.validateAccessToken(accessToken);
        if (!adminData) return next(ApiError.unauthorizedError());

        request.admin = adminData;
        next();
    } catch (e) {
        return next(ApiError)
    }
}