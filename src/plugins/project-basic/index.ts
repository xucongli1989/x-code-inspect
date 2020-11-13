import fs from "fs"
import path from "path"
import { BasePluginType, BasePluginOptionsType, CheckerResultType, CheckerMessageTypeEnum } from "../../type"
import * as Log from "../../log"

class Plugin implements BasePluginType {
    name = "project-basic"
    aliasName = "Basic Information Checker"
    get isSuccess() {
        return this.result.msgType != CheckerMessageTypeEnum.ERROR
    }
    result = {
        title: this.aliasName,
        msgCount: 0,
        msgType: CheckerMessageTypeEnum.INFO
    } as CheckerResultType
    run(options: BasePluginOptionsType) {
        //检查package.json文件（必须包含script.start,script.build）
        const packageJsonPath = path.resolve(options.commandArgs.codePath, "package.json")
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString())
            if (!packageJson.scripts || !packageJson.scripts.start || !packageJson.scripts.build) {
                this.result.msgCount = 1
                this.result.msgType = CheckerMessageTypeEnum.WARN
                Log.warn("File package.json must include: script.start,script.build!")
            }
        }
        //检查目录结构（必须包含src,dist,doc）
        if (!fs.existsSync(path.resolve(options.commandArgs.codePath, "src"))) {
            this.result.msgCount++
            this.result.msgType = CheckerMessageTypeEnum.WARN
            Log.warn("The project must contains directory: src !")
        }
        if (!fs.existsSync(path.resolve(options.commandArgs.codePath, "dist"))) {
            this.result.msgCount++
            this.result.msgType = CheckerMessageTypeEnum.WARN
            Log.warn("The project must contains directory: dist !")
        }
        if (!fs.existsSync(path.resolve(options.commandArgs.codePath, "doc"))) {
            this.result.msgCount++
            this.result.msgType = CheckerMessageTypeEnum.WARN
            Log.warn("The project must contains directory: doc !")
        }
        if (this.isSuccess) {
            Log.info("OK!")
        }
    }
}

export const ProjectBasicPlugin = new Plugin() as BasePluginType