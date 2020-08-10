module.exports = async (client, message ) => {

    //eventos com mensagem estão aqui
    
    const firebase = require('firebase')
    const database = firebase.database()
    const { MessageEmbed } = require("discord.js")

    //____________________________________________________________________________

    client.on("messageUpdate", async (oldMessage, newMessage) => {
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
  })

  //____________________________________________________________________________

  client.on("messageDelete", async (message, channel) => {

    let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalLog`).once(`value`)
    canais = canais.val()
  
    let DeleteEmbed = new MessageEmbed()
      .setAuthor(`Mensagem Deletada`, message.guild.iconURL({dynamic: true}))
      .setColor("#2f3136")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Registro de mensagens deletadas por ${message.author}. \n\n **• Informações** \n ▪︎ **Mensagem Deletada**: ${message} \n ▪︎ **No canal**: ${message.channel} \n ▪︎ **Servidor**: ${message.guild.name}`)
  
    const canal = message.guild.channels.cache.get(canais);
      if (!canal) return;
    canal.send(DeleteEmbed);
  })

  //____________________________________________________________________________

  client.on("guildMemberUpdate", async (oldMember, newMember) => {
  
    let canais = await database.ref(`Servidores/${newMember.guild.id}/Canais/CanalLog`).once(`value`)
    canais = canais.val()
  
    const canal = newMember.guild.channels.cache.get(canais);
    if (!canal) return;
  
    let membros = [oldMember.nickname, newMember.nickname];
  
    if (membros[0] == null) 
    {
      membros[0] = oldMember.user.username;
    }
    if (membros[1] == null) 
    {
      membros[1] = newMember.user.username;
    }
  
    if (oldMember.nickname != newMember.nickname) 
    {
      let ApelidoEmbed = new Discord.MessageEmbed()
        .setAuthor(`Apelido alterado`, newMember.guild.iconURL({ dynamic: true }))
        .setColor("#2f3136")
        .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Registro de apelidos alterados por ${newMember}. \n\n **• Informações** \n ▪︎ **Antes**: ${membros[0]} \n ▪︎ **Depois**: ${membros[1]} \n ▪︎ **Servidor**: ${newMember.guild.name}`);
      canal.send(ApelidoEmbed);
    }
  })
}