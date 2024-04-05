require('dotenv').config();
const { Client, IntentsBitField, GuildChannelManager, PermissionFlagsBits, EmbedBuilder } = require('discord.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', function (c) {
    console.log(`${c.user.tag} is ready for operation!!`);
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === "progress") {
            let progress = await fetch('https://api.trello.com/1/boards/' + process.env.BOARD_ID + '/cards?key=' + process.env.TRELLO_API_KEY)
            let board = await fetch('https://api.trello.com/1/boards/' + process.env.BOARD_ID + '?key=' + process.env.TRELLO_API_KEY)
            let lists = await fetch('https://api.trello.com/1/boards/' + process.env.BOARD_ID + '/lists?key=' + process.env.TRELLO_API_KEY)
            let data = await progress.json()
            let boarddata = await board.json()
            let listsData = await lists.json()
            let fieldz = []
            let totaldone = []
            let maintotal = 0;
            let boardname = boarddata.name
            data.forEach(function (element) {
                if (!element.badges.checkItems || element.badges.checkItems === 0) {
                    // Skip cards with no checklist or empty checklist
                    return;
                }
                let progressPercent = Math.floor(element.badges.checkItemsChecked / element.badges.checkItems * 100);
                let listName = listsData.find(list => list.id === element.idList).name;
                let object = {
                    name: listName + ' (' + progressPercent + '%)',
                    value: 'Total: ' + element.badges.checkItems + '\nDone: ' + element.badges.checkItemsChecked,
                    inline: true
                }
                fieldz.push(object);
                totaldone.push(progressPercent);
            });

            if (totaldone.length > 0) {
                totaldone.forEach(function (element) {
                    maintotal += element;
                })
                maintotal = Math.floor(maintotal / totaldone.length);
            }

            let embed = new EmbedBuilder()
                .setTitle(boardname + ': Progress (' + maintotal + '%)')
                .setFields(fieldz)
                .setColor('Purple')
                .setFooter({
                    text: 'Fire Wheels Development Progress'
                })
                .setThumbnail('https://media.discordapp.net/attachments/1009982162851872849/1223138437222105129/f46c99716c68825f9a145201d2b2a86b.png?ex=6618c370&is=66064e70&hm=a8848bda8ed57fe63abe8fede8180348405716290d9cf5e7bf1c61a53e4ad699&=&format=webp&quality=lossless')

            interaction.reply({ embeds: [embed] })
        }
    }
})


client.login(process.env.TOKEN);
