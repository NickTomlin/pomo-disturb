import Timer = NodeJS.Timer
import { disable, enable } from "@sindresorhus/do-not-disturb"
import { oneSecond } from "./config"
import DisturbTray from "./tray"

class Disturb {
  private menubar: Menubar.MenubarApp
  private currentSnooze: Timer | null = null
  private tray: DisturbTray
  private readonly interval: number

  constructor(menubar: Menubar.MenubarApp, interval: number) {
    this.menubar = menubar
    this.interval = interval
    this.tray = new DisturbTray(menubar.tray)
  }

  public handleClick = async () => {
    if (this.currentSnooze) {
      await this.clearSnooze()
    } else {
      await enable()
      let currentInterval = this.interval
      this.tray.enable(currentInterval)

      this.currentSnooze = setInterval(async () => {
        currentInterval = currentInterval - oneSecond
        this.tray.setTitle(currentInterval)
        if (currentInterval < 0) {
          await this.clearSnooze()
        }
      }, oneSecond)
    }
  }

  public clearSnooze = async () => {
    if (this.currentSnooze) {
      global.clearInterval(this.currentSnooze)
    }
    this.currentSnooze = null
    this.tray.disable()
    await disable()
  }

  public attachListeners() {
    this.menubar.tray.on("click", this.handleClick)
    this.menubar.app.on("quit", this.clearSnooze)
  }
}

export default Disturb
