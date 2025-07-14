import axios from "axios";
const baseURL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  function (config) {
    // chạy  hàm trước khi request
    // gắn token vào header
    let token =
      window.localStorage.getItem("persist:auth") &&
      JSON.parse(window.localStorage.getItem("persist:auth"))?.token.slice(
        1,
        -1
      );
    config.headers = {
      Authorization: token ? `Bearer ${token}` : null,
    };
    return config;
  },
  function (error) {
    // trả lỗi
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    //refresh token
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
