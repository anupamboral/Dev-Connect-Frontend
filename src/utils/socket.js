import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  return io(BASE_URL);
};
//* auth is added for verification and safety and in backend we will just verify it socket.js
