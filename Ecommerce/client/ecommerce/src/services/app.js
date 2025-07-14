import axiosConfig from "../../axiosConfig";
export const apigetCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/app/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apicreateCategory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/app/create",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apideleteCategory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: "/api/v1/app/delete",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdateCategory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/app/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
