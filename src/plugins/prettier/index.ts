import shell from "shelljs"
import path from "path"
import fs from "fs"
import { BasePluginType, BasePluginOptionsType, CheckerResultType, CheckerMessageTypeEnum } from "../../type"
import * as Log from "../../log"

class Plugin implements BasePluginType {
    name = "prettier"
    aliasName = "Code Format Checker"
    get isSuccess() {
        return this.result.msgType != CheckerMessageTypeEnum.ERROR
    }
    result = {
        title: this.aliasName,
        msgCount: 0,
        msgType: CheckerMessageTypeEnum.INFO
    } as CheckerResultType
    run(options: BasePluginOptionsType) {
        //项目中已有的配置文件
        const projectConfigPath = path.resolve(options.commandArgs.codePath, ".prettierrc.json")
        const projectIgnoreConfigPath = path.resolve(options.commandArgs.codePath, ".prettierignore")
        //清空项目中的已有配置文件
        Log.info("Clear project's config file about Prettier!")
        fs.writeFileSync(projectConfigPath, "")
        fs.writeFileSync(projectIgnoreConfigPath, "")

        //默认配置
        const configPath = path.resolve(options.commandArgs.packagePath, "dist/config/.prettierrc.json")
        const ignoreConfigPath = path.resolve(options.commandArgs.packagePath, "dist/config/.prettierignore")
        const configObject = JSON.parse(fs.readFileSync(configPath).toString())
        const ignoreConfig = fs.readFileSync(ignoreConfigPath).toString() + "\n"

        //组装cmd脚本命令
        const ignorePathSet: Set<string> = new Set()
        if (options.commandArgs.checkDir) {
            ignorePathSet.add("/*")//先要排除所有
            options.commandArgs.checkDir.split(',').forEach(x => {
                ignorePathSet.add(`!/${x}`)//基于上面排除的范围内，再剔除
            })
        }
        if (options.commandArgs.ignoreCheckDir) {
            options.commandArgs.ignoreCheckDir.split(',').forEach(x => {
                ignorePathSet.add(x)
            })
        }

        //生成配置文件（prettierignore）
        const ignoreConfigStr = ignoreConfig + [...ignorePathSet].map(x => `${x}\n`).join('')
        fs.writeFileSync(projectIgnoreConfigPath, ignoreConfigStr)
        Log.info("Updated file: ", projectIgnoreConfigPath, ignoreConfigStr)

        //生成配置文件（prettierrc）
        fs.writeFileSync(projectConfigPath, JSON.stringify(configObject, null, 2))
        Log.info("Updated file: ", projectConfigPath, configObject)

        //开始运行检查
        const cmd = `cd ${options.commandArgs.codePath} && prettier --check ./**/* --config ${projectConfigPath} --ignore-path ${projectIgnoreConfigPath} --no-editorconfig`
        Log.info("Executing command: ", cmd)
        const execResult = shell.exec(cmd, { silent: true })

        if (execResult.code != 0) {
            const matchList = /^/gm.exec(execResult.stdout) || []
            this.result.msgType = CheckerMessageTypeEnum.WARN
            this.result.msgCount = matchList.length//不准确，目前都为1
            Log.warn(execResult.stdout)
        }
        if (this.isSuccess) {
            Log.info("OK!")
        }
    }
}

export default <BasePluginType>new Plugin()