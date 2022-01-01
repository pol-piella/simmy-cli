/* eslint-env jest */

const output = require('./index.js')
const chalk = require('chalk')

test('Test that log calls chalk green output', () => {
  const expectedLoggedValue = 'logged value'
  Object.defineProperty(chalk, 'green', { value: jest.fn() })
  output.log(expectedLoggedValue)
  expect(chalk.green).toHaveBeenCalledWith(expectedLoggedValue)
})

test('Test that log calls chalk green output', () => {
  const expectedLoggedValue = 'logged value'
  Object.defineProperty(chalk, 'red', { value: jest.fn() })
  output.error(expectedLoggedValue)
  expect(chalk.red).toHaveBeenCalledWith(expectedLoggedValue)
})
