// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require("ansicolor").nice
const log = require("ololog").configure({ tag: true, locate: false })

export function redStyle(str: string): any {
    return (str as any).dim.red
}

export function greenStyle(str: string): any {
    return (str as any).dim.green
}

export function info(...args: any[]): void {
    log.info(...args)
}

export function warn(...args: any[]): void {
    log.warn(...args)
}

export function error(...args: any[]): void {
    log.error(...args)
}
