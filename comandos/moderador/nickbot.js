const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nickbot",
  description: "Aletere o apelido do bot",
  run: async(client, message, args) => {
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")){
        const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:errado:736447664329326613> **| ERRO AO ALETERAR MEU APELIDO ** \n\n • Você não tem a permissão \`MANAGE_MESSAGES\``)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed)
      return;
    }
  
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")){
        const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:errado:736447664329326613> **| ERRO AO ALETERAR MEU APELIDO** \n\n • Eu não tenho a permissão \`MANAGE_MESSAGES\``)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed)
      return;
    }
    
    let username = args.join(' ');
    
    if (username.length < 1) return message.reply('**Por Favor me informe um nome**')
    
    message.guild.members.cache.get(client.user.id).setNickname(username);
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
      .setDescription(`<:certo:736447597102760007> **| APELIDO ALTERADO COM SUCESSO** \n\n • **Informações:** \n • **Meu Novo Apelido:** \`${username}\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
    message.channel.send({embed})
  }
}