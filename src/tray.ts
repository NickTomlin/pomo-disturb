import { Tray } from "electron"
import { disabledIcon, enabledIcon } from "./config"
import { displayTime } from "./util"

class DisturbTray {
  private tray: Tray

  constructor(tray: Tray) {
    this.tray = tray
  }

  public setTitle(currentInterval: number) {
    this.tray.setTitle(displayTime(currentInterval))
  }

  public enable(currentInterval: number) {
    this.tray.setImage(enabledIcon)
    this.setTitle(currentInterval)
  }

  public disable() {
    this.tray.setTitle("")
    this.tray.setImage(disabledIcon)
  }
}

export default DisturbTray
