const { SlashCommandBuilder } = require("discord.js")
const { TENOR_API_KEY } = require('../config.json');

const Tenor = require("tenorjs").client({
    "Key": TENOR_API_KEY,
    "Filter": "off",
    "Locale": "en_US",
    "MediaFilter": "minimal",
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
});

module.exports = {
    data: new SlashCommandBuilder()
    .setName('waifu')
    .setDescription('Swiss eggs'),

    async execute(interaction) {        
        await Tenor.Search.Random("suisei", "1").then(Results => {
            Results.forEach(Post => {
                interaction.reply(Post.url);
            })
        }).catch(console.error);
    },
};