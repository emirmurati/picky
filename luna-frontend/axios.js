import axios from "axios";

const url =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1"
    : "https://picky-70o0.onrender.com/api/v1";

const API = axios.create({
  baseURL: url,
});

export default API;
