import axios from "axios";

const url = "/api/v1/";

const API = axios.create({
  baseURL: url,
});

export default API;
