import menubar from 'menubar'
import {displayTime} from './src/util'
import {defaultFocusPeriod, disabledIcon, enabledIcon, oneSecond} from './src/config'
import {enable, disable} from '@sindresorhus/do-not-disturb'
import Timer = NodeJS.Timer

let currentSnooze: Timer | null = null

async function clearSnooze () {
  if (currentSnooze) { global.clearInterval(currentSnooze) }
  currentSnooze = null
  await disable()
  mb.tray.setTitle('')
  mb.tray.setImage(disabledIcon)
}

async function handleClick () {
  if (currentSnooze) {
    await clearSnooze()
  } else {
    await enable()
    let currentInterval = defaultFocusPeriod

    mb.tray.setTitle(displayTime(currentInterval))
    mb.tray.setImage(enabledIcon)
    currentSnooze = setInterval(async () => {
      currentInterval = currentInterval - oneSecond
      mb.tray.setTitle(displayTime(currentInterval))
      if (currentInterval < 0) {
        await clearSnooze()
      }
    }, 1000)
  }
}

function initialize (mb: Menubar.MenubarApp) {
  mb.tray.on('click', handleClick)
}

const mb = menubar({
  icon: disabledIcon,
  showOnRightClick: true
})

mb.on('ready', function ready() {
  initialize(mb)
  mb.app.on('quit', async function () {
    await clearSnooze()
  })
})
