const { MessageEmbed } = require("discord.js");
const {prefix} = require("../../config.json");

module.exports = {
    name: "queue",
    aliases: ["fila"],
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
      
    let embed = new MessageEmbed()
    .setColor("#2f3136");
      
    const { channel } = message.member.voice;
    if (!channel) {
          embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO VER A FILA** \n\n • Por favor entre em um canal de voz para ver a fila`)
          embed.setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}fila"`, message.client.user.displayAvatarURL());
        message.channel.send(embed)
      return;
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO VER A FILA** \n\n • Não há nada na fila`)
      return message.channel.send(embed);
    }

    embed.setThumbnail(client.user.displayAvatarURL())
    embed.setDescription(`<:queue:733837496450023485> **| Fila De Músicas** \n\n ${serverQueue.songs.map((song, index) => index + 1 + ' » ' + song.title).join("\n")}`,{ split: true })
    embed.setFooter(`Aqui está minha playlist de musicas`, `${client.user.displayAvatarURL()}`)
    
    message.channel.send(embed);
  }
};