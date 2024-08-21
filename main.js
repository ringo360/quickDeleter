'use strict'
const { Client, Collection, Message } = require('discord.js-selfbot-v13')

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
		    const messages = await channel.messages.fetch({ limit: 100 });
			// 実行者のメッセージのみを配列に格納
			const userMessages = messages.filter(message => message.author.id === msg.author.id);

			// 最新の10個を取得
			/** @type {Collection<string, Message<boolean>} */
			const latestMessages = userMessages.slice(-count);

			console.log(`Deleting ${latestMessages.length} messages`);

			// メッセージをループ処理
			latestMessages.forEach(message => {
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