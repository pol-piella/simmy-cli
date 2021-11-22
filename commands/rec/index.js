// @ts-check

const { Command } = require("commander")
const selectedDevice = require("../booted-devices")
const shell = require("../../services/shell")

module.exports = new Command()
    .command("rec")
    .description("Generate a recording for the selected simulator")
    .argument("output", "The path to save the recording to")
    .action(async (output) => {
        const { udid } = await selectedDevice()

        console.log(`📹  Recording started for ${udid}`)
        console.log(`📹  Press Ctrl+C to stop recording`)

        await shell(`xcrun simctl io ${udid} recordVideo ${output}`)
    })
