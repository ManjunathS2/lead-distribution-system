import axios from "axios";

// Create an Axios Instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", //Backend URL
});


API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
