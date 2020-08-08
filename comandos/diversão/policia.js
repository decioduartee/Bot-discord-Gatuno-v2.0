const Discord = require('discord.js');
 
module.exports = {
  name: 'policia',
  description: "use para chamar a policia pra um usuario",
  aliases: ["fbi", "policia"],
  run: async (client, message, args) => {

    const embed = new Discord.MessageEmbed()

    .setColor('#206694')
    .setTitle('FBI OPEN THE DOOR!!!')
    .setFooter(`A FBI foi chamado pelo: ${message.author.username}`, message.author.avatarURL)
    .setImage('https://i.imgur.com/mIPadUO.gif')
    message.react('712141316439408680');
 
    message.channel.send(embed)
  }
}