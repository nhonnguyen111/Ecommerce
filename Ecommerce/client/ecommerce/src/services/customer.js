import axiosConfig from "../../axiosConfig";

export const apigetCurrentUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/customer/current-user",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiEditUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/customer/edit-user",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdateAvt = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/upload",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiEditAvtUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/customer/edit-avt",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdatePasswordUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/customer/password",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
