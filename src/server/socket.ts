import io from "socket.io-client";
import {SERVER_URL} from "../http/server-url";

const socket = io(SERVER_URL);

export default socket;