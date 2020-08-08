const ownerid = "683555315957891149";

const { MessageEmbed } = require('discord.js')
        
module.exports = {
    name: "restart",
    aliases: ["reiniciar", "restart"],
    category: "economia",
    run: (client, message, args) => {
      
      message.delete().catch(() => {})
      
      if (message.author.id === ownerid) {

        const embed = new MessageEmbed()
          .setDescription(`<:certo:736447597102760007> **| SUCESSO AO REINICIAR** \n\n • **Informações:** \n ▪︎ **Meu ping:** \`${client.ws.ping}\`ms!`)
          .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setColor('#2f3136')
        message.channel.send(embed).then(() => {process.exit(1)})
        
      } else {
        return;
      }
    }
}