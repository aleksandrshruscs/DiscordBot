const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer } = require('@discordjs/voice');

const player = createAudioPlayer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play audio from provided url in the voice chat')
        .addStringOption(option =>
			option
				.setName('link')
				.setDescription('provide url to the audio')
                .setRequired(true)),
	async execute(interaction) {

	},
};