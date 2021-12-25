const chalk = require('chalk')

module.exports = {
  log: (output) => console.log(chalk.green(output)),
  error: (message) => console.log(chalk.red(message))
}
