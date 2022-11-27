const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('specify user')),
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		await interaction.reply(`Pong! to <@${target.id}>`);
	},
};