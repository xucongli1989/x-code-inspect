import shell from "shelljs"
import { BasePluginType, BasePluginOptionsType, CheckerResultType, CheckerMessageTypeEnum } from "../../type"
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
        const cmd = `cd ${options.commandArgs.codePath} && x-package-version-strict-check`
        Log.info("Executing command: ", cmd)
        let outStr: string = shell.exec(cmd, { silent: true }).stdout

        if (!outStr.includes("everything is ok")) {
            this.result.msgType = CheckerMessageTypeEnum.ERROR
            this.result.msgCount = 1
            Log.error(outStr)
        }
        if (this.isSuccess) {
            Log.info("OK!")
        }
    }
}

export default <BasePluginType>new Plugin()