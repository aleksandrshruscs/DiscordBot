const { SlashCommandBuilder, EmbedBuilder , ActionRowBuilder, ButtonBuilder, ButtonStyle, Events} = require('discord.js');
//import { raw as ytdl } from 'youtube-dl-exec';

//const play = require('play-dl'); // Everything
//const { createAudioPlayer, VoiceConnectionStatus , getVoiceConnection, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior    } = require('@discordjs/voice');

const { createAudioPlayer, createAudioResource , StreamType, entersState ,demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')

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
	try{
		/*
		// const player = createAudioPlayer({
		// 	behaviors: {
		// 		noSubscriber: NoSubscriberBehavior.Pause,
		// 	},
		// });


		let player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })

		const connection = getVoiceConnection(interaction.guild.id);
		let target = await interaction.user.fetch(true);

		connection.on(VoiceConnectionStatus.Ready, () => {
			console.log('The connection has entered the Ready state - ready to play audio!');
		});

		if(connection){
			console.log('connection');

			try{
				connection.state.subscription.unsubscribe();
			}catch(error){

			}
			

			connection.on(VoiceConnectionStatus.Ready, () => {
				console.log('The connection has entered the Ready state - ready to play audio!');
			});
			//let stream;
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
				setDisabled = false;
				// //Create Stream from Youtube URL
				// let stream = await play.stream(link);
				song = link;

				// //Create AudioResource from Stream
				// resource = createAudioResource(stream.stream, { 
				// 	inputType: stream.type,
				// 	metadata: {
				// 		title: 'A song!',
				// 	}
				// })

				// https://www.youtube.com/watch?v=IRqHtcdqiNo
				link = 'https://www.youtube.com/watch?v=IRqHtcdqiNo';
				const ytdl = require('youtube-dl-exec').exec;
				const stream = await ytdl(link,{
					filter: 'audioonly',
					quality: 'lowestaudio',
				  });

				  resource = createAudioResource(stream.stdout,{
					metadata: {
						title: 'A song!',
					}	
					});
			
			}
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
					.setDisabled(false)
			);

			//Send message
			await interaction.reply({ content: `Playing ${resource.metadata.title}\n${song}`, components: [row] });

			// play song playStream
			// player.play(resource);
			const subscription = connection.subscribe(player);
			


			try {
				await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
				connection.subscribe(player);
				console.log('#> connection.subscribe(player)');
			  } catch (error) {
				console.log('#> connection.destroy() : ');
				connection.destroy();
				throw error;
			  }

			//console.log('#> test AudioPlayerStatus.Idle' , AudioPlayerStatus.Idle);

			console.log('#> playStream : ', resource.metadata.title );

			player.on('error', error => {
				console.error(`#> Error: ${error.message} with resource ${error.resource.metadata.title}`);
			});

			player.on('idle', () => {
				console.log('#> AudioPlayerStatus.Idle' , AudioPlayerStatus.Idle);
				console.log('#> player' ,player);
				// Unsubscribe  (stop playing audio on the voice connection)
				subscription.unsubscribe();
			});

            player.on("end", end => {
                console.log("#> player.on \"end\""); });

			//console.log('#> connection._state ' + JSON.stringify(connection));

			connection.on(VoiceConnectionStatus.Ready, () => {
				console.log('The connection has entered the Ready state - ready to play audio!');
			});
			connection.on(VoiceConnectionStatus.Disconnected, () => {
				console.log('The connection has Disconnected');
			});

			connection.on(VoiceConnectionStatus.Destroyed , () => {
				console.log('The connection has been Destroyed ');
			});
	
	

			if (!subscription) {
				console.log('#> if (subscription) ');
				// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
				subscription.unsubscribe();
			}

		}else{
			console.log('#> Please connect DurranBot to voica channel first');
			await interaction.reply(`${target} Please connect DurranBot to voice channel first`);
		}
		*/
		}catch(error){
			console.log('#> Play command error : ', error);
		}
	}
};