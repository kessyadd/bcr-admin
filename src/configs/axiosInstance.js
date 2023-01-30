import axios from "axios";
import CONST from "../utils/constant";
import { requestHandler } from "./interceptors";

const adminAxiosInstance = axios.create({
  baseURL: CONST.ADMIN_BASE_URL,
});

adminAxiosInstance.interceptors.request.use(requestHandler);

export default adminAxiosInstance;
