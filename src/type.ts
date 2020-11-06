/**
 * 插件类型
 */
export interface BasePluginType {
    /**
     * 插件名称
     */
    name: string
    /**
     * 插件别名
     */
    aliasName: string
    /**
     * 是否已成功完成
     */
    readonly isSuccess: boolean
    /**
     * 运行插件
     */
    run(options: BasePluginOptionsType): void
    /**
     * 结果
     */
    result: CheckerResultType
}

/**
 * 插件选项类型
 */
export interface BasePluginOptionsType {
    commandArgs: CommandArgsType
}

/**
 * CLI选项类型
 */
export interface CommandArgsType {
    /**
     * 是否为debug模式
     */
    isDebug: boolean
    /**
     * 代码路径
     */
    codePath: string,
    /**
     * 需要忽略的插件名称
     */
    ignorePluginNameList: string[],
    /**
     * 需要运行的插件名称
     */
    enablePluginNameList: string[],
    /**
     * 当前执行文件所在的路径
     */
    execFileRootPath: string,
    /**
     * 安装包所在的根路径
     */
    packagePath: string,
    /**
     * 指定一个需要进行代码扫描的目录（如：被eslint等插件进行扫描）
     */
    checkDir: string,
    /**
     * 指定一个不需要进行代码扫描的目录（如：被eslint等插件进行扫描）
     */
    ignoreCheckDir: string,
    /**
     * eslint cli 配置（--env）
     */
    eslint_env: string,
    /**
     * eslint cli 配置（--global）
     */
    eslint_global: string
}


/**
 * 检查结果
 */
export interface CheckerResultType {
    /**
     * 标题
     */
    title: string
    /**
     * 消息数
     */
    msgCount: number
    /**
     * 消息类型
     */
    msgType: CheckerMessageTypeEnum
}

/**
 * 主程序类型
 */
export interface CheckerType {
    /**
     * 当前插件列表
     */
    pluginList: BasePluginType[]
    /**
     * 耗时（秒）
     */
    timeSpent: number
    /**
     * 开始处理
     */
    process(): void
}

/**
 * 错误类型枚举
 */
export enum CheckerMessageTypeEnum {
    INFO = "INFO",
    ERROR = "ERROR",
    WARN = "WARN"
}

/**
 * 主程序事件名称枚举
 */
export enum CheckerEventNameEnum {
    /**
     * 开始处理
     */
    START = "START",
    /**
     * 开始处理具体的某个插件
     */
    ITEM_START = "ITEM_START",
    /**
     * 处理完毕
     */
    END = "END",
    /**
     * 显示结果
     */
    RESULT = "RESULT",
    /**
     * 具体的某个插件处理完毕
     */
    ITEM_END = "ITEM_END",
    /**
     * 忽略某个插件
     */
    IGNORED = "IGNORED"
}

/**
 * 待检查的代码所运行的环境枚举
 */
export enum EnvEnum {
    BROWSER = "BROWSER",
    NODE = "NODE",
    ES6 = "ES6",
    AMD = "AMD",
    COMMONJS = "COMMONJS"
}