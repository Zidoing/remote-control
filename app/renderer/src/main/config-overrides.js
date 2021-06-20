// 用来可以直接在项目里面 import from electron 避免出错
const {override} = require("customize-cra");

function addRendererTarget(config) {
  config.target = "electron-renderer";
  return config
}


module.exports = override(addRendererTarget)
