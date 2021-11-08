import axiosClient from "./axiosClient.js";

const productApi = {
  getProductPerPage: (params) => {
    const url = `/product`;
    return axiosClient.get(url, null,{params});
  },
  getProductByCategory: (type) => {
    const url = `/product/search`;
    return axiosClient.get(url, {
      headers: { "Content-type": "application/json" },
    },{type});
  },
};

export default productApi;
