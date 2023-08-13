import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import Cookies from "js-cookie";

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "https://api.equipment-build.com/api/v1",
    headers: {
      Accept: "application/json",
    },
  }),
  options
);

client.interceptors.request.use((config) => {
  config.headers["access-token"] = Cookies.get("_access_token");
  config.headers["uid"] = Cookies.get("_uid");
  config.headers["client"] = Cookies.get("_client");

  return config;
});

export default client;
