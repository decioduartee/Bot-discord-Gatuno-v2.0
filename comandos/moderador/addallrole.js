module.exports = {
name: "addallrole",
description: "Adicione um cargo em todos os membros do servidor",
userPerm: ["ADMINISTRATOR"],
aliases: ["addallr", "allrole"],
run: async (client, message, args) => {
  
  const { MessageEmbed } = require("discord.js")
  
  const role = message.mentions.roles.first();
    
    if (!role) {
      const embed = new MessageEmbed()
        .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Mencione o cargo que devo adicionar ao membros`)
        .setColor("#2f3136")
        .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed);
      return;
    }

  message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role)) 
  
  setTimeout(() => {
    let membros = message.guild.members.cache.filter(m => !m.user.bot).size;
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:certo:736447597102760007> **| SUCESSO AO ADICIONAR O CARGO**`)
      .addField("**• Informações**", `▪︎ **Cargo adicionado:** ${role} \n **▪︎ Adicionado há:** ${membros} Membros`)
      .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    message.channel.send(embed)
  }, 600)
  }
}
