# Trello-Discord-Bot
Discord bot that links to Trello's API to get information about your board.

# Setting up the bot

### Creating a bot

First you need to create a bot. Do this by heading to https://discord.com/developers/applications.
At the top right hand corner, press the 'New Application' button and give your bot a name.
Once you have created your application, head to the bot section and reset your token. It should give you a token, save it somewhere because this is important.

### Getting your Trello API key
You'll need a Trello API key to get information from their API. It's fairly simple!
Login to Trello and goto this page: https://trello.com/power-ups/admin/.
To the right of the text that says 'Power-ups and Integrations', click on the blue button.
Name your integration and select your workspace. Don't worry about the Iframe connector URL, just leave that blank.
Fill out the rest of the stuff and click 'Create'.

Once you have created your integration, click on your integration, you might be already on the page.
Find the section where it says 'API Key', click it, and copy your API key. Also save this somewhere.

Great! You're all set.

### Configuring and running the bot
Clone this repository, or simply download it.
Goto the folder where you downloaded/cloned it, and create a file named '.env'
Go into the .env file, you're gonna put your bot's token, your discord server id, your bot's client id, your Trello API key, and your board id from Trello.

```
TOKEN = yourtoken // your bot's token
GUILD_ID = yourserverid // you can get your discord server id by enabling developer mode and right clicking on the server and clicking the copy id button
APPLICATION_ID = yourbotid // get this by going back to your application and going to the basic information section and finding the application id
TRELLO_API_KEY = trelloapikey
BOARD_ID = yourboardid // the code after trello.com/b/
```
Install the latest version of node.js and open command prompt.
>https://nodejs.org/en

Find your cloned repository in command prompt.
Run this command to setup slash commands
```
node register-commands.js
```
You should've gotten a text saying 'Slash commands were registered!'
>If you didn't then you probably entered something wrong in the .env file, check again.

Now you're ready to run the bot.
In the same folder you were just in, run this to start up the bot
```
node index.js
```

If you got the text saying 'yourbotname is ready for operation!!' then it's running!


# IMPORTANT
Make sure your Trello board is public, and that all of these are turned on in the bot section.
![image](https://github.com/Spirast/Trello-Discord-Bot/assets/107292778/fe11191e-0b7c-4f57-9a01-e9c0387e0183)
