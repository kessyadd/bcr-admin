import axios from "axios";
import CONST from "../utils/constant";

const adminAxiosInstance = axios.create({
  baseURL: CONST.ADMIN_BASE_URL,
});

export default adminAxiosInstance;
