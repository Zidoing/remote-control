const eventEmitter = require("events");
const peer = new eventEmitter();

const {desktopCapturer, ipcRenderer} = require("electron");


async function getScreenStream() {
  const sources = await desktopCapturer.getSources({types: ["screen"]});

  navigator.webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: sources[0].id,
        maxWidth: window.screen.width,
        maxHeight: window.screen.height
      }
    }
  }, (stream) => {
    console.log("emit add stream")
    peer.emit("add-stream", stream)
  }, (err) => {
    console.log(err)
  })

}

getScreenStream();

peer.on("robot", (type, data) => {
  if (type === "mouse") {
    data.screen = {width: window.screen.width, height: window.screen.height}
    ipcRenderer.send("robot", type, data)
  } else if (type === "key") {
    ipcRenderer.send("robot", type, data)
  }
})

console.log("start peer control")

module.exports = peer;
