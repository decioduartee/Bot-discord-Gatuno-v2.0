module.exports = {
name: "removeallrole",
description: " ",
aliases: ["removeall", "rlr"],
run: async (client, message, args) => {
  
  const { MessageEmbed } = require("discord.js")
  
      if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:error:715218174215323691> **| ERRO**\nEu não tenho a permissão \`MANAGE_EMOJIS\``)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
    }

    if (!args[0]) {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê precisa definir o nome desse emoji`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
    }

  
  const role = message.mentions.roles.first();
    
    if (!role) {
      const embed = new MessageEmbed()
        .setDescription(`<:error:715218174215323691> **| ERRO AO ADICIONAR O CARGO** \n\n • Mencione o cargo que devo adicionar ao membros`)
        .setColor("#2f3136")
        .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed);
      return;
    }

  message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.remove(role)) 
  
    let membro = message.guild.members.cache.size;
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:certo:736447597102760007> **| SUCESSO AO REMOVER O CARGO**`)
      .addField("**• Informações**", `▪︎ **Cargo adicionado:** ${role} \n **▪︎ Removido de:** ${membro.toLocaleString()} Membros`)
      .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    message.channel.send(embed)
  }
}