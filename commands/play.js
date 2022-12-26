const { SlashCommandBuilder, EmbedBuilder , ActionRowBuilder, ButtonBuilder, ButtonStyle, Events} = require('discord.js');
const ytdl = require('ytdl-core');
const { createAudioPlayer, VoiceConnectionStatus , getVoiceConnection, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior    } = require('@discordjs/voice');
//const ffmpeg = require('ffmpeg');

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

		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		});

		const connection = getVoiceConnection(interaction.guild.id);
		let target = await interaction.user.fetch(true);

		if(connection){
			console.log('connection');

			const subscription = connection.subscribe(player);

			connection.on(VoiceConnectionStatus.Ready, () => {
				console.log('The connection has entered the Ready state - ready to play audio!');
			});

			let link = interaction.options.getString('link');		
			let resource;
			let setDisabled = false;
			if(link === 'pochita'){
				setDisabled = true;
				resource = 'pochita.mp3';
				song = 'https://media.tenor.com/LZy169K2qToAAAAC/chainsaw-man-pochita.gif';
				resource = createAudioResource(resource, {
					metadata: {
						title: 'A good song!',
					},
				});
			}else{
				const stream = ytdl(link, { filter: "audioonly", });
				song = link;
				resource = createAudioResource(stream, {
					metadata: {
						title: 'A song!',
					},
				});
			}

			// play song
			player.play(resource);

			const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('pauseunpause')
					.setLabel('pause / unpause')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(setDisabled)
			).addComponents(
				new ButtonBuilder()
					.setCustomId('stop')
					.setLabel('stop')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(setDisabled)
			);

			//Send message
			await interaction.reply({ content: `Playing ${resource.metadata.title}\n${song}`, components: [row] });
			//await interaction.reply(`Playing ${resource.metadata.title}\n${song}\n`);



			player.on('error', error => {
				console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
			});

			player.on(AudioPlayerStatus.Idle, () => {
				console.log('AudioPlayerStatus.Idle');
				// Unsubscribe  (stop playing audio on the voice connection)
				subscription.unsubscribe();
			});

			console.log('connection._state ' + connection._state);

			if (subscription) {
				// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
				//setTimeout(() => subscription.unsubscribe(), 10_000);
			}

		}else{
			console.log('Please connect DurranBot to voica channel first');
			await interaction.reply(`${target} Please connect DurranBot to voice channel first`);
		}
	},
};