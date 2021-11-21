#!/usr/bin/env node

const COMMANDS = require("./commands")
const { Command } = require("commander")

const program = new Command()

COMMANDS.forEach((command) => {
    program.addCommand(command)
})

program.parse(process.argv)
