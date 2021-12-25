// @ts-check

const { Command } = require('commander')
const tmp = require('tmp')
const fs = require('fs')
const shell = require('../../services/shell')
const { form } = require('../../inputHooks')
const selectedDevice = require('../booted-devices')

module.exports = new Command()
  .command('push')
  .description('Generate a deeplink for the given identifier')
  .argument('bundle identifier', 'Enter the bundle identifier for the app')
  .action(async (bundleIdentifier) => {
    const { udid } = await selectedDevice()

    const { title, body, sound } = await form({
      name: 'apns body',
      message: 'Provide the values of the notification body:',
      choices: [
        {
          name: 'title',
          message: 'Title',
          initial: 'Test Notification'
        },
        {
          name: 'body',
          message: 'Body',
          initial: 'This is a test'
        },
        {
          name: 'sound',
          message: 'Sound',
          initial: 'default'
        }
      ]
    })

    const tmpFile = tmp.fileSync({ postfix: '.apns' })
    fs.writeFileSync(
      tmpFile.name,
            `{
                "aps": {
                    "alert": {
                        "title": "${title}",
                        "body": "${body}"
                    },
                    "sound": "${sound}"
                },
            }`
    )

    await shell(
            `xcrun simctl push "${udid}" ${bundleIdentifier} ${tmpFile.name}`
    )

    tmpFile.removeCallback()
  })
