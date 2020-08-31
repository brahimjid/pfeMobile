import { Platform } from "react-native";
import axios from "axios";
//"http://10.0.2.2:8000/api"
let url =
  Platform.OS === "android"
    ? "http://192.168.1.102:1234/api"
    : "http://pfe.mr/api";
export default axios.create({
  baseURL: url,
});
