const Discord = require("discord.js");
const moment  = require('moment');
moment.locale('pt-BR')

module.exports = {
  name: "channelinfo",
  category: "informações",
  description: "informações de canais",
  aliases: ["ci"],
  run: async (client, message, args) => {

    if (!args[0]) {
      let parentName = message.channel.parentID === null ? "No Category." : client.channels.cache.get(message.channel.parentID).name;
      sendChannelEmbed(message.channel, parentName);
    } else if (args[0]) {

      let channel = message.mentions.channels.first()

      let parentName = channel.parentID === null ? "No Category" : client.channels.cache.get(channel.parentID).name;
      sendChannelEmbed(channel, parentName);
    }


    function sendChannelEmbed(channel, parentName) {
      
      let nsfw = String(channel.nsfw)[0].toUpperCase() + String(channel.nsfw).substr(1)
      if(nsfw.toLowerCase() === 'true') {
        var nsfws = 'Sim'
      } else if (nsfw.toLowerCase() === 'false') {
        var nsfwn = 'Não'
      }
      
      let teste = channel.type[0].toUpperCase() + channel.type.substr(1)
      if(teste.toLowerCase() === 'text') {
        var texto = 'Texto'
      } else if (teste.toLowerCase() === 'news') {
        var noticia = 'Noticia'
      } else if (teste.toLowerCase() === 'store') {
        var loja = 'Loja'
      }
      
      const channelEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("#2f3136")
        .setThumbnail(message.guild.iconURL({ format: "png", size: 2048, dynamic: true }))
        .setDescription(`<:certo:736447597102760007> **| SOBRE O CANAL ${channel.name.toUpperCase()}**`)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .addField("• Criado em", `${moment(channel.createdAt).format('LLL')}`)
        .addField('• ID do canal', channel.id)
        .addField("• Tipo de Canal", `${texto || noticia || loja}`, true)
        .addField("• Posisão", `${channel.rawPosition}/${message.guild.channels.cache.size}`, true)
      if (channel.parentID && channel.type != "voice") {
        channelEmbed.addField("• Nsfw", `${nsfws || nsfwn}`, true)
        channelEmbed.addField("• Categoria", `${parentName}(${channel.parentID})`, true)
        channelEmbed.addField("• Topico", channel.topic === null ? "Nenhum topico definido" : channel.topic)
      }
      return message.channel.send(channelEmbed);
    }
  }
};