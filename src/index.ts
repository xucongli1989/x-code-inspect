import path from "path"
import fs from "fs"
import commander from "commander"
import { EventEmitter } from "events"
import callerPath from "caller-path"
import cfonts from "cfonts"
import AsTable from "as-table"
import JsKit from "x-js-kit"
import updateNotifier from "update-notifier"
import { plugins } from "./plugins"
import { CommandArgsType, CheckerType, CheckerResultType, BasePluginType, CheckerEventNameEnum } from "./type"
import * as Log from "./log"

function trimQuote(str: string) {
    if (!str) {
        return ""
    }
    return JsKit.common.string.trimString(JsKit.common.string.trimString(str, "'"), '"')
}

const commandArgs: CommandArgsType = {} as any
commandArgs.execFileRootPath = (callerPath as any)()
commandArgs.packagePath = path.resolve(commandArgs.execFileRootPath, "../../")

//package.json
const packageJson = JSON.parse(fs.readFileSync(path.resolve(commandArgs.packagePath, "package.json")).toString())

//初始化环境变量
process.env.PATH = path.resolve(commandArgs.packagePath, "node_modules/.bin") + path.delimiter + process.env.PATH

//命令
commander.version(packageJson.version)
commander
    .option("--debug", "Run as debug.", false)
    .option("--path <type>", "Project's path that you want to check.", "./")
    .option("--check-dir <type>", "Specify a directory to be scanned by code (e.g. by plug-ins such as eslint), the default is root value of --path. (multiple are separated by ,).", "")
    .option("--ignore-check-dir <type>", "Specify a directory to be no scanned by code (e.g. by plug-ins such as eslint), (multiple are separated by ,).", "")
    .option("--eslint-global <type>", "Define global variate, see eslint doc.", "")
    .parse(process.argv)
commandArgs.isDebug = commander.debug
commandArgs.codePath = path.resolve(commander.path)
commandArgs.checkDir = trimQuote(commander.checkDir)
commandArgs.ignoreCheckDir = trimQuote(commander.ignoreCheckDir)
commandArgs.eslint_global = commander.eslintGlobal

//配置处理
const errorMsgList: string[] = []
function initCheck() {
    const fts = cfonts as any
    fts.say(packageJson.name, { font: "simple" })
    Log.info(`>>>>>>>>>>>>>>>>  Welcome to use ${packageJson.name} ${packageJson.version}<<<<<<<<<<<<<<<<<`)

    //检查更新
    updateNotifier({
        pkg: packageJson,
        updateCheckInterval: 0,
        shouldNotifyInNpmScript: true
    }).notify()

    //打印当前命令
    Log.info("Executing command: ", process.argv.join(" "))

    //打印当前配置信息
    if (commandArgs.isDebug) {
        Log.info("Current config is :", commandArgs)
    }

    //代码路径检查
    if (!commandArgs.codePath) {
        errorMsgList.push("Please specify the code path to check!")
        return
    }
    if (!fs.existsSync(commandArgs.codePath)) {
        errorMsgList.push(`Code path [${commandArgs.codePath}] does not exist!`)
    }
}
initCheck()
if (errorMsgList.length) {
    Log.error(errorMsgList.join("\\n"))
    process.exit(1)
}

//执行代码检查插件
class Checker extends EventEmitter implements CheckerType {
    pluginList: BasePluginType[] = []
    timeSpent = 0
    process() {
        const sw = new JsKit.timer.StopWatch()
        const resultList: CheckerResultType[] = []
        //开始处理
        this.emit(CheckerEventNameEnum.START)
        sw.start()
        for (const plugin of this.pluginList) {
            //开始准备运行插件
            this.emit(CheckerEventNameEnum.ITEM_START, plugin.name)
            //运行插件
            plugin.run({
                commandArgs
            })
            resultList.push(plugin.result)
            //插件运行结束
            this.emit(CheckerEventNameEnum.ITEM_END, plugin)
            if (!plugin.isSuccess) {
                break
            }
        }
        sw.stop()
        this.timeSpent = sw.value / 1000
        this.emit(CheckerEventNameEnum.RESULT, resultList)
        this.emit(
            CheckerEventNameEnum.END,
            this.pluginList.every((k) => k.isSuccess)
        )
    }
}
const checker = new Checker()
checker.pluginList = plugins

checker.on(CheckerEventNameEnum.START, () => {
    Log.info("Start code checking...")
})

checker.on(CheckerEventNameEnum.ITEM_START, (name: string) => {
    Log.info(`Running plugin: [${name}]`)
})

checker.on(CheckerEventNameEnum.END, (isAllSuccess: boolean) => {
    Log.info(">>>>>>>>>>>>>>>>  Code checked!  <<<<<<<<<<<<<<<<<")
    if (!isAllSuccess) {
        process.exit(1)
    }
})

checker.on(CheckerEventNameEnum.RESULT, (resultList: CheckerResultType[]) => {
    Log.info(AsTable(resultList))
})

checker.on(CheckerEventNameEnum.ITEM_END, (plugin: BasePluginType) => {
    if (plugin.isSuccess) {
        Log.info(`Plugin execute [${plugin.name}] Succeeded!`)
    } else {
        Log.error(`Plugin execute [${plugin.name}] Failed!`)
    }
})

checker.process()
