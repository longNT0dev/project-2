import axiosClient from "./axiosClient.js";

const productApi = {
  getProductPerPage: (params) => {
    const url = "/product";
    return axiosClient.get(url,{params});
  },
  getProductByCategory: (params) => {
    const url = "/product/search";
    return axiosClient.get(url,{params});
  },
  getDetailProduct: (params) => {
    const url = "/product/detail";
    return axiosClient.get(url,{params});
  }
};

export default productApi;
