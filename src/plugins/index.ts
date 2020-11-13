import { BasePluginType } from "../type"
import { PackageVersionPlugin } from "./package-version"
import { EslintPlugin } from "./eslint"
import { PrettierPlugin } from "./prettier"
import { ProjectBasicPlugin } from "./project-basic"

export const plugins = [ProjectBasicPlugin, PackageVersionPlugin, EslintPlugin, PrettierPlugin] as BasePluginType[]