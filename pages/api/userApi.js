import axiosClient from "./axiosClient.js";

const userApi = {
  postProduct: (params) => {
    const url = "/users/post-product";
    return axiosClient.post(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      {params}
    );
  },
};

export default userApi;
