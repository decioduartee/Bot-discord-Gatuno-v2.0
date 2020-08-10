const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nickbot",
  description: "Aletere o apelido do bot",
  userPerm: ["MANAGE_MESSAGES"],
  botPerm: ["MANAGE_MESSAGES"],
  run: async(client, message, args) => {
    
    let username = args.join(' ');
    
    if (username.length < 1) {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription('<:errado:736447664329326613> **| ERRO AO ALTERAR O APELIDO DO BOT**')
        .addField("• **Informações:**", [
        "• **Mensagem:** Por favor me informe um novo nome"
        ])
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      return message.channel.send(embed)
    }
    
    message.guild.members.cache.get(client.user.id).setNickname(username);
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
      .setDescription(`<:certo:736447597102760007> **| APELIDO ALTERADO COM SUCESSO** \n\n • **Informações:** \n • **Meu Novo Apelido:** \`${username}\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
    message.channel.send({embed})
  }
}