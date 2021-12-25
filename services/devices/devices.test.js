/* eslint-env jest */

const shell = require('../shell')
const { getAvailableDevices } = require('./index.js')

jest.mock('../shell')

const MOCK_RESPONSE = {
  devices: {
    'com.apple.CoreSimulator.SimRuntime.tvOS-15-0': [
      {
        dataPath: '/Users/polpiella/Library/Developer/CoreSimulator/Devices/1BBEC712-BB66-462D-AC05-06BF46B99497/data',
        logPath: '/Users/polpiella/Library/Logs/CoreSimulator/1BBEC712-BB66-462D-AC05-06BF46B99497',
        udid: '1BBEC712-BB66-462D-AC05-06BF46B99497',
        isAvailable: true,
        deviceTypeIdentifier: 'com.apple.CoreSimulator.SimDeviceType.Apple-TV-1080p',
        state: 'Shutdown',
        name: 'Apple TV'
      }
    ],
    'com.apple.CoreSimulator.SimRuntime.watchOS-8-0': [
      {
        dataPath: '/Users/polpiella/Library/Developer/CoreSimulator/Devices/1431B7D3-73C5-4436-8CA6-5FBC22F94948/data',
        logPath: '/Users/polpiella/Library/Logs/CoreSimulator/1431B7D3-73C5-4436-8CA6-5FBC22F94948',
        udid: '1431B7D3-73C5-4436-8CA6-5FBC22F94948',
        isAvailable: true,
        deviceTypeIdentifier: 'com.apple.CoreSimulator.SimDeviceType.Apple-Watch-Series-5-40mm',
        state: 'Shutdown',
        name: 'Apple Watch Series 5 - 40mm'
      }
    ],
    'com.apple.CoreSimulator.SimRuntime.iOS-15-0': [
      {
        dataPath: '/Users/polpiella/Library/Developer/CoreSimulator/Devices/39C9E001-798A-45B9-A7F1-4B6D4C43D6B7/data',
        logPath: '/Users/polpiella/Library/Logs/CoreSimulator/39C9E001-798A-45B9-A7F1-4B6D4C43D6B7',
        udid: '39C9E001-798A-45B9-A7F1-4B6D4C43D6B7',
        isAvailable: true,
        deviceTypeIdentifier: 'com.apple.CoreSimulator.SimDeviceType.iPhone-8',
        state: 'Booted',
        name: 'iPhone 8'
      }
    ]
  }
}

const EXPECTED_RESULT = {
  'tvOS-15-0': [
    {
      dataPath: '/Users/polpiella/Library/Developer/CoreSimulator/Devices/1BBEC712-BB66-462D-AC05-06BF46B99497/data',
      logPath: '/Users/polpiella/Library/Logs/CoreSimulator/1BBEC712-BB66-462D-AC05-06BF46B99497',
      udid: '1BBEC712-BB66-462D-AC05-06BF46B99497',
      isAvailable: true,
      deviceTypeIdentifier: 'com.apple.CoreSimulator.SimDeviceType.Apple-TV-1080p',
      state: 'Shutdown',
      name: 'Apple TV'
    }
  ],
  'watchOS-8-0': [
    {
      dataPath: '/Users/polpiella/Library/Developer/CoreSimulator/Devices/1431B7D3-73C5-4436-8CA6-5FBC22F94948/data',
      logPath: '/Users/polpiella/Library/Logs/CoreSimulator/1431B7D3-73C5-4436-8CA6-5FBC22F94948',
      udid: '1431B7D3-73C5-4436-8CA6-5FBC22F94948',
      isAvailable: true,
      deviceTypeIdentifier: 'com.apple.CoreSimulator.SimDeviceType.Apple-Watch-Series-5-40mm',
      state: 'Shutdown',
      name: 'Apple Watch Series 5 - 40mm'
    }
  ],
  'iOS-15-0': [
    {
      dataPath: '/Users/polpiella/Library/Developer/CoreSimulator/Devices/39C9E001-798A-45B9-A7F1-4B6D4C43D6B7/data',
      logPath: '/Users/polpiella/Library/Logs/CoreSimulator/39C9E001-798A-45B9-A7F1-4B6D4C43D6B7',
      udid: '39C9E001-798A-45B9-A7F1-4B6D4C43D6B7',
      isAvailable: true,
      deviceTypeIdentifier: 'com.apple.CoreSimulator.SimDeviceType.iPhone-8',
      state: 'Booted',
      name: 'iPhone 8'
    }
  ]
}

test('Test response returns all device architectures', async () => {
  shell.mockResolvedValue(JSON.stringify(MOCK_RESPONSE))
  const deviceList = await getAvailableDevices(['iOS', 'watchOS', 'tvOS'], false)
  expect(deviceList).toStrictEqual(EXPECTED_RESULT)
})

test('Test that an empty object is returned when passing no arch', async () => {
  shell.mockResolvedValue(JSON.stringify(MOCK_RESPONSE))
  const deviceList = await getAvailableDevices([], false)
  expect(deviceList).toStrictEqual({})
})

test('Test that available devices can be filtered by architecture', async () => {
  shell.mockResolvedValue(JSON.stringify(MOCK_RESPONSE))
  const deviceList = await getAvailableDevices(['iOS'], false)
  expect(Object.keys(deviceList)).toStrictEqual(['iOS-15-0'])
  expect(deviceList['iOS-15-0']).toStrictEqual(EXPECTED_RESULT['iOS-15-0'])
})

test('Test that available devices can be filtered by their boot status', async () => {
  shell.mockResolvedValue(JSON.stringify(MOCK_RESPONSE))
  const deviceList = await getAvailableDevices(['iOS', 'watchOS', 'tvOS'], true)
  expect(deviceList['iOS-15-0']).toStrictEqual(EXPECTED_RESULT['iOS-15-0'])
  expect(deviceList['watchOS-8-0']).toHaveLength(0)
  expect(deviceList['tvOS-15-0']).toHaveLength(0)
})
