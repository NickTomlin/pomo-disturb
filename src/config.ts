import { join } from "path"

const oneSecond = 1000
const oneMinute = oneSecond * 60
const defaultFocusPeriod = oneMinute * 25
const resources = join(__dirname, "..", "resources", "/")
const enabledIcon = `${resources}solid-bell.png`
const disabledIcon = `${resources}hollow-bell.png`

export { defaultFocusPeriod, enabledIcon, disabledIcon, oneSecond }
