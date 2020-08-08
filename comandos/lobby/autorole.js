module.exports = {
  name: "autorole",
  aliases: ["welcomerole"],
  category: "autorole",
  run: async (client, message, args, database) => {
    const { MessageEmbed } = require("discord.js");

    if (!message.member.hasPermission("ADMINISTRATOR")){
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:error:715218174215323691> **| ERRO** \n\n •Você não tem a permissão \`ADMINISTRATOR\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed)
    return;
    }

    if (!message.guild.me.hasPermission("ADMINISTRATOR")){
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:error:715218174215323691> **| ERRO** \n\n • Eu não tenho a permissão \`ADMINISTRATOR\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed)
    return;
    }
    
    const mention = message.mentions.roles.first();
    
    if (!mention) {
      const embed = new MessageEmbed()
        .setDescription(`<:error:715218174215323691> **| ERRO** \n\n • Mencione o cargo que devo adicionar aos novos membros`, true)
        .setColor("#2f3136")
        .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed);
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`Autorole completo!`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`**${message.author}**, o cargo foi setado com sucesso! \n\n <:iid:707829912689704962> » Cargo: ${mention}`)
      .setColor('#2f3136')
    message.channel.send(embed);
    database.ref(`/Servidores/${message.guild.id}/Cargos/AltoRole`).set(mention.id)
  },
};