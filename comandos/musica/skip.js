const { MessageEmbed } = require('discord.js')
const { prefix } = require("../../config.json");

module.exports = {
    name: "skip",
    description: "faz com que o bot pule a musica para a proxima",
    aliases: ["s", "pular"],
    run: async (client, message, args) => {

        const {channel } = message.member.voice;
        if (!channel) {
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:Erro:733785842438635571> **| ERRO AO PULAR DE MÚSICA** \n\n > • Por favor entre em um canal de voz`)
            .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}s"`, message.client.user.displayAvatarURL());
          message.channel.send(embed).catch(console.error);
        return;
        }

        const serverQueue = message.client.queue.get(message.guild.id)
        
        if(!serverQueue) {
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:Erro:733785842438635571> **| ERRO AO PULAR DE MÚSICA** \n\n > • Não há música para pular`)
            .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
          message.channel.send(embed).catch(console.error);
        return;
        }

        serverQueue.connection.dispatcher.end()
    }
}
