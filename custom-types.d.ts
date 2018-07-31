/// <reference types="electron" />

declare module "@sindresorhus/do-not-disturb" {
  export function isEnabled(): Promise<boolean>
  export function enable(): Promise<void>
  export function disable(): Promise<void>
  export function toggle(force: boolean): Promise<void>
}

// these are manually pulled in because the menubar types
// depend on an older version of Electron
// and that can lead to duplicate type warnings

/* tslint:disable */
// Project: https://github.com/maxogden/menubar
// Definitions by: rhysd <https://rhysd.github.io>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace Menubar {
  type Position =
    | "trayLeft"
    | "trayBottomLeft"
    | "trayRight"
    | "trayBottomRight"
    | "trayCenter"
    | "trayBottomCenter"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "topCenter"
    | "bottomCenter"
    | "center"
  type TrayBounds =
    | "trayLeft"
    | "trayBottomLeft"
    | "trayRight"
    | "trayBottomRight"
    | "trayCenter"
    | "trayBottomCenter"
  interface ElectronPositioner {
    move(pos: Position): void
    calculate(pos: Position, bounds?: TrayBounds): Electron.Point
  }
  class MenubarApp extends NodeJS.EventEmitter {
    public app: Electron.App
    public window: Electron.BrowserWindow
    public tray: Electron.Tray
    positioner: ElectronPositioner

    setOption(opt: string, value: any): void
    getOption(opt: string): any
    showWindow(): void
    hideWindow(): void
  }
  interface MenubarOptions extends Electron.BrowserWindowConstructorOptions {
    dir?: string
    index?: string
    tooltip?: string
    tray?: Electron.Tray
    preloadWindow?: boolean
    alwaysOnTop?: boolean
    showOnAllWorkspaces?: boolean
    windowPosition?: Position
    showDockIcon?: boolean
    showOnRightClick?: boolean
  }
}

declare module "menubar" {
  const ctor: (opts?: Menubar.MenubarOptions) => Menubar.MenubarApp
  export = ctor
}
