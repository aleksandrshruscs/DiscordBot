const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),

	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const userVar = await interaction.user.fetch(true);

		const exampleEmbed = new EmbedBuilder()
			.setColor(`${userVar.accentColor.toString(16)}`)
			.setTitle(`User Info for ${interaction.user.username}`)
			.setDescription(`Joined on ${interaction.member.joinedAt}`)
			.addFields(
				{ name: "User Tag:", value: `${interaction.user.tag}`, inline: true },
				{ name: "User ID:", value: `${interaction.user.id}`, inline: true },
				{ name: "Bot Status:", value: `${interaction.user.bot}`, inline: true },
				{
				  name: "Account Creation Date:",
				  value: `${interaction.user.createdAt}`,
				  inline: false,
				}
			  )
			.setImage(interaction.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};