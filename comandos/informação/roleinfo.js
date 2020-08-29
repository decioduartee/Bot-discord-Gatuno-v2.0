const Discord = require("discord.js");
const moment = require('moment')
moment.locale('pt-BR')

function prettyString(string) {
 return string.replace(/_/g, " ").replace(/guild/gi, "Server").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

module.exports = {
  name: "roleinfo",
  category: "informação",
  description: "informações de um cargo",
  usage: "<role>",
  run: async (client, message, args) => {

    if (!args[0]) return message.channel.send(":x: | You didn't provide a role.");

    let role = message.mentions.roles.first()

    if (!role) return message.channel.send(":x: | You didn't provide a true role.");

    let total = 0;
    message.guild.members.cache.forEach(member => {
      if (member.roles.cache.get(role.id)) total++
    })

    let perms = []
    role.permissions.toArray().forEach(perm => {
    perms.push(prettyString(perm))
    })
    
    let Mencionavel = String(role.mentionable)[0].toUpperCase() + String(role.mentionable).substr(1)
    let Separado = String(role.hoist)[0].toUpperCase() + String(role.hoist).substr(1)
    let BotRole = String(role.managed)[0].toUpperCase() + String(role.managed).substr(1)
    
    if(Mencionavel.toLowerCase() === 'true') {
      var Mencionavels = 'Sim'
    } else if (Mencionavel.toLowerCase() === 'false') {
      var Mencionaveln = 'Não'
    }
    
    if(Separado.toLowerCase() === 'true') {
      var Separados = 'Sim'
    } else if (Separado.toLowerCase() === 'false') {
      var Separadon = 'Não'
    }
    
    if(BotRole.toLowerCase() === 'true') {
      var BotRoles = 'Sim'
    } else if (BotRole.toLowerCase() === "false") {
      var BotRolen = 'Não'
    }

    const roleEmbed = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(role.color)
      .setThumbnail(message.guild.iconURL({ format: "png", size: 2048, dynamic: true }))
      .setDescription(`<:certo:736447597102760007> **| CARGOINFO**`)
      .addField('• **Informações**', [
        `• Nome: ${role.name}`,
        `• Cargo Bot: ${BotRolen || BotRoles}`,
        `• Cargo Id: ${role.id}`,
        `• Membros com o cargo: ${total.toLocaleString()}`,
      ])
      .addField("• **Bonus**", [
        `• Separado: ${Separadon || Separados}`,
        `• Mencionavel: ${Mencionaveln || Mencionavels}`,
        `• Posição: ${role.rawPosition}/${message.guild.roles.cache.size - 1}`,
        `• Cor do cargo(Hex): #${role.color.toString(16)}`,
        `• Criado em: ${moment(role.createdAt).format("LLL")}`,
      ])
      .setFooter(`Pagina: 1/2`);
    return message.channel.send(roleEmbed).then(msg => {
      msg.react("🔗")
      msg.react('👾')
      
      let permFilter = (reaction, user) => reaction.emoji.name === '👾' && user.id === message.author.id;
      let cargoFilter = (reaction, user) => reaction.emoji.name === ("🔗") && user.id === message.author.id;
      let perm = msg.createReactionCollector(permFilter)
      let cargo = msg.createReactionCollector(cargoFilter)
      
      cargo.on('collect', r => {
        r.users.remove(message.author.id)
        msg.edit(roleEmbed)
      })
      
      perm.on("collect", r => {
        let permi = new Discord.MessageEmbed()
        .setColor(role.color)
        .addField(`• **Permissões [** ${perms.length} **]**`, `${perms.length > 0 ? perms.join(", ") : "Sem Permissões"}`)
        .setFooter(`Pagina: 2/2`);
        msg.edit(permi)
      })
    })
  }
};