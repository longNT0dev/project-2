import axios from "axios";
// chuyen doi input thanh params
import queryString from "query-string";

const axiosClient = axios.create({
  // Thac mac ve process.env not work
  baseURL: "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    //handle token
  (config) => {
    const token = localStorage.jwt;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
  
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    //handle error
    throw error;
  }
);

export default axiosClient;
