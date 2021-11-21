const { Command } = require("commander")
const { getAvailableDevices } = require("../../services/devices")
const tmp = require("tmp")
const fs = require("fs")
const shell = require("../../services/shell")
const { form, picker } = require("../../inputHooks")

module.exports = new Command()
    .command("push")
    .description("Generate a deeplink for the given identifier")
    .argument("bundle identifier", "Enter the bundle identifier for the app")
    .action(async (bundleIdentifier) => {
        const bootedDevices = await getAvailableDevices(true)

        if (!bootedDevices.length) {
            console.error("⚠️  No booted devices could be found!")
            return
        }

        const selectedDeviceName = await picker({
            name: "Device Picker",
            message: "Select a device first",
            choices: bootedDevices.map((device) => {
                return {
                    name: device.name,
                    value: device.udid,
                }
            }),
        })

        const selectedDeviceUUID = bootedDevices.filter(
            (device) => device.name === selectedDeviceName
        )[0].udid

        const { title, body, sound } = await form({
            name: "apns body",
            message: "Provide the values of the notification body:",
            choices: [
                {
                    name: "title",
                    message: "Title",
                    initial: "Test Notification",
                },
                {
                    name: "body",
                    message: "Body",
                    initial: "This is a test",
                },
                {
                    name: "sound",
                    message: "Sound",
                    initial: "default",
                },
            ],
        })

        const tmpFile = tmp.fileSync({ postfix: ".apns" })
        fs.writeFileSync(
            tmpFile.name,
            `{
                "aps": {
                    "alert": {
                        "title": ${title},
                        "body": ${body}
                    },
                    "sound": ${sound}
                },
            }`
        )

        await shell(
            `xcrun simctl push "${selectedDeviceUUID}" ${bundleIdentifier} ${tmpFile.name}`
        )

        tmpFile.removeCallback()
    })
