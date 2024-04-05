require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

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
            let lists = await fetch('https://api.trello.com/1/boards/' + process.env.BOARD_ID + '/lists?key=' + process.env.TRELLO_API_KEY)
            let listsData = await lists.json();
            let fieldz = [];
            let totalCheckItemsGlobal = 0;
            let totalCheckedItemsGlobal = 0;

            for (const list of listsData) {
                let cardsInList = await fetch('https://api.trello.com/1/lists/' + list.id + '/cards?key=' + process.env.TRELLO_API_KEY);
                let cardsData = await cardsInList.json();
                let totalCheckItems = 0;
                let totalCheckedItems = 0;

                for (const card of cardsData) {
                    if (card.badges.checkItems && card.badges.checkItems > 0) {
                        totalCheckItems += card.badges.checkItems;
                        totalCheckedItems += card.badges.checkItemsChecked;
                        totalCheckItemsGlobal += card.badges.checkItems;
                        totalCheckedItemsGlobal += card.badges.checkItemsChecked;
                    }
                }

                if (totalCheckItems > 0) { // Only consider lists with one or more cards
                    let progressPercent = totalCheckItems > 0 ? Math.floor((totalCheckedItems / totalCheckItems) * 100) : 0;
                    fieldz.push({
                        name: list.name + ' (' + progressPercent + '%)',
                        value: 'Total: ' + totalCheckItems + '\nDone: ' + totalCheckedItems,
                        inline: true
                    });
                }
            }

            let overallProgressPercent = totalCheckItemsGlobal > 0 ? Math.floor((totalCheckedItemsGlobal / totalCheckItemsGlobal) * 100) : 0;
            let embed = new EmbedBuilder()
                .setTitle(process.env.BOARD_NAME + ': Progress (' + overallProgressPercent + '%)')
                .setFields(fieldz)
                .setColor('Purple')
                .setFooter({
                    text: 'Fire Wheels Development Progress'
                })
                .setThumbnail('https://media.discordapp.net/attachments/1009982162851872849/1223138437222105129/f46c99716c68825f9a145201d2b2a86b.png?ex=6618c370&is=66064e70&hm=a8848bda8ed57fe63abe8fede8180348405716290d9cf5e7bf1c61a53e4ad699&=&format=webp&quality=lossless');

            interaction.reply({ embeds: [embed] });
        }
    }
});

client.login(process.env.TOKEN);
