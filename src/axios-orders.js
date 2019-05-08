import axios from "axios";

const baseURL = process.env.API_URL;

const instance = axios.create({
  baseURL: baseURL
});

instance.defaults.headers = {
  Authorization: localStorage.getItem("token")
};

export default instance;
