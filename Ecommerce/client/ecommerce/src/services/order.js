import axiosConfig from "../../axiosConfig";
export const apiCreateOrder = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/order/create",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetOrderCustomer = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/order/order-customer",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetOrderDetail = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/order/order-detail`,
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetOrderShop = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/order/order-shop",
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdateOrderShop = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/order/update-order",
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
