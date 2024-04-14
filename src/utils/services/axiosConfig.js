import axios from "axios";
import { LOCAL_URL, TESTING_URL } from "./constants";

const url = import.meta.env.MODE === "production" ? TESTING_URL : LOCAL_URL;

export const ubuntuApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Expose-Headers": "Authorization",
  },
});
