module.exports = {
  name: "criarcanal",
  aliases: ["createchannel", "criar-canal", "create-channel"],
  category: "moderador",
  userPerm: ["MANAGE_CHANNELS"],
  botPerm: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    
    const { MessageEmbed } = require("discord.js");
    
    try {
      if (!args[0]) {
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO CRIAR O CANAL** \n\n • Escreva o tipo do canal (\`Voice\` ou \`Text\`)`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
      }

      if (!args[1]) {
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO CRIAR O CANAL** \n\n • Escreva o nome do canal`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
      }

      const feito = new MessageEmbed()
        .setDescription(`<:okay:715354134231908372> **Canal criado com sucesso**!\n\nTipo: \`${args[0]}\`\nNome: \`${args[1]}\``)
        .setColor('#2f3136')
      message.channel.send(feito).then(() => {
        message.guild.channels.create(args[1], { type: args[0] }).catch((err) => {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO CRIAR O CANAL** \n\n • Ocorreu um erro ao tentar criar esse canal... Tente novamente!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        })
      })
    } catch (err) {
      message.channel.send(`Erro: ${err}`).catch();
    }
  },
};