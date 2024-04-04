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

client.on('ready', function(c){
    console.log(`${c.user.tag} is ready for operation!!`);
});

client.on('interactionCreate', async (interaction) => {
    if(interaction.isChatInputCommand()){
        if(interaction.commandName === "getprogress"){
            let progress = await fetch('https://api.trello.com/1/boards/'+ process.env.BOARD_ID +'/cards?key=' + process.env.TRELLO_API_KEY)
            let board = await fetch('https://api.trello.com/1/boards/'+ process.env.BOARD_ID +'?key=' + process.env.TRELLO_API_KEY)
            let data = await progress.json()
            let boarddata = await board.json()
            let fieldz = []
            let totaldone = []
            let maintotal = 0;
            let boardname = boarddata.name
            data.forEach(function(element){
                if(element.badges.checkItemsChecked === 0 && element.badges.checkItems === 0){
                    let object = {
                        name: element.name + '(' + "0" + '%)',
                        value: 'Total: ' + element.badges.checkItems + '\nDone: ' + element.badges.checkItemsChecked,
                        inline: true
                    }
                    fieldz.push(object);
                    totaldone.push(0)
                    return;
                }
                let object = {
                    name: element.name + '(' + Math.floor(element.badges.checkItemsChecked / element.badges.checkItems * 100) + '%)',
                    value: 'Total: ' + element.badges.checkItems + '\nDone: ' + element.badges.checkItemsChecked,
                    inline: true
                }
                fieldz.push(object);
                if(element.badges.checkItemsChecked !== 0 && element.badges.checkItems !== 0){
                    totaldone.push( Math.floor(element.badges.checkItemsChecked / element.badges.checkItems * 100) )
                }
            });
            // calculate the total total of the total
            console.log(totaldone)
            totaldone.forEach(function(element){
                maintotal += element
                console.log(maintotal)
            })

            maintotal = Math.floor(maintotal / totaldone.length)
            console.log(fieldz)
            let embed = new EmbedBuilder()
            .setTitle(boardname + ': Progress ('+ maintotal +'%)')
            .setFields(fieldz)
            .setColor('Purple')
            .setFooter({
                text: 'Fire Wheels Development Progress'
            })
            .setThumbnail('https://media.discordapp.net/attachments/1009982162851872849/1223138437222105129/f46c99716c68825f9a145201d2b2a86b.png?ex=6618c370&is=66064e70&hm=a8848bda8ed57fe63abe8fede8180348405716290d9cf5e7bf1c61a53e4ad699&=&format=webp&quality=lossless')
            //.setImage('https://media.discordapp.net/attachments/1009982162851872849/1223138437222105129/f46c99716c68825f9a145201d2b2a86b.png?ex=6618c370&is=66064e70&hm=a8848bda8ed57fe63abe8fede8180348405716290d9cf5e7bf1c61a53e4ad699&=&format=webp&quality=lossless')
            interaction.reply({embeds: [embed] })
        }
    }
})

client.on('interactionCreate', function(interaction){
    if(interaction.commandName === "8ball"){
        let ballresponses = [
            "definitely",
            "definitely not",
            "nah",
            "yes",
            "ye",
            "nope",
            "what",
            "reply hazy",
            "no",
            "doubt it",
        ]

        let chosenresponse = Math.floor(Math.random() * ballresponses.length)
        interaction.reply(ballresponses[chosenresponse])
    }
})

client.login(process.env.TOKEN);