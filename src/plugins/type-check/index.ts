import shell from "shelljs"
import { BasePluginType, CheckerResultType, CheckerMessageTypeEnum } from "../../type"
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
    run() {
        //开始运行检查
        const cmd = `tsc --noEmit`
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
