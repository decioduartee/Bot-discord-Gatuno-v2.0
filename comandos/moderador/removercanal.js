module.exports = {
  name: "removercanal",
  aliases: ["remover-canal", "removechannel"],
  category: "moderador",
  userPerm: ["MANAGE_CHANNELS"],
  botPerm: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    
    const { MessageEmbed } = require("discord.js");
    const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

    
    try {
      if (!args[0]) {
        const embed = new MessageEmbed()
            .setColor("#e74c3c")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione o canal que deseja apagar`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
      }

      if(message.mentions.channels.first()){
        const feito = new MessageEmbed()
          .setDescription(`<:okay:715354134231908372> **Canal apagado com sucesso**\n\n<:logs:716194178035482635> Nome do canal: ${canal}`)
          .setColor('#2f3136')
          canal.delete()
          message.channel.send(feito)
        return;
      } else if(message.guild.channels.cache.get(args[0])){
        const feito = new MessageEmbed()
          .setDescription(`<:okay:715354134231908372> **Canal apagado com sucesso**\n\n<:logs:716194178035482635> Canal deletado por id`)
          .setColor('#2f3136')
          canal.delete()
          message.channel.send(feito)
        return;
      }
    } catch (err) {
      message.channel.send(`Erro: ${err}`).catch();
    }
  },
};