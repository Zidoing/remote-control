const eventEmitter = require("./peer-control");

eventEmitter.on("add-stream", (stream) => {
  console.log("play stream")
  play(stream)
})

let video = document.getElementById("screen-video");

function play(stream) {
  video.srcObject = stream;
  video.onloadedmetadata = function () {
    video.play()
  };
}

window.onkeydown = function (e) {
  let data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    control: e.ctrlKey,
    alt: e.altKey
  }
  eventEmitter.emit("robot", "key", data)
}


window.onmouseup = function (e) {
  let data = {};

  data.clientX = e.clientX;
  data.clientY = e.clientY;

  data.video = {
    width: video.getBoundingClientRect().width,
    height: video.getBoundingClientRect().height
  }

  eventEmitter.emit("robot", "mouse", data)
};
