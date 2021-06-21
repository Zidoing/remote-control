const {app} = require("electron");
const handleIPC = require("./ipc")

const {create: createMainWindow} = require("./windows/main");

const {create: createControlWindow} = require("./windows/control")

app.allowRendererProcessReuse = false;
app.on("ready", () => {
  createMainWindow()
  // createControlWindow()
  handleIPC()
  require('./robot.js')()
})

