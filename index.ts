import Menubar from 'menubar'
import Disturb from './src/disturb'
import {defaultFocusPeriod, disabledIcon} from './src/config'

const menubar = Menubar({
  icon: disabledIcon,
  showOnRightClick: true
})

menubar.on('ready', () => {
  const disturb = new Disturb(menubar, defaultFocusPeriod) // TODO: make this configurable
  disturb.attachListeners()
})
