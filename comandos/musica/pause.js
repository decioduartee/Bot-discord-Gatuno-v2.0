const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config.json");

module.exports = {
    name: "pause",
    alises: ["ps"],
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
     
    let embed = new MessageEmbed()
      .setColor('#2f3136')
      
    const {channel } = message.member.voice;
      if (!channel) {
          embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n > • Por favor entre em um canal de voz`)
          .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}ps"`, message.client.user.displayAvatarURL());
        message.channel.send(embed)
      return;
      }
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if(!serverQueue) {
        embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n > • não há música para pausar`)
      message.channel.send(embed)
    return;
    }
    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      embed.setDescription("<:pause:733903678616109107> **| Música atual pausada**")
      return message.channel.send(embed)
  }  
  }
}