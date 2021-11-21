const { MultiSelect } = require("enquirer")

const picker = async ({ name, message, choices }) => {
    const prompt = new MultiSelect({
        name,
        message,
        choices,
        result: (answers) => answers,
    })

    return await prompt.run()
}

module.exports = picker
