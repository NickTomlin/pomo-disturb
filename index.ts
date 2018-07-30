import Menubar from 'menubar'
import {defaultFocusPeriod, disabledIcon} from './src/config'
import Disturb from './src/disturb'

const menubar = Menubar({
  icon: disabledIcon,
  showOnRightClick: true
})

menubar.on('ready', () => {
  const disturb = new Disturb(menubar, defaultFocusPeriod) // TODO: make this configurable
  disturb.attachListeners()
})
