import axios from "axios";
import config from "./config";

//const config = require("./config");

export default axios.create({
  baseURL: config.URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});
