const shell = require("../shell")

const getAvailableDevices = async () => {
    const { stderr, stdout } = await shell("xcrun simctl list -j")
    if (!stdout) {
        throw new Error("No booted device could be found!")
    }

    const { devices } = JSON.parse(stdout)
    return Object.keys(devices)
        .flatMap((key) => {
            if (key.includes("iOS-")) {
                return devices[key]
            }
        })
        .filter((device) => device && device.state === "Booted")
}

module.exports = { getAvailableDevices }
