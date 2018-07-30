import menubar from 'menubar'
import {join} from 'path'
import {enable, disable} from '@sindresorhus/do-not-disturb'
import Timer = NodeJS.Timer

const oneSecond = 1000
const oneMinute = oneSecond * 60
const defaultFocusPeriod = oneMinute * 15
const resources = join(__dirname, 'resources', '/')
const enabledIcon = `${resources}solid-bell.png`
const disabledIcon = `${resources}hollow-bell.png`

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
    // this is where we need to disable
    currentSnooze = setInterval(async () => {
      currentInterval = currentInterval - oneSecond
      mb.tray.setTitle(displayTime(currentInterval))
      if (currentInterval < 0) {
        await clearSnooze()
      }
    }, 1000)
  }
}

function displayNumber (number: number) : string {
  return number <= 9 ? `0${number}` : `${number}`
}

function displayTime (millisecondsLeft: number) {
  let minutes = Math.floor(millisecondsLeft / 60 / 1000)
  let seconds = (millisecondsLeft / 1000) % 60

  return `${displayNumber(minutes)}:${displayNumber(seconds)}`
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

