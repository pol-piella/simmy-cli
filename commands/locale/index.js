// @ts-check

const { Command } = require("commander")
const selectedDevice = require("../booted-devices")
const shell = require("../../services/shell")

module.exports = new Command()
    .command("langloc")
    .description("Change the locale of a given (booted) simulator")
    .argument("language", "The language you would want to change the value to")
    .argument("locale", "The locale you would want to change the value to")
    .action(async (language, locale) => {
        const { udid } = await selectedDevice()

        console.log(`🌍 Changing locale to ${language}-${locale}`)
        const path = `~/Library/Developer/CoreSimulator/Devices/${udid}/data/Library/Preferences/.GlobalPreferences.plist`

        await shell(`plutil -replace AppleLocale -string ${locale} ${path}`)
        await shell(
            `plutil -replace AppleLanguages -json "[ \\"${language}\\" ]" ${path}`
        )

        console.log(`🔄  Rebooting simulator...`)
        await shell(`xcrun simctl shutdown ${udid}`)
        await shell(`xcrun simctl boot ${udid}`)
    })
