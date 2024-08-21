'use strict'
const { Client } = require('discord.js-selfbot-v13')

const client = new Client()
const config = require('./config.json')

client.once('ready', async (client) => {
    console.log(`${client.user.username} is ready.`)
})

client.on('messageCreate', async (msg) => {
    if (msg.content.startsWith('!boom')) {
        try {
			const count = parseInt(msg.content.split(' ')[1])
			if (isNaN(count) || count <= 0) {
				await msg.reply('Invalid usage. Usage => !boom <amount>');
				return;
			}
            const channel = await msg.channel;
		    const messages = await channel.messages.fetch({ limit: count + 1 });

			console.log(`Received ${messages.size} messages`);

			// メッセージをループ処理
			messages.forEach(message => {
				message.delete();
			});
		} catch (e) {
			await msg.reply(e)
		}
	}
})

client.login(config.token)

process.on('uncaughtException', (err) => {
    console.error(err)
})