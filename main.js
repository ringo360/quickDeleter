'use strict'
const { Client, Collection, Message } = require('discord.js-selfbot-v13')

const client = new Client()
const config = require('./config.json')

client.once('ready', async (client) => {
    console.log(`${client.user.username} is ready.`)
})

client.on('messageCreate', async (msg) => {
	if (msg.author.id !== client.user.id) return
    if (msg.content.startsWith('!boom')) {
        try {
			const count = parseInt(msg.content.split(' ')[1])
			if (isNaN(count) || count <= 0) {
				await msg.reply('Invalid usage. Usage => !boom <amount>');
				return;
			}
            const channel = await msg.channel;
		    const messages = await channel.messages.fetch({ limit: 100 });
			console.log(`Received ${messages.size} messages`);

			// メッセージをループ処理し、実行者のメッセージのみ削除
			let deletedCount = 0;
			messages.some(message => {
				if (message.author.id === msg.author.id) {
					console.log(message.content);
					if (message.deletable) {
						message.delete();
						deletedCount++;
					}
					return deletedCount >= count; // 指定個数削除したらループを止める
				}
			});

		} catch (e) {
			console.log(e)
			await msg.reply(`Err: ${e}`)
		}
	}
})

client.login(config.token)

process.on('uncaughtException', (err) => {
    console.error(err)
})
