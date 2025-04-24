import shell from "shelljs"
import path from "path"
import fs from "fs"
import JsKit from "x-js-kit"
import del from "del"
import { BasePluginType, BasePluginOptionsType, CheckerResultType, CheckerMessageTypeEnum } from "../../type"
import * as Log from "../../log"

class Plugin implements BasePluginType {
    name = "eslint"
    aliasName = "Code Standard Checker"
    get isSuccess() {
        return this.result.msgType != CheckerMessageTypeEnum.ERROR
    }
    result = {
        title: this.aliasName,
        msgCount: 0,
        msgType: CheckerMessageTypeEnum.INFO
    } as CheckerResultType
    run(options: BasePluginOptionsType) {
        //删除项目中已有的eslint配置文件
        del.sync(path.resolve(options.commandArgs.codePath, ".eslintrc.js"))
        del.sync(path.resolve(options.commandArgs.codePath, ".eslintrc.json"))
        del.sync(path.resolve(options.commandArgs.codePath, ".eslintrc.yaml"))
        del.sync(path.resolve(options.commandArgs.codePath, ".eslintrc.yml"))
        del.sync(path.resolve(options.commandArgs.codePath, ".eslintrc"))
        del.sync(path.resolve(options.commandArgs.codePath, ".eslintignore"))
        Log.info("Clear project's config file about ESLint!")

        //替换 eslint-plugin-react-hooks 源码
        Log.info("Replace [eslint-plugin-react-hooks] source to ignore [be called conditionally] of hooks tips...")
        const copyCmd = `cpy ${path.resolve(options.commandArgs.packagePath, "dist/npm-source/eslint-plugin-react-hooks/cjs/*")} ${path.resolve(options.commandArgs.codePath, "node_modules/eslint-plugin-react-hooks/cjs/")}`
        Log.info("Executing command: ", copyCmd)
        shell.exec(copyCmd)

        //添加新的配置文件
        const projectConfigPath = path.resolve(options.commandArgs.codePath, ".eslintrc.json")
        const projectIgnoreConfigPath = path.resolve(options.commandArgs.codePath, ".eslintignore")
        fs.writeFileSync(projectConfigPath, "")
        fs.writeFileSync(projectIgnoreConfigPath, "")

        //默认的eslint配置文件
        const configPath = path.resolve(options.commandArgs.packagePath, "dist/config/.eslintrc.json")
        const ignoreConfigPath = path.resolve(options.commandArgs.packagePath, "dist/config/.eslintignore")
        const configObject = JSON.parse(fs.readFileSync(configPath).toString())
        const ignoreConfigStr = fs.readFileSync(ignoreConfigPath).toString() + "\n"

        //生成配置文件（eslintignore）
        fs.writeFileSync(projectIgnoreConfigPath, ignoreConfigStr)
        Log.info("Updated file: ", projectIgnoreConfigPath, ignoreConfigStr)

        //生成配置文件（eslintrc.json）
        const eslintConfig = { ...configObject }
        if (options.commandArgs.eslint_global) {
            options.commandArgs.eslint_global.split(",").forEach((k) => {
                eslintConfig.globals[k] = false
            })
        }
        if (options.commandArgs.isDebug) {
            Log.info(eslintConfig)
        }
        const eslintConfigStr = JSON.stringify(eslintConfig, null, 2)
        fs.writeFileSync(projectConfigPath, eslintConfigStr)
        Log.info("Updated file: ", projectConfigPath)

        //开始运行检查
        const checkCmd = `${path.join(options.commandArgs.codePath, "node_modules/.bin/eslint")} ${options.commandArgs.codePath} --ext .js,.jsx,.ts,.tsx,.vue,.mjs,.cjs --max-warnings 0 `
        Log.info("Executing command: ", checkCmd)
        const execResult = shell.exec(checkCmd, { silent: false })
        const outStr: string = execResult.stdout
        if (execResult.code != 0) {
            this.result.msgType = CheckerMessageTypeEnum.ERROR
            Log.error("Run eslint error, exit code :", execResult.code)
        }

        if (outStr) {
            this.result.msgType = CheckerMessageTypeEnum.ERROR
            this.result.msgCount = 1
            const matchList = /(\d+)\s+problems/.exec(outStr)
            if (matchList && matchList.length && matchList[1]) {
                this.result.msgCount = JsKit.common.convert.toInt(matchList[1])
            }
            return
        }
        if (this.isSuccess) {
            Log.info("OK!")
        }
    }
}

export const EslintPlugin = new Plugin() as BasePluginType
