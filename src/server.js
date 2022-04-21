//const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { port, user, serverAddress, password, cam1Url, cam2Url } = require("./config/config");
console.log({ port, user, password, cam1Url, cam2Url });
const app = require("express")();
const { proxy, scriptUrl } = require("rtsp-relay")(app);
const cors = require("cors");

const streamHandler = (camUrl) => {
  return proxy({
    url: `rtsp://${user}:${password}@${camUrl}`,
    verbose: true,
  });
};

app.use(cors());

// the endpoint our RTSP uses
app.ws("/stream/cam1", streamHandler(cam1Url));
app.ws("/stream/cam2", streamHandler(cam2Url));

app.get("/", (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>
<canvas id='canvas2'></canvas>
  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://${serverAddress}/stream/cam1',
      canvas: document.getElementById('canvas')
    });

    loadPlayer({
      url: 'ws://${serverAddress}/stream/cam2',
      canvas: document.getElementById('canvas2')
    });
  </script>
`)
);

app.listen(port, () => {
  console.info(`server started on port ${port}`);
});
