const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('connect to the voice chat')
        .addChannelOption((option)=> option.setName('channel').setDescription('The channel to join')
        .setRequired(true).addChannelTypes(ChannelType.GuildVoice)
    ),
	async execute(interaction) {
        console.log('Voice connect');
        const target =  await interaction.user.fetch(true);
       
        const voiceChannel = interaction.options.getChannel('channel');
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        await interaction.reply(`${target} Connected DurranBot to voice channel`);
	},
};