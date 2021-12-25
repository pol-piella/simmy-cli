const { promisify } = require('util')
const { error } = require('../output')

const exec = promisify(require('child_process').exec)

module.exports = async (command) => {
  try {
    const { stdout } = await exec(command)
    return stdout
  } catch ({ stderr }) {
    error(stderr)
  }
}
