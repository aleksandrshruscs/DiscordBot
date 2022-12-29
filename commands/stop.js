const { SlashCommandBuilder ,ActionRowBuilder, ButtonBuilder, ButtonStyle,} = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop audio in the voice chat'),
	async execute(interaction) {

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('Press')
				.setLabel('Press')
				.setStyle(ButtonStyle.Primary)
				.setDisabled(false)
		);
		//Send message
		await interaction.reply({ content: 'Idle', components: [row] });
	},
};