import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-url.com",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        userMessage: "No internet connection.",
      });
    }

    const status = error.response.status;

    if (status === 404) {
      return Promise.reject({
        userMessage: "Requested data not found.",
      });
    }

    if (status >= 500) {
      return Promise.reject({
        userMessage: "Internal server error. Please try again later.",
      });
    }

    return Promise.reject({
      userMessage: "Something went wrong.",
    });
  }
);

export default api;
