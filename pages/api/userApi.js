import axiosClient from "./axiosClient.js";

const userApi = {
  postProduct: (params) => {
    const url = "/users/post-product";
    return axiosClient.post(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  },
  checkProduct: (params) => {
    const url = "/users/check-product";
    return axiosClient.patch(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  },
  getInfo:() => {
    const url = "/users/info";
    return axiosClient.get(
      url,
      {
        headers: { "Content-type": "application/json" },
      }
    );
  },
  updateInfo:(params) => {
    const url = "/users/update-info";
    return axiosClient.patch(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  }
};

export default userApi;
