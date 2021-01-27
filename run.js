const path = require("path")
const sh = require("shelljs")
//安装依赖包
const pkgPath = path.resolve("./package.json")
if (!pkgPath.includes("node_modules")) {
    console.log("This package is not in a reference state. Installation of the specified package was ignored!")
    return
}
sh.cd("../../")
const cmd = `install-peerdeps x-code-inspect --silent --only-peers`
console.log("Executing command: ", cmd)
sh.exec(cmd)