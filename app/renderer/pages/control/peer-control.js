const eventEmitter = require("events");
const peer = new eventEmitter();

const {desktopCapturer} = require("electron");


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

console.log("start peer control")

module.exports = peer;
