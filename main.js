'use strict'
const { Client } = require('discord.js-selfbot-v13')

const client = new Client()
const config = require('./config.json')

client.once('ready', async (client) => {
    console.log(`${client.user.username} is ready.`)
})

client.on('messageCreate', async (msg) => {
    if (msg.content === '!boom') {
        try {
            const channel = await msg.channel;
            channel.messages.fetch({ limit: 100 }).then(messages => {
                console.log(`Received ${messages.size} messages`);
                //Iterate through the messages here with the variable "messages".
                messages.forEach(message => {
                    console.log(message.content)
                    message.delete()
                })
            })
        } catch (e) {
            await msg.reply(e)
        }
    }
})

client.login(config.token)

process.on('uncaughtException', (err) => {
    console.error(err)
})