import axiosConfig from "../../axiosConfig";

export const apiCreateShop = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/shop/create",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetShop = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/shop/all",
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductofShop = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/shop/product",
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiEditShopName = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/shop/edit-shop",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateAvtShop = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/shop/edit-avt",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetShopAdmin = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/shop/all-admin",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdateShopAdmin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/shop/update-status",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
