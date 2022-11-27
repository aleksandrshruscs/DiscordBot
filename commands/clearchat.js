const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearmessages')
		.setDescription('clear provided number of mesages from the current chat')
        .addStringOption(option =>
			option
				.setName('count')
				.setDescription('munber of messages')),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		//await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};

// async () => {
//     let fetched;
//     do {
//         fetched = await channel.fetchMessages({limit: 100});
//         message.channel.bulkDelete(fetched);
//     }
//     while(fetched.size >= 2);
// }