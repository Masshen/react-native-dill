import axios from "axios";
import authServiceApi from "./authService";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import config from "./config";
import userHelper from "../utils/helpers/userHelper";

const http = axios.create({
  baseURL: config.URL_API,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "none",
  },
});

const CancelToken = axios.CancelToken;
const setAuthHeader = async (config: any) => {
  const token = await authServiceApi.getToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  } else {
    config.cancelToken = new CancelToken((cancel) => cancel("No token"));
  }
  return config;
};

http.interceptors.request.use(setAuthHeader);
createAuthRefreshInterceptor(
  http,
  (failedRequest) => {
    //authServiceApi.logout();
    //userHelper.setLogout();
    return Promise.reject(`refresh token`);
  }

  // authServiceApi.refreshToken().then(async (result) => {
  //   if (result === true) {
  //     setAuthHeader(failedRequest.response.config);
  //     return Promise.resolve();
  //   }
  //   const refreshToken = await authServiceApi.getRefreshToken();
  //   if (refreshToken) {
  //     //message.error('Votre session a expiré, veuillez vous reconnecter');
  //   }
  //   // const disconnectElem = document.querySelector('.disconnect');
  //   // if (disconnectElem) {
  //   //     disconnectElem.click();
  //   // }
  //   return Promise.reject(`${refreshToken ? "Expired" : "No"} refresh token`);
  // }),
);

export default http;
