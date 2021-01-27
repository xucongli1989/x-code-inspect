const fs = require("fs")
const path = require("path")
const sh = require("shelljs")
//安装依赖包
const needInstalls = []
const pkgPath = path.resolve("./package.json")
if (!pkgPath.includes("node_modules")) {
    console.log("This package is not in a reference state. Installation of the specified package was ignored!")
    return
}
const pkgObject = JSON.parse(fs.readFileSync(pkgPath))
Object.keys(pkgObject.dependencies).forEach(key => {
    if (key.includes("eslint") || ["x-package-version-strict-check", "typescript", "prettier"].includes(key)) {
        needInstalls.push(`${key}@${pkgObject.dependencies[key]}`)
    }
})
sh.cd("../../")
const cmd = `npm i --no-save ${needInstalls.join(" ")}`
console.log("Executing command: ", cmd)
sh.exec(cmd)