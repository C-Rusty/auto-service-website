import {createProxyMiddleware, RequestHandler} from "http-proxy-middleware";
import {SERVER_URL} from "../http/server-url";

module.exports = function (app: { use: (arg0: string, arg1: RequestHandler) => void; }) {
    app.use(
        '/',
        createProxyMiddleware({
            target: SERVER_URL,
            changeOrigin: true
        })
    )
}