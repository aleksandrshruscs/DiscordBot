const { SlashCommandBuilder , PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearmessages')
		.setDescription('clear provided number of mesages from the current chat')
        .addStringOption(option =>
			option
				.setName('count')
				.setDescription('munber of messages'))
			.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
		// get parameter value , set to one if empty
		const target = interaction.options.getString('count');
		let amount;
		if(target){
			amount = parseInt(target);
			if (isNaN(amount)) {
				await interaction.reply("that doesn't seem to be a valid number");
			} else if (amount <1 || amount > 100) {
				await interaction.reply("you need to input a number between 1 and 99");
				return;
			}
		}else{
			amount = 1;
		}

		let messages = await interaction.channel.messages.fetch({limit: amount});
		interaction.channel.bulkDelete(messages, true).catch((err) => {
            console.error(err);
			interaction.reply(
                "there was an error trying to prune messages in this channel!"
            );
        });

		//clear reply
		await interaction.reply('.');
		interaction.deleteReply();
	},
};