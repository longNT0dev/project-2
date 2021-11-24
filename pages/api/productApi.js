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
  },
  getProductWaiting: () => {
    const url = "/product/waiting-product";
    return axiosClient.get(url);
  },
  getProductChecking: () => {
    const url = "/product/admin/waiting-product";
    return axiosClient.get(url);
  }
};

export default productApi;
