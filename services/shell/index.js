const { promisify } = require("util")

module.exports = promisify(require("child_process").exec)
