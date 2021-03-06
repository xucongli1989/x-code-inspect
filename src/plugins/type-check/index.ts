import shell from "shelljs"
import path from "path"
import { BasePluginType, CheckerResultType, CheckerMessageTypeEnum, BasePluginOptionsType } from "../../type"
import * as Log from "../../log"

class Plugin implements BasePluginType {
    name = "type-check"
    aliasName = "TypeScript Type Check"
    get isSuccess() {
        return this.result.msgType != CheckerMessageTypeEnum.ERROR
    }
    result = {
        title: this.aliasName,
        msgCount: 0,
        msgType: CheckerMessageTypeEnum.INFO
    } as CheckerResultType
    run(options: BasePluginOptionsType) {
        //开始运行检查
        const cmd = `${path.join(options.commandArgs.codePath, "node_modules/.bin/tsc")} --noEmit`
        Log.info("Executing command: ", cmd)
        const execResult = shell.exec(cmd, { silent: false })

        if (execResult.code != 0) {
            this.result.msgType = CheckerMessageTypeEnum.ERROR
            this.result.msgCount = 1
            Log.error("Run type-check error, exit code :", execResult.code)
        }
        if (this.isSuccess) {
            Log.info("OK!")
        }
    }
}

export const TypeCheckPlugin = new Plugin() as BasePluginType
