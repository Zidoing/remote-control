const eventEmitter = require("./peer-control");


function play(stream) {
  let video = document.getElementById("screen-video");
  video.srcObject = stream;
  video.onloadedmetadata = function () {
    video.play()
  };
}


eventEmitter.on("add-stream", (stream) => {
  console.log("play stream")
  play(stream)
})

console.log("start app.js")
