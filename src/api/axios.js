import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-url.com",
  timeout: 10000,
});

let globalErrorHandler = null;

export const registerGlobalErrorHandler = (fn) => {
  globalErrorHandler = fn;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "";

    if (!error.response) {
      message = "Server down. Please check your internet.";
    } else if (error.response.status >= 500) {
      message = "Internal server issue. Please try again later.";
    } else if (error.response.status === 404) {
      message = "Requested data not found.";
    } else {
      message = "Something went wrong.";
    }

    if (globalErrorHandler) {
      globalErrorHandler(message);
    }

    return Promise.reject(error);
  }
);

export default api;
