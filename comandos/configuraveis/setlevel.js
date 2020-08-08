module.exports = {
  name: "setlevel",
  aliases: ["setlevel", "setchannellevel"],
  category: "configuraveis",
  run: async (client, message, args, database) => {
    const { MessageEmbed } = require(`discord.js`);
    const db = require(`quick.db`);

      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const noperm = new MessageEmbed()
          .setDescription( `<:errado:736447664329326613> **| ERRO AO SETAR O CANAL** \n\n • **Informações:** \n • Você não tem permsissão para isso \n > Você precisa da permissão **ADMINISTRATOR** para utiliar este comando`, true)
          .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setColor("#2f3136");
        message.delete().catch();
        message.channel.send(noperm);
        return;
      }

        const mention = message.mentions.channels.first();
        if (!mention) {
            const embed = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`<:errado:736447664329326613> **| ERRO AO SETAR O CANAL** \n\n • **Informações:** \n • Mencione o canal desejado!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            message.channel.send(embed)
         return;
        }

    database.ref(`Servidores/${message.guild.id}/Canais/CanalLevel`).set(mention.id);
    
        const embed = new MessageEmbed()
            .setDescription(`<:certo:736447597102760007> **| SUCESSO AO SETAR O CANAL** \n\n • **Informações:** \n • Canal de level setado para: ${mention}`)
            .setColor("#2f3136")
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          message.delete().catch();
        message.channel.send(embed);
    }
};
