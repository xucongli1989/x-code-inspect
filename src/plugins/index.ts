import { BasePluginType } from "../type"
import { PackageVersionPlugin } from "./package-version"
import { EslintPlugin } from "./eslint"
import { PrettierPlugin } from "./prettier"
import { ProjectBasicPlugin } from "./project-basic"
import { TypeCheckPlugin } from "./type-check"

//注意顺序，比如 eslint 要尽量往后放，前面的问题解决后再处理后面的问题
export const plugins = [PackageVersionPlugin, ProjectBasicPlugin, PrettierPlugin, EslintPlugin, TypeCheckPlugin] as BasePluginType[]
