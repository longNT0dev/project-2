import axiosClient from "./axiosClient.js";

const orderApi = {
  makePayment: (params) => {
    const url = "carts/order";
    return axiosClient.post(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  },
  getOrders: (params) => {
    const url = "carts/orders";
    return axiosClient.get(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  },
  cancel: (params) => {
    const url = "carts/cancel-order";

    return axiosClient.post(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  },
  undoCancel: (params) => {
    const url = "carts/cancel-undo";
    return axiosClient.post(
      url,
      {
        headers: { "Content-type": "application/json" },
      },
      { params }
    );
  }
};

export default orderApi;

