module.exports = async (oldMessage, newMessage) => {

    const { MessageEmbed } = require("discord.js")
    
    if (oldMessage.content === newMessage.content) {
      return;
    }
  
    let EditEmbed = new MessageEmbed()
      .setAuthor(`Mensagem Editada`, newMessage.guild.iconURL({dynamic: true}))
      .setColor("#2f3136")
      .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Registro de mensagens editadas por ${oldMessage.author}. \n\n **• Informações** \n ▪︎ **Antes**: ${oldMessage.content} \n ▪︎ **Depois**: ${newMessage.content} \n ▪︎ **No canal**: ${newMessage.channel} \n ▪︎ **Servidor**: ${newMessage.guild.name}`);
  
    let canais = await database.ref(`Servidores/${newMessage.guild.id}/Canais/CanalLog`).once('value')
    canais = canais.val()
  
    const canal = newMessage.guild.channels.cache.get(canais)
    if (!canal) return;
    canal.send(EditEmbed);
}