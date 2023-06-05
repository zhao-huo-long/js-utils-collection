const { copyFileSync } = require("fs")
const path = require("path")
const { cwd } = require("process")

const pwd = cwd()

copyFileSync(path.resolve(pwd, "src", "lib.d.ts"), path.resolve(pwd, 'dist', "lib.d.ts"))
copyFileSync(path.resolve(pwd, "src", "lib.d.ts"), path.resolve(pwd, 'esm', "lib.d.ts"))
