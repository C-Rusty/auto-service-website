import jwt from 'jsonwebtoken';
import AdminModel from "../models/admin-model.js";

class tokenService {

    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, {expiresIn: '10h'});
        return {accessToken}
    }

    static validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    static validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    static async saveToken(adminId, refreshToken) {
        return AdminModel.findOneAndUpdate(
            {_id: adminId},
            {
                accessToken: refreshToken,
                accessTokenExpires: new Date(Date.parse(new Date()) + (10 * 60* 60 * 1000)).toString().toString().slice(0, 24)
            });
    }

    static async removeToken(refreshToken) {
        return AdminModel.findOneAndUpdate(
            {refreshToken: refreshToken},
            {refreshToken: `none`, accessTokenExpires: 'none'}
        );
    }

    static async findToken(refreshToken) {
        return AdminModel.findOne({refreshToken});
    }

}

export default tokenService;