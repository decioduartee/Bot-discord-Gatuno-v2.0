module.exports = {
  name: "topic",
  description: "Use esse comando para setar o topico do canal",
  userPerm: ["MANAGE_CHANNELS"],
  botPerm: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    
    const { MessageEmbed } = require("discord.js")
    const { prefix } = require("../../config.json")

    let info = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription("<:errado:736447664329326613> **| ERRO SETAR TOPICO**")
      .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
      .addField("• **Informações:**", `• **Use:** \`${prefix}topic\` \n • **Exemplo:** \`${prefix}topic #chat-geral < mensagem >\``) 
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
  
    const canal = message.mentions.channels.first()

    const a = args.slice(1).join(' ');

    if(!canal) {
      a = args.slice(0).join(' ');
      canal = message.channel;

    if(!a) {
      message.channel.send(info)
      }
    }

    if(a) {
      canal.setTopic(a)
  
      let sucess = new MessageEmbed()
        .setColor("#2f3136")
        .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
        .setDescription("<:certo:736447597102760007> **| SUCESSO SETAR O TOPICO**")
        .addField("• **Informações:**", `• **Canal:** ${canal} \n • **Mensagem Setada:** \n \`\`\`${a}\`\`\``)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      message.channel.send(sucess)
    }
  }
}