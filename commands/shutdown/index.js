// @ts-check

const { Command } = require('commander')
const selectedDevice = require('../booted-devices')
const shell = require('../../services/shell')

module.exports = new Command()
  .command('shutdown')
  .description('Shutdown any of the booted simulators')
  .action(async () => {
    const { udid } = await selectedDevice()

    await shell(`xcrun simctl shutdown ${udid}`)
  })
