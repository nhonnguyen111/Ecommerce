import axiosConfig from "../../axiosConfig";
export const apiCreateDelivery = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/delivery/create",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetDelivery = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/delivery/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdateDelivery = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/delivery/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apideleteDelivery = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: "/api/v1/delivery/delete",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
