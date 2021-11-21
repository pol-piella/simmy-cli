#!/usr/bin/env node

const { Command } = require("commander")
const { MultiSelect } = require("enquirer")
const { getAvailableDevices } = require("./services/devices")

const program = new Command()

program
    .command("deeplink")
    .option("-t, --title <title>", "The title to the ")
    .description("Generate a deeplink for the given identifier")
    .action(async () => {
        const bootedDevices = await getAvailableDevices(true)

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

program.parse(process.argv)
