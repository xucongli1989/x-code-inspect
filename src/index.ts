import path from "path"
import fs from "fs"
import commander from "commander"
import { EventEmitter } from "events"
import callerPath from "caller-path"
import cfonts from "cfonts"
import AsTable from "as-table"
import JsKit from "x-js-kit"
import updateNotifier from "update-notifier"
import plugins from "./plugins"
import { CommandArgsType, CheckerType, CheckerResultType, BasePluginType, CheckerEventNameEnum, CheckerMessageTypeEnum, EnvEnum } from "./type"
import * as Log from "./log"

const defaultEnvList = [EnvEnum.AMD, EnvEnum.BROWSER, EnvEnum.COMMONJS, EnvEnum.COMMONJS, EnvEnum.ES6, EnvEnum.NODE]
const commandArgs: CommandArgsType = {} as any
commandArgs.execFileRootPath = (callerPath as any)()
commandArgs.packagePath = path.resolve(commandArgs.execFileRootPath, "../../")

//package.json
const packageJson = JSON.parse(fs.readFileSync(path.resolve(commandArgs.packagePath, "package.json")).toString())

//初始化环境变量
process.env.PATH = path.resolve(commandArgs.packagePath, "node_modules/.bin") + path.delimiter + process.env.PATH

//命令
const pluginNameStr = plugins.map(k => k.name).join(", ")
commander.version(packageJson.version)
commander.option('--debug', "Run as debug.", false)
    .option('--path <type>', 'Project\'s path that you want to check.', "./")
    .option('--check-dir <type>', 'Specify a directory to be scanned by code (e.g. by plug-ins such as eslint), the default is root value of --path. (multiple are separated by ,).', "")
    .option('--ignore-check-dir <type>', 'Specify a directory to be no scanned by code (e.g. by plug-ins such as eslint), (multiple are separated by ,).', "")
    .option('--ignore-plugin <type>', `Ignored plugin name list (multiple are separated by ,), all plugins are [${pluginNameStr}].`, "")
    .option("--enable-plugin <type>", `Enable plugin name list (multiple are separated by ,), all plugins are [${pluginNameStr}].`, "")
    .option('--eslint-global <type>', 'Define global variate, see eslint doc.', "")
    .option('--eslint-env <type>', 'The environment in which the code to be checked is running, see eslint doc.', "amd,browser,commonjs,commonjs,es6,node")
    .parse(process.argv)
commandArgs.isDebug = commander.debug
commandArgs.codePath = path.resolve(commander.path)
commandArgs.checkDir = commander.checkDir
commandArgs.ignoreCheckDir = commander.ignoreCheckDir
commandArgs.ignorePluginNameList = commander.ignorePlugin ? commander.ignorePlugin.toLowerCase().split(',') : []
commandArgs.enablePluginNameList = commander.enablePlugin ? commander.enablePlugin.toLowerCase().split(',') : []
commandArgs.eslint_global = commander.eslintGlobal
commandArgs.eslint_env = commander.eslintEnv || defaultEnvList.join(",").toLowerCase()


//配置处理
const errorMsgList: string[] = [];
(() => {
    (cfonts as any).say(packageJson.name, { font: "simple" })
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
        return
    }
})()
if (errorMsgList.length) {
    Log.error(errorMsgList.join("\\n"))
    process.exit(1)
}

//执行代码检查插件
class Checker extends EventEmitter implements CheckerType {
    pluginList: BasePluginType[] = []
    timeSpent = 0
    process() {
        const sw = new JsKit.timer.stopWatch()
        const resultList: CheckerResultType[] = []
        //开始处理
        this.emit(CheckerEventNameEnum.START)
        sw.start()
        this.pluginList.forEach(plugin => {
            //开始准备运行插件
            this.emit(CheckerEventNameEnum.ITEM_START, plugin.name)
            //运行插件
            const pLowerName = plugin.name.toLowerCase()
            if (commandArgs.ignorePluginNameList.includes(pLowerName) || (commandArgs.enablePluginNameList.length && !commandArgs.enablePluginNameList.includes(pLowerName))) {
                plugin.result.msgType = CheckerMessageTypeEnum.INFO
                this.emit(CheckerEventNameEnum.IGNORED)
            } else {
                plugin.run({
                    commandArgs: commandArgs
                })
                resultList.push(plugin.result)
            }
            //插件运行结束
            this.emit(CheckerEventNameEnum.ITEM_END, plugin)
        })
        sw.stop()
        this.timeSpent = sw.value / 1000
        this.emit(CheckerEventNameEnum.RESULT, resultList)
        this.emit(CheckerEventNameEnum.END, this.pluginList.every(k => k.isSuccess))
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

checker.on(CheckerEventNameEnum.IGNORED, () => {
    Log.info(`This plugin has been ignored`)
})

checker.process()