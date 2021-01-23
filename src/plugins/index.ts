import { BasePluginType } from "../type"
import { PackageVersionPlugin } from "./package-version"
import { EslintPlugin } from "./eslint"
import { PrettierPlugin } from "./prettier"
import { ProjectBasicPlugin } from "./project-basic"
import { TypeCheckPlugin } from "./type-check"

export const plugins = [ProjectBasicPlugin, PackageVersionPlugin, EslintPlugin, PrettierPlugin, TypeCheckPlugin] as BasePluginType[]
