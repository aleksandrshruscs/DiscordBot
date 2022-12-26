const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('specify user')),
	async execute(interaction) {
		let target = interaction.options.getUser('user');
		if(!target){
			target =  await interaction.user.fetch(true);
		}
		await interaction.reply(`Pong! to ${target}`);
	},
};