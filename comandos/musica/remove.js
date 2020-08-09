const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
  name: "remove",
  aliases: ["remover", "r"],
  description: "Use play <nome/url da musica> para tocar uma musica",
  run: async (client, message, args) => {
    let embed = new MessageEmbed().setColor("#2f3136");

    const { channel } = message.member.voice;
    if (!channel) {
      embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO VER A FILA** \n\n • Por favor entre em um canal de voz para ver a fila`);
      embed.setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}r"`,message.client.user.displayAvatarURL());
      message.channel.send(embed);
      return;
    }

    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("A fila está vazia");
      return message.channel.send(embed);
    }

    if (isNaN(args[0])) {
      embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REMOVER** \n\n • Não há músicas na fila`)
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }

    if (args[0] > serverQueue.songs.length) {
       embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REMOVER** \n\n • Não conseguir achar essa música na fila`)
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }

    serverQueue.songs.splice(args[0] - 1, 1);
       embed.setDescription(`<:Adicionado:733774156742524929> **| ACABEI DE REMOVER A MÚSICA [** __${args[0]}__ **] DA FILA**`)
    return message.channel.send(embed);
  }
};
