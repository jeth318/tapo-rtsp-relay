const { config } = require("dotenv");
config();
const host = process.env.HOST;
const port = process.env.PORT;
const user = process.env.TP_LINK_USER;
const serverAddress = process.env.SERVER_ADDRESS;
const password = process.env.TP_LINK_PASSWORD;
const cam1Url = process.env.TP_LINK_CAM_1_URL;
const cam2Url = process.env.TP_LINK_CAM_2_URL;
const cam1Endpoint = "/ws/api/stream/cam1";
const cam2Endpoint = "/ws/api/stream/cam2";

module.exports = {
  host,
  port,
  user,
  serverAddress,
  password,
  cam1Url,
  cam2Url,
  cam1Endpoint,
  cam2Endpoint,
};
