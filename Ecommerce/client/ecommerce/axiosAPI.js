import axios from "axios";

const externalInstance = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
});

externalInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default externalInstance;
