import axios from "axios";
import { bascURL } from "./Api";
import Cookie from "cookie-universal";
const cookie = new Cookie();
const token = cookie.get("token");
export const Axios = axios.create({
  baseURL: bascURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
