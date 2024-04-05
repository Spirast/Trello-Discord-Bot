require('dotenv').config();
const { REST, Routes } = require('discord.js')
const token = process.env.TOKEN
const commands = [
    {
        name: 'progress',
        description: 'gets progress from trello'
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log("slash commands were registered!")
    } catch (error) {
        console.log(error)
    }
})();
