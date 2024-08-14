import axios from "axios";

const url = "http://localhost:8000/api/v1/";

const API = axios.create({
  baseURL: url,
});

export default API;
