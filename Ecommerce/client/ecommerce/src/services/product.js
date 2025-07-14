import axiosConfig from "../../axiosConfig";

export const apigetProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/product/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductById = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/product/id`,
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductByShopId = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/product/product-store`,
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apicreateProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/product/create`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductQuery = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/product/search`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductShopQuery = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/product/search-shop`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiupdateProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/product/update`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiHieProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/product/hide`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductSelling = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/product/product-selling",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductNew = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/product/product-new",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductSellingByShopId = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/product/product-selling-shop`,
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetProductAll = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/product/all-admin",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiupdateStatusProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/product/update-status",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
