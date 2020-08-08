const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
    name: "volume",
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setColor("#2f3136");

    const { channel } = message.member.voice;
    if (!channel) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO** \n\n • Entre em um canal de voz")
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }
    
     const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO** \n\n • O bot não está reproduzindo nada")
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }
    
    if(!args[0]) {
      embed.setDescription(`<:volume:733882816357597205> **| INFORMAÇÕES DO VOLUME** \n\n » **Volume Atual:** \n > • ${serverQueue.volume}%`)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}v"`, message.client.user.displayAvatarURL());
      return message.channel.send(embed)
    }
    
    if(isNaN(args[0])) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO** \n\n • Use apenas valores numéricos")
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed)
    }
    
    if(args[0] > 200) {
      embed.setDescription(`<:volume:733882816357597205> **| INFORMAÇÕES DO VOLUME** \n\n • Volume acima de **200%** pode prejudicar \n • A sua audição, por isso não posso passar desse volume.`)
      embed.setThumbnail(client.user.displayAvatarURL())
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setDescription(`<:volume:733882816357597205> **| INFORMAÇÕES DO VOLUME** \n\n » **Volume setado em:** \n > • ${args[0]}%`)
    embed.setThumbnail(client.user.displayAvatarURL())
    embed.setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
    message.channel.send(embed)
    
  }
};
