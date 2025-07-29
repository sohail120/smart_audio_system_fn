/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});



apiClient.interceptors.request.use((request:any)=> {
  try {
    if (typeof FormData !== "undefined" && request.data instanceof FormData) {
      request.headers["Content-Type"] = "multipart/form-data";
    } else {
      request.headers["Content-Type"] = "application/json";
    }
    return request;
  } catch (error) {
    return error;
  }
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data.error) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error?.response?.data) {
      console.log({ error: error });
      return Promise.reject(error.response?.data);
    }
    if (error?.response) {
      console.log({ error: error?.response });
      return Promise.reject(error?.response);
    }
    return Promise.reject(error);
  }
);

export default apiClient;