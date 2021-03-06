const { Form, Select, MultiSelect } = require('enquirer')

const picker = async ({ name, message, choices }) => {
  const prompt = new Select({
    name,
    message,
    choices
  })

  return await prompt.run()
}

const form = async ({ name, message, choices }) => {
  const prompt = new Form({ name, message, choices })
  return await prompt.run()
}

const multiSelect = async ({ name, message, choices }) => {
  const prompt = new MultiSelect({ name, message, choices })
  return await prompt.run()
}

module.exports = { form, picker, multiSelect }
