const {ipcMain} = require("electron");
const robot = require("robotjs");
const vkey = require("vkey");

function handleMouse(data) {
  // data {clientX, clientY, screen: {width, height}, video: {width, height}}
  let x = data.clientX * data.screen.width / data.video.width
  let y = data.clientY * data.screen.height / data.video.height

  robot.moveMouse(x, y);
  robot.mouseClick();

}


function handleKey(data) {
  // data {keyCode, meta, alt, ctrl, shift}
  const modifiers = []
  if (data.meta) modifiers.push('meta')
  if (data.alt) modifiers.push('alt')
  if (data.ctrl) modifiers.push('ctrl')
  if (data.shift) modifiers.push('shift')
  const key = vkey[data.keyCode].toLowerCase();

  if (key[0] !== '<') {
    robot.keyTap(key.modifiers);
  }


}

module.exports = function () {
  ipcMain.on("robot", (e, type, data) => {
    if (type === 'mouse') {
      handleMouse(data)
    } else if (type === 'key') {
      handleKey(data)
    }
  });
}
