// @ts-check

const { Command } = require("commander")
const selectedDevice = require("../booted-devices")
const shell = require("../../services/shell")

module.exports = new Command()
    .command("reboot")
    .description("Reboot any of the booted simulators")
    .action(async () => {
        const { udid } = await selectedDevice()

        console.log(`🔄  Rebooting simulator...`)
        await shell(`xcrun simctl shutdown ${udid}`)
        await shell(`xcrun simctl boot ${udid}`)
    })
