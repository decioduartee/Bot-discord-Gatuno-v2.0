const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config.json");

module.exports = {
    name: "stop",
    aliases: ["sair", "s", "leave"],
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
    
    
    let embed = new MessageEmbed()
    .setColor("#2f3136");

    const { channel } = message.member.voice;
    if (!channel) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO** \n\n • Entre em um canal de voz")
      .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}sp"`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO** \n\n • Não há nada tocando que eu possa parar")
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
};