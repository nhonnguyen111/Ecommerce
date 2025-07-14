import axiosAPI from "../../axiosAPI";

export const apigetProvince = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosAPI.get("/p/");
      if (response?.status === 200 && response?.data) {
        resolve(response.data);
      } else {
        reject(new Error("Không thể lấy danh sách tỉnh thành."));
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const apigetDistricts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosAPI.get("/d/");
      if (response?.status === 200 && response?.data) {
        resolve(response.data);
      } else {
        reject(new Error("Không thể lấy danh sách quận huyện."));
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const apigetWards = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosAPI.get("/w/");
      if (response?.status === 200 && response?.data) {
        resolve(response.data);
      } else {
        reject(new Error("Không thể lấy danh sách phường xã."));
      }
    } catch (error) {
      reject(error);
    }
  });
};
