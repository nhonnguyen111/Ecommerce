import axiosConfig from "../../axiosConfig";

export const apiCreateNoti = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/noti/create",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetNoti = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/noti/all",
        params: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
