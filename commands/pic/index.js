// @ts-check

const { Command } = require('commander')
const selectedDevice = require('../booted-devices')
const shell = require('../../services/shell')

module.exports = new Command()
  .command('pic')
  .description('Generate a screenshot for the selected simulator')
  .argument('output', 'The path to save the screenshot to')
  .action(async (output) => {
    const { udid } = await selectedDevice()

    await shell(`xcrun simctl io ${udid} screenshot ${output}`)
  })
