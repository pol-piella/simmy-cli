#!/usr/bin/env node

const { Command } = require("commander")

const COMMANDS = [require("./commands/push")]

const program = new Command()

COMMANDS.forEach((command) => {
    program.addCommand(command)
})

program.parse(process.argv)
