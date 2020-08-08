module.exports = {
    name: "removeemoji",
    aliases: [],
    category: "moderador",
    run: async (client, message, args) => {
      const { MessageEmbed } = require("discord.js");
  
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
            .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê precisa colocar o URL desse emoji`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
      }
      
      if (!message.member.hasPermission("MANAGE_EMOJIS")) {
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não possui a permissão \`MANAGE_EMOJIS\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
      }
      
      try {
        message.guild.emojis.resolve(args[0]).delete().then((emojii) => {
          const embed = new MessageEmbed()
            .setDescription(`<:Verified:714992515782279198> **Emoji removido com sucesso**!\nEmoji deletado: ${emojii}`)
            .setColor(`#2f3136`);
          message.delete().catch;
          message.channel.send(embed);
        });
      } catch (err) {
        message.delete().catch;
        message.channel.send(`Errou: ${err}`);
      }
    },
  };