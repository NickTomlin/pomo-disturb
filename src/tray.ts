import { Tray } from "electron"
import { displayTime } from "./src/util"
import { disabledIcon, enabledIcon } from "./src/config"

class DisturbTray {
  private tray: Tray

  constructor(tray: Tray) {
    this.tray = tray
  }

  setTitle(currentInterval: number) {
    this.tray.setTitle(displayTime(currentInterval))
  }

  enable(currentInterval: number) {
    this.tray.setImage(enabledIcon)
    this.setTitle(currentInterval)
  }

  disable() {
    this.tray.setTitle("")
    this.tray.setImage(disabledIcon)
  }
}

export default DisturbTray
