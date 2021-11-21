const { Command } = require("commander")
const { MultiSelect } = require("enquirer")
const { exec } = require("child_process")

const program = new Command()

// Devices -> com.apple.CoreSimulator.SimRuntime.iOS-* -> filter state === booted

program
    .command("deeplink")
    .option("-t, --title <title>", "The title to the ")
    .description("Generate a deeplink for the given identifier")
    .action(async (identifier) => {
        exec("xcrun simctl list -j", (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                return
            } else if (!stdout) {
                console.error(`No device found`)
                return
            }

            const { devices } = JSON.parse(stdout)

            const bootedDevices = Object.keys(devices)
                .flatMap((key) => {
                    if (key.includes("iOS-")) {
                        return devices[key]
                    }
                })
                .filter((device) => device && device.state === "Booted")

            const prompt = new MultiSelect({
                name: "Device Picker",
                message: "Select a device first",
                choices: bootedDevices.map((device) => {
                    return {
                        name: device.name,
                        value: device.udid,
                    }
                }),
                result(names) {
                    return this.map(names)
                },
            })
            prompt.run().then((selected) => {
                console.log(selected)
            })
        })
    })

program.parse(process.argv)
