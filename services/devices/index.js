const shell = require("../shell")
const _ = require("lodash")

/**
 * @param {('tvOS'|'watchOS'|'iOS')[]} platform - The allowed types of platforms
 * @param {boolean} booted - Whether the device must be booted
 */
const getAvailableDevices = async (platforms, booted) => {
    const simulatorList = await shell("xcrun simctl list -j")
    if (!simulatorList) {
        throw new Error("No booted device could be found!")
    }

    const { devices } = JSON.parse(simulatorList)

    const mappedDevices = _.mapKeys(devices, (_, key) => {
        return key.replace("com.apple.CoreSimulator.SimRuntime.", "")
    })

    const allowedPlatforms = _.pickBy(mappedDevices, (_, key) => {
        return platforms.includes(key.split("-")[0])
    })

    if (booted) {
        Object.keys(allowedPlatforms).forEach((platform) => {
            allowedPlatforms[platform] = allowedPlatforms[platform].filter(
                (device) => device.state === "Booted"
            )
        })
    }

    return allowedPlatforms
}

module.exports = { getAvailableDevices }
