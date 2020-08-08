module.exports = {
    name: "ping",
    category:  "info",
    description: "Mostra o ping do bot",
    usage: "ping",
    run: (client, message) => {
      const { MessageEmbed } = require('discord.js')

        let embed = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`<:ontime:733535248041771009> **PONG**`)
        .addField(`**PING DA API**`, `• ${client.ws.ping}ms.`)
        .addField(`**TEMPO DE RESPOSTA**`, `• ${Date.now() - message.createdTimestamp}ms.`)
        message.channel.send(embed)
    }
} 