const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json')


const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Map();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require("./commands/" + file)
  client.commands.set(command.data.name, command)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return;
  
    try {
        await command.execute(interaction);
    }
    catch (e) {
      console.error(e);
      try{
        await interaction.reply({ content: 'There was an error while executing this command: ' + e, ephemeral: true });
      }
      catch(e) {
        await interaction.channel.send({ content: 'There was an error while executing this command: ' + e});
      }
    }
});

client.login(token);