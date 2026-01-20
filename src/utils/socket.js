import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

//* function to get specific cookie using the name as we want the token, not other cookies, or we can also use third party libraries like js-cookie or react-cookie.
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  // console.log("cookie value " + value);
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};
const token = getCookie("token");
// console.log("token " + token);
export const createSocketConnection = () => {
  return io(BASE_URL, {
    auth: {
      token: token,
    },
    withCredentials: true, // Instructs browser to send cookies/headers
  });
};
//* auth is added for verification and safety and in backend we will just verify it in utils/socket.js.
//* if in any other project the backend url start with /api then see s3ep9 at 1h15mins but here as our backend url does not start with /api so here that configuration is required.
