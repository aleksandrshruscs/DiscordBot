const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Provides information about the user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('specify user')),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild

		// get useer from option if it is mentioned
		let target = interaction.options.getUser('user');
		if(!target){
			target =  await interaction.user.fetch(true);
		}
		if(target.bot){
			target.accentColor = 6939332;
		}

		const exampleEmbed = new EmbedBuilder()
			.setColor(`${target.accentColor.toString(16)}`)
			.setTitle(`User Info for ${target.username}`)
			.setDescription(`Joined on ${interaction.member.joinedAt}`)
			.addFields(
				{ name: "User Tag:", value: `${target.tag}`, inline: true },
				{ name: "User ID:", value: `${target.id}`, inline: true },
				{ name: "Bot Status:", value: `${target.bot}`, inline: true },
				{
				  name: "Account Creation Date:",
				  value: `${target.createdAt}`,
				  inline: false,
				}
			  )
			.setImage(target.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};