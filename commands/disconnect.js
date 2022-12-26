const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('disconect from the voice chat'),
	async execute(interaction) {
		const connection = getVoiceConnection(interaction.guild.id);
		const target =  await interaction.user.fetch(true);       
		if(connection){
			connection.destroy();
			await interaction.reply(`${target.username} Diconnected Durrnbot from voice channel`);
		}else{
			await interaction.reply(`Durrnbot is not connected to any voice channel. Please remove it manually if it is displayed in the voice channel list`);
		}
	},
};