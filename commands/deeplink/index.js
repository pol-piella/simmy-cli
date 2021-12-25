// @ts-check

const { Command } = require('commander')
const selectedDevice = require('../booted-devices')
const shell = require('../../services/shell')

module.exports = new Command()
  .command('deeplink')
  .description('Open a url or deeplink on the selected booted simulator')
  .argument('url', 'The URL to open')
  .action(async (url) => {
    const { udid } = await selectedDevice()

    await shell(`xcrun simctl openurl ${udid} ${url}`)
  })
