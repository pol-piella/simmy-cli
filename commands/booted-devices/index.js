// @ts-check
const { picker } = require('../../inputHooks')
const { getAvailableDevices } = require('../../services/devices')

const deviceSelectedByUser = async (bootedDevices) => {
  const selectedDeviceName = await picker({
    name: 'Device Picker',
    message: 'Select a device first',
    choices: bootedDevices.map((device) => {
      return {
        name: device.name,
        value: device.udid
      }
    })
  })
  return bootedDevices.filter(
    (device) => device.name === selectedDeviceName
  )[0]
}

module.exports = async () => {
  const response = await getAvailableDevices(['iOS', 'watchOS', 'tvOS'], true)

  const bootedDevices = Object.keys(response).flatMap((key) => {
    return response[key]
  })

  if (!bootedDevices.length) {
    console.error('⚠️  No booted devices could be found!')
    return
  }

  return bootedDevices.length === 1
    ? bootedDevices[0]
    : await deviceSelectedByUser(bootedDevices)
}
