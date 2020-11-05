import { BasePluginType } from "../type"
import packageVersion from "./package-version"
import eslint from "./eslint"
import prettier from "./prettier"
import projectBasic from "./project-basic"

const pluginList: BasePluginType[] = [projectBasic, packageVersion, eslint, prettier]

export default pluginList