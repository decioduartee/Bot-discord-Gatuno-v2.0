const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config.json");


module.exports = {
    name: "resume",
    aliases: ["r"],
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
    
  let embed = new MessageEmbed()
  .setColor("#2f3136");

  const {channel } = message.member.voice;
   if (!channel) {
      embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n > • Por favor entre em um canal de voz`)
      .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}r"`, message.client.user.displayAvatarURL());
     message.channel.send(embed).catch(console.error);
    return;
   }

 const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
   embed.setDescription("<:play:733903677751951420> **| Continuando a tocar**")
  return message.channel.send(embed)
 }
    embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n • Não há nada em pausa que eu possa retomar`)
    .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
    message.channel.send(embed)
    
  }
}