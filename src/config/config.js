const { config } = require("dotenv");
config();
const host = process.env.HOST;
const port = process.env.PORT;
const user = process.env.TP_LINK_USER;
const serverAddress = process.env.SERVER_ADDRESS;
const password = process.env.TP_LINK_PASSWORD;
const cam1HDUrl = process.env.CAM_1_HD_URL;
const cam1SDUrl = process.env.CAM_1_SD_URL;
const cam2HDUrl = process.env.CAM_2_HD_URL;
const cam2SDUrl = process.env.CAM_2_SD_URL;
const cam1Endpoint = "/ws/api/stream/cam1";
const cam2Endpoint = "/ws/api/stream/cam2";

module.exports = {
  host,
  port,
  user,
  serverAddress,
  password,
  cam1HDUrl,
  cam1SDUrl,
  cam2HDUrl,
  cam2SDUrl,
  cam1Endpoint,
  cam2Endpoint,
};
