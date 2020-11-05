require('ansicolor').nice
const log = require("ololog").configure({ tag: true, locate: false })

export function redStyle(str: string) {
    return (str as any).dim.red
}

export function greenStyle(str: string) {
    return (str as any).dim.green
}

export function info(...args: any) {
    log.info(...args)
}

export function warn(...args: any) {
    log.warn(...args)
}

export function error(...args: any) {
    log.error(...args)
}