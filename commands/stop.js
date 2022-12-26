const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop audio in the voice chat'),
	async execute(interaction) {
        //const connection = getVoiceConnection(interaction.guild.id);
		//connection.state.subscription.player.stop();
	},
};