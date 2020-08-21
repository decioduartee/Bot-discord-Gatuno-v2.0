const { MessageEmbed } = require("discord.js");
const firebase = require('firebase')
const database = firebase.database()

module.exports = async (message, channel) => {

    let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalLog`).once(`value`)
    canais = canais.val()
  
    let DeleteEmbed = new MessageEmbed()
      .setAuthor(`Mensagem Deletada`, message.guild.iconURL({dynamic: true}))
      .setColor("#2f3136")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Registro de mensagens deletadas por ${message.author}. \n\n **• Informações** \n ▪︎ **Mensagem Deletada**: ${message} \n ▪︎ **No canal**: ${message.channel} \n ▪︎ **Servidor**: ${message.guild.name}`)
  
    const canal = message.guild.channels.cache.get(canais);
      if (!canal) return;
    return canal.send(DeleteEmbed);
}