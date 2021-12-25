const { promisify } = require('util')
const chalk = require('chalk')

const exec = promisify(require('child_process').exec)

module.exports = async (command) => {
  try {
    const { stdout } = await exec(command)
    return stdout
  } catch ({ stderr }) {
    console.log(chalk.red(stderr))
  }
}
