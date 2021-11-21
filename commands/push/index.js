const { Command } = require("commander")
const { getAvailableDevices } = require("../../services/devices")
const picker = require("../../components/picker")

module.exports = new Command()
    .command("push")
    .description("Generate a deeplink for the given identifier")
    .argument("bundle identifier", "Enter the bundle identifier for the app")
    .action(async () => {
        const bootedDevices = await getAvailableDevices(true)
        const selectedDevice = await picker({
            name: "Device Picker",
            message: "Select a device first",
            choices: bootedDevices.map((device) => {
                return {
                    name: device.name,
                    value: device.udid,
                }
            }),
        })
        console.log(selectedDevice)
    })
