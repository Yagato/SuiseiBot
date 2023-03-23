const GphApiClient = require('giphy-js-sdk-core');
const { SlashCommandBuilder } = require("discord.js")
const { GIPHY_API_KEY } = require('../config.json');

const giphyClient = GphApiClient(GIPHY_API_KEY);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('waifu')
    .setDescription('Swiss eggs'),

    async execute(interaction) {
        const gif = await giphyClient.random('gifs', { tag: 'suisei' });
        await interaction.reply(gif.data.url);
    },
};