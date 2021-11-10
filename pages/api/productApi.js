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
    
  }
};

export default productApi;
