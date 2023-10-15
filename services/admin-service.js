import bcrypt from 'bcrypt';
import UserDto from '../dtos/user-dto.js'
import ApiError from "../exceptions/api-error.js";
import AdminModel from "../models/admin-model.js";
import tokenService from "./token-service.js";

class adminService {
    async registration (username, password) {
        const newAdmin = await AdminModel.findOne({username});
        if (newAdmin) return ApiError.badRequest('Пользователь с таким именем уже существует');

        const hashedPass = await bcrypt.hash(password, 3);

        const admin = await AdminModel.create({
            username: username,
            password: hashedPass,
            accessToken: `none`,
            accessTokenExpires: `none`
        });
        const userDto = new UserDto(admin);

        return {userDto};
    }

    async login (username, password) {
        const admin = await AdminModel.findOne({username});

        if (!admin) {
            throw ApiError.badRequest(`Admin with such username wasn't found`);
        }
        const isPassEqual = await bcrypt.compare(password, admin.password);
        if(!isPassEqual) {
            throw ApiError.badRequest('Incorrect password');
        }

        const adminDto = new UserDto(admin);
        const tokens = tokenService.generateTokens({...adminDto});

        await tokenService.saveToken(adminDto.id, tokens.accessToken);

        return {...tokens, admin: adminDto};
    }

    async logout (refreshToken) {
        console.log(`service`, refreshToken);
        return await tokenService.removeToken(refreshToken);
    }

    async checkToken (accessToken) {
        if (!accessToken) throw ApiError.unauthorizedError();
        const tokenFromDb = await tokenService.findToken(accessToken);

        return new Date() - new Date(tokenFromDb.accessTokenExpires) > 0;
    }
}

export default new adminService();