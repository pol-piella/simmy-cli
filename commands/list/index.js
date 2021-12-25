// @ts-check

const { Command } = require('commander')
const { getAvailableDevices } = require('../../services/devices')
const { multiSelect } = require('../../inputHooks')

module.exports = new Command()
  .command('list')
  .description('Get a list of devices ')
  .option('-b, --booted', 'Only show booted devices')
  .action(async ({ booted }) => {
    const selectedPlatforms = await multiSelect({
      name: 'platforms',
      message:
                'Pick the platforms you would like to see devices from (using 0, 1, 2)',
      choices: [
        { name: 'iOS', value: 'iOS' },
        { name: 'watchOS', value: 'watchOS' },
        { name: 'tvOS', value: 'tvOS' }
      ]
    })

    const devices = await getAvailableDevices(selectedPlatforms, booted)
    console.log(devices)
  })
