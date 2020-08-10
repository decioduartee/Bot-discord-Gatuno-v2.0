  
const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "warn",
    aliases: ['report'],
    description: "reports a user of the guild",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    userPerm: ["MANAGE_MESSAGES"],
    botPerm: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
      
      if (!args[0]){
          const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione um Membro que deseja aplicar o Warn!`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
      }

      let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
      if (!target){
          const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione um Membro valido para aplicar o Warn!`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
      }
      if (target.id === message.member.id){
          const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não pode dar warn me você mesmo!`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
      }
      
      let reason = args.slice(1).join(" ")

      if (target.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0){
          const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:error:715218174215323691> **| ERRO**\nNão é possível aplicar warn neste usuário!`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
    }
      
    try {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setThumbnail(message.guild.iconURL())
          .setDescription(`Olá, você acaba tomar um Warn`)
          .addField('Servidor', `${message.guild.name}`)
          .addField("Moderador responsavel", message.author)
          .addField('Motivo', `${reason || "Nenhum motivo definido"}`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
      target.send(embed)
    } catch(e) {
      
    }
      if (reason) {
      const embed = new MessageEmbed()
          .setColor("#206694")
          .setAuthor(`${message.guild.name}`, message.guild.iconURL())
          .setDescription(`${target} Acaba de receber um Warn, veja mais em <#${db.get(`punichannel_${message.guild.id}`)}>!`)
      message.channel.send(embed)
      } else {
          const embed = new MessageEmbed()
          .setColor("#206694")
          .setAuthor(`${message.guild.name}`, message.guild.iconURL())
          .setDescription(`${target} Acaba de receber um Warn!`)
      message.channel.send(embed)
      }

      let channel = db.get(`punichannel_${message.guild.id}`)
      if (!channel) return;

      const sembed = new MessageEmbed()
          .setTimestamp()
          .setColor("#2f3136")
          .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
          .setFooter(message.guild.name, message.guild.iconURL())
          .setAuthor(`${message.guild.name} Puni`, message.guild.iconURL())
          .addField("**Comando usado**", "warn")
          .addField("**Membro que recebeu warn**", `${target}`)
          .addField("**ID Do Membro**", `${target.user.id}`)
          .addField("**Warn de**", `${message.member}`)
          .addField("**Recebeu Warn em**", `${message.channel}`)
          .addField("**Motivo**", `${reason || "**Nenhum motivo definido**"}`)
      const sChannel = message.guild.channels.cache.get(channel)
      if (!sChannel) return;
    sChannel.send(sembed)
  }
}