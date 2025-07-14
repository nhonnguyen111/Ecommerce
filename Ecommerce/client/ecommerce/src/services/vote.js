import axiosConfig from "../../axiosConfig";

export const apiCreateVote = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/vote/create",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetVote = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/vote/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetVoteReply = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/vote/all-reply",
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apigetVoteByProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/vote/product",
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateVoteReply = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/vote/create-reply",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
