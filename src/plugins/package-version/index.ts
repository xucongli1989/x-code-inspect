import shell from "shelljs"
import path from "path"
import { BasePluginType, CheckerResultType, CheckerMessageTypeEnum, BasePluginOptionsType } from "../../type"
import * as Log from "../../log"

class Plugin implements BasePluginType {
    name = "x-package-version-strict-check"
    aliasName = "Package Version Checker"
    get isSuccess() {
        return this.result.msgType != CheckerMessageTypeEnum.ERROR
    }
    result = {
        title: this.aliasName,
        msgCount: 0,
        msgType: CheckerMessageTypeEnum.INFO
    } as CheckerResultType
    run(options: BasePluginOptionsType) {
        const cmd = path.join(options.commandArgs.codePath, "node_modules/.bin/x-package-version-strict-check")
        Log.info("Executing command: ", cmd)
        const outStr: string = shell.exec(cmd, { silent: false }).stdout

        if (!outStr.includes("everything is ok")) {
            this.result.msgType = CheckerMessageTypeEnum.ERROR
            this.result.msgCount = 1
        }
        if (this.isSuccess) {
            Log.info("OK!")
        }
    }
}

export const PackageVersionPlugin = new Plugin() as BasePluginType
