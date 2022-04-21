//const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { port, user, serverAddress, password, cam1HDUrl, cam2HDUrl, cam1SDUrl, cam2SDUrl } = require("./config/config");
console.log({ port, user, password });
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
app.ws("/stream/sd/cam1", streamHandler(cam1SDUrl));
app.ws("/stream/hd/cam1", streamHandler(cam1HDUrl));
app.ws("/stream/sd/cam2", streamHandler(cam2SDUrl));
app.ws("/stream/hd/cam2", streamHandler(cam2HDUrl));

app.get("/hd", (req, res) =>
  res.send(`
  <canvas id='canvas' style="width: 40%;"></canvas>
<canvas id='canvas2' style="width: 40%;" ></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://${serverAddress}/stream/hd/cam1',
      canvas: document.getElementById('canvas')
    });

    loadPlayer({
      url: 'ws://${serverAddress}/stream/hd/cam2',
      canvas: document.getElementById('canvas2')
    });
  </script>
`)
);

app.get("/sd", (req, res) =>
  res.send(`
<canvas id='canvas3'></canvas>
<canvas id='canvas4'></canvas>
  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://${serverAddress}/stream/sd/cam1',
      canvas: document.getElementById('canvas3')
    });

    loadPlayer({
      url: 'ws://${serverAddress}/stream/sd/cam2',
      canvas: document.getElementById('canvas4')
    });
  </script>
`)
);

app.listen(port, () => {
  console.info(`server started on port ${port}`);
});
