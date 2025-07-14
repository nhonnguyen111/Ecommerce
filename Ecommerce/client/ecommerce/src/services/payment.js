import axiosConfig from "../../axiosConfig";
export const apicreatePayment = (amount) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/pay/create-payment`,
        data: { amount },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCreatePayUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/pay/create-payuser`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetPaymentById = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/pay/all`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetCallback = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/pay/update`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
