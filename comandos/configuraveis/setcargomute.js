module.exports = {
    name: "setmute",
    aliases: ["setmute", "setcargomute", "mutecargo"],
    category: "configuraveis",
    run: async (client, message, args, database) => {
      const { MessageEmbed } = require(`discord.js`);

      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const noperm = new MessageEmbed()
          .setDescription( `<:errado:736447664329326613> **| ERRO AO SETAR O CARGO** \n\n • **Informações:** \n • Você não tem permsissão para isso \n > Você precisa da permissão **ADMINISTRATOR** para utiliar este comando`, true)
          .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setColor("#2f3136");
        message.delete().catch();
        message.channel.send(noperm);
        return;
      }
  
        const mention = message.mentions.roles.first();
        if (!mention) {
            const embed = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`<:errado:736447664329326613> **| ERRO AO SETAR O CARGO** \n\n • **Informações:** \n • Mencione o cargo desejado!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            message.channel.send(embed)
         return;
        }
  
        await database.ref(`/Servidores/${message.guild.id}/Cargos/CargosMute/CargoMute`).set(mention.id)
        
      const embed = new MessageEmbed()
        .setDescription(`<:certo:736447597102760007> **| SUCESSO AO SETAR O CARGO** \n\n • **Informações:** \n • Cargo de Mute definido para: ${mention}`)
        .setColor("#2f3136")
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      message.delete().catch();
      message.channel.send(embed);
    },
};