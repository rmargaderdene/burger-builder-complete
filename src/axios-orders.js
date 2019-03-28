import axios from "axios";

const instance = axios.create({
  //baseURL: "https://react-my-burger-1327f.firebaseio.com"
  baseURL: 'http://localhost:8080/'
});

export default instance;
