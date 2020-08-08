const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config.json");

module.exports = {
    name: "skipto",
    aliase: ["st"],
    description: "para pular para uma musica especifica",
    run: async (client, message, args) => {
    
    let embed = new MessageEmbed()
    .setColor("#2f3136");

    const { channel } = message.member.voice;
    if (!channel) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO** \n\n • Entre em um canal de voz")
      .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}sl"`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
      
    if(!serverQueue) {
      const embed = new MessageEmbed()
        embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO PULAR DE MÚSICA** \n\n • Não há nada que eu possa tocar em loop`)
        .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      message.channel.send(embed).catch(console.error);
    return;
    }
      
     if(!args[0]) {
      embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO PULAR DE MÚSICA** \n\n • Me informe o numero da música`)
      message.channel.send(embed).catch(console.error);
    return;
    }
    
      if(isNaN(args[0])) {
        embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO PULAR DE MÚSICA** \n\n • Use apenas valores númericos`)
        .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
       message.channel.send(embed).catch(console.error);
      return;
    }
    
  if(serverQueue.songs.length < args[0]) {
    embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO PULAR DE MÚSICA** \n\n • Não consegui identificar essa música na fila`)
    .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
    return message.channel.send(embed)  
                                         }
    serverQueue.songs.splice(0, Math.floor(args[0] - 1))
    serverQueue.connection.dispatcher.end()
    
    embed.setDescription(`<:Adicionado:733774156742524929> **| Pulei para a música de número** [ **${args[0]}** ] **Da fila**`)
    message.channel.send(embed)
    
  }
}