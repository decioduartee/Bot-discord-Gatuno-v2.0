module.exports = {
    name: "limpar",
    description: "limpar o chat",
    aliases: ['limpar', 'clear'],
    category: "moderador",
    run: async (client, message, args) => {
      
      const { MessageEmbed } = require('discord.js')

      if (!message.member.hasPermission("MANAGE_MESSAGES")){
        const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:errado:736447664329326613> **| ERRO AO LIMPAR** \n\n • Você não tem a permissão \`MANAGE_MESSAGES\``)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed)
      return;
      }
  
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES")){
        const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:errado:736447664329326613> **| ERRO AO LIMPAR** \n\n • Eu não tenho a permissão \`MANAGE_MESSAGES\``)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed)
      return;
      }
        
        message.delete({ timeout: 5000}).catch(() => {})
            
        if (isNaN(!args[0]) && isNaN(args[0])) {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO LIMPAR** \n\n • **Informações** \n • **Erro:** Me informe um valor de \`1\` a \`100\`.`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          return message.channel.send(embed).then(async msg => {
                await msg.react('🤚')
                msg.delete({ timeout: 9000 })
            })
        }

        if (args[0] > 100) {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO LIMPAR** \n\n • **Informações** \n • **Erro:** Consigo apagar até \`100\` mensagens de uma vez.`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          return message.channel.send(embed).then(async msg => {
                await msg.react('🤚')
                msg.delete({ timeout: 20000 })
            })
        }

        message.channel.bulkDelete(args[0] || 100)
        .then(deleted => {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(message.guild.iconURL({ format: "png", size: 2048, dynamic: true }))
            .setDescription(`<:certo:736447597102760007> **| SUCESSO AO LIMPAR** \n\n • **Informações** \n • **Mensagens apagada:** \`${deleted.size}\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          return message.channel.send(embed).then(msg => msg.delete({ timeout: 9000 })).catch(() => {})
        })
    }
}