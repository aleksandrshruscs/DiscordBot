// Require the necessary discord.js classes
require('dotenv').config(); // to use .env type file
const guildId = process.env.GUILDID;
const clientId = process.env.CLIENTID;
const token = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require('discord.js');
const {  getVoiceConnection  } = require('@discordjs/voice');


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageTyping  ],disableMentions: 'everyone', });

client.commands = new Collection();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	//client.user.setActivity('activity', { type: ActivityType.Listening });
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
var isPause = false;
var isStop = false;
client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()){

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		try {
			// run the command
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

	}else if(interaction.isButton()){
		console.log('button pressed');
		if (!interaction.member.voice.channelId) {
			console.log('not in a channel.');
		}
		const button = interaction.customId;

		const connection = getVoiceConnection(interaction.member.voice.channel.guildId);

		if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
			console.log('The bot is not in this channel.');
		}
		try {
			
			let player;
			if(connection.state.subscription){
				player = connection.state.subscription.player;
			}
			if(button === 'pauseunpause'){
				if(!isPause && player){
					console.log('button pressed pause ');
					player.pause();
					isPause = true;
					console.log('isPause' + isPause);

					const filter = interaction => interaction.customId === 'pauseunpause' ;
					console.log('filter ' + filter.customId);
					const collector = interaction.channel.createMessageComponentCollector({ filter: filter, max: 1, time: 300 });
			
					collector.on('collect', async (m) => {
							await m.deferUpdate();
							return await m.editReply({ content: `ACCEPT!`, embeds: [], components: [] });
					}); 

				}else if (isPause && player){
					console.log('button pressed unpause ');
					player.unpause();
					isPause = false;
					console.log('isPause' + isPause);
				}

			}else if(button === 'stop' && player ){
				player.stop();
				console.log('isStop');
				connection.state.subscription.unsubscribe();
				isPause = false;
				isStop = true;
				await interaction.reply('You stopped the Song');

			}else if(button === 'Press' ){
				const filter = interaction => interaction.customId === 'Press' ;
				console.log('filter ' + filter);
				const collector = interaction.channel.createMessageComponentCollector({  filter, time: 5000 });
				console.log('collector ' + collector);
				collector.on('collect', async (m) => {
						//await m.deferUpdate();
						console.log('collector.on collect');
						await m.update({ content: `ACCEPT!`, embeds: [], components: [] });
				}); 
				collector.on('end', collected => console.log(`Collected ${collected.size} items`));
			}
			return;
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}else{
		return;
	}
});

client.on("voiceStateUpdate", function(oldMember, newMember){
	var currentdate = new Date(); 
	var datetime = "" + currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1)  + "/" 
					+ currentdate.getFullYear() + " @ "  
					+ currentdate.getHours() + ":"  
					+ currentdate.getMinutes() + ":" 
					+ currentdate.getSeconds();
	console.log(`[${datetime}] a user changes voice state => : \n #> oldMember => ${JSON.stringify(oldMember)} \n #> newMember => ${JSON.stringify(newMember)} `);

});

client.on("debug", function(info){
	var currentdate = new Date(); 
var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    console.log(`[${datetime}] debug => : ${info}`);
});

client.on("messageCreate", function(message){
    console.log(`a message was created`);
    console.log({message});
});

client.on("error", function(error){
    console.error(`client's WebSocket encountered a connection error: ${error}`);
});


// Log in to Discord with your client's token
client.login(token);

