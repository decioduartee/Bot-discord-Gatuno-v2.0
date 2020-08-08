module.exports = {
  name: "poll",
  description: "Use esse comando para fazer votações no servidor",
  usage: "<prefix>poll enquete da votação",
  aliases: ["votação", "urna"],
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js")
    
    let enquete = args.slice().join(" ")
    
    if(!enquete) {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setTitle("PARA INICIAR A VOTAÇÃO ME INFORME A ENQUETE")
      return message.channel.send(embed)
    }
    
    let canal = message.mentions.channels.first()
    let servidor = message.guild.name.toUpperCase()
    
    const embed = new MessageEmbed()
      .setColor("#2f3136")
    .setThumbnail(message.guild.iconURL({ format: "png", size: 2048, dynamic: true }))
      .setDescription(`<:BUGHUNTER_LEVEL_1:741058219077795881> **| VOTAÇÃO ${servidor}** \n\n ${enquete} \n\n • <:certo:736447597102760007> Sim **|** <:errado:736447664329326613> Não`)
      .setFooter(`Votação feita por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    
    if(!canal) return message.channel.send(embed)
    .then((msg) => {
      msg.react("736447597102760007")
      msg.react("736447664329326613")
    })
    
    canal.send(embed)
    .then((msg) => {
      msg.react("736447597102760007")
      msg.react("736447664329326613")
    })
    
  }
}