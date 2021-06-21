const {desktopCapturer, ipcRenderer} = require("electron");


async function getScreenStream() {
  const sources = await desktopCapturer.getSources({types: ["screen"]});

  return new Promise((resolve, reject) => {
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
      resolve(stream)
    }, (err) => {
      console.log(err)
    })
  });
}

const pc = new window.RTCPeerConnection({});

pc.onicecandidate = function (e) {
  console.log('candidate', JSON.stringify(e.candidate));
};

let candidates = []

async function addIceCandidate(candidate) {
  if (candidate) {
    candidates.push(candidate);
  }
  if (pc.remoteDescription && pc.remoteDescription.type) {
    for (const item of candidates) {
      await pc.addIceCandidate(new RTCIceCandidate(item))
    }
    candidates = []

  }
}

window.addIceCandidate = addIceCandidate;

async function createAnswer(offer) {
  let screenStream = await getScreenStream();
  pc.addStream(screenStream);
  await pc.setRemoteDescription(offer);
  await pc.setLocalDescription(await pc.createAnswer());
  console.log("answer", JSON.stringify(pc.localDescription));
  return pc.localDescription;
}

window.createAnswer = createAnswer
