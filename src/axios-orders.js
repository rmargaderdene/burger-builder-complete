import axios from "axios";

const baseURL = process.env.API_URL;

const instance = axios.create({
  baseURL: baseURL
});

export default instance;
