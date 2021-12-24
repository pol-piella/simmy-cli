const { getAvailableDevices } = require("../../services/devices")
const { picker } = require("../../inputHooks")
const { Command } = require("commander")
const shell = require("../../services/shell")

module.exports = new Command()
    .command("boot")
    .description("Pick an existing device to boot")
    .action(async ({ booted }) => {
        const selectedPlatform = await picker({
            name: "platforms",
            message: "Pick the platform you would like to boot a device for",
            choices: [
                { name: "iOS", value: "iOS" },
                { name: "watchOS", value: "watchOS" },
                { name: "tvOS", value: "tvOS" },
            ],
        })

        const devices = await getAvailableDevices([selectedPlatform], booted)

        const selectedVersion = await picker({
            name: "version",
            message: "Pick the version you would like to boot a device for",
            choices: Object.keys(devices).map((version) => {
                return { name: version, value: version }
            }),
        })

        const selectedDevice = await picker({
            name: "device",
            message: "Pick the device you would like to boot a device for",
            choices: devices[selectedVersion].map(({ name, udid }) => {
                return { name: name, value: udid }
            }),
        })

        const deviceToBoot = devices[selectedVersion].find(
            ({ name }) => name === selectedDevice
        )

        await shell(`xcrun simctl boot ${deviceToBoot.udid}`)
        
        const { stdout: developerPath  } = await shell('xcode-select --print-path')
        await shell(`open ${developerPath.trim()}/Applications/Simulator.app`)
    })
