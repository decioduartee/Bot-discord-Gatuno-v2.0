module.exports = {
  name: "addemoji",
  aliases: [],
  category: "moderador",
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");

    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O EMOJI** \n\n • Eu não tenho a permissão \`MANAGE_EMOJIS\``)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
    }

    if (!args[0]) {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O EMOJI** \n\n • Você precisa definir o nome desse emoji`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
    }
    
    if (!args[1]) {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O EMOJI** \n\n • Você precisa colocar o URL desse emoji`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
    }
    
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O EMOJI** \n\n • Você não possui a permissão \`MANAGE_EMOJIS\``)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)
      return;
    }
    
    try {
      message.guild.emojis.create(args[1], args[0]).then((emojii) => {
        const embed = new MessageEmbed()
          .setDescription(`<:Verified:714992515782279198> **Emoji adicionado com sucesso**!\nEmoji: ${emojii}\nCódigo: **\\${emojii}**`)
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