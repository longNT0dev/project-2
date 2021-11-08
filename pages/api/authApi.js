import axiosClient from "./axiosClient.js";

const authApi = {
  register: (params) => {
    const url = "users/register";
    return axiosClient.post(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  },
  login: (params) => {
    const url = "users/login";

    return axiosClient.post(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  },
};

export default authApi;
