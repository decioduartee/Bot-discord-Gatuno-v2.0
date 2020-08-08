module.exports = {
  name: "antiinvite",
  aliases: ["antii", "blockinvite"],
  category: "configuraveis",
  run: async (client, message, args, database) => {
    const { MessageEmbed } = require(`discord.js`);
    const { prefix } = require("../../config.json");

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const noperm = new MessageEmbed()
        .setDescription(
          `<:errado:736447664329326613> **| ERRO AO SETAR O CARGO** \n\n • **Informações:** \n • Você não tem permsissão para isso \n > Você precisa da permissão **ADMINISTRATOR** para utiliar este comando`,
          true
        )
        .setThumbnail(
          message.author.displayAvatarURL({
            format: "png",
            size: 2048,
            dynamic: true
          })
        )
        .setFooter(
          `Atenciosamente, ${client.user.username}`,
          client.user.displayAvatarURL()
        )
        .setTimestamp()
        .setColor("#2f3136");
      message.delete().catch();
      message.channel.send(noperm);
      return;
    }

    if (!args[0]) {
      let embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(
          `<:errado:736447664329326613> **| ERRO AO BLOQUEAR IVITES** \n\n • Para Ativar ou Desativar o "Bloqueador De convites" \n\n **Use:** \n • ${prefix}blockinvite on / off`
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          `Atenciosamente, ${message.client.user.username}`,
          message.client.user.displayAvatarURL()
        );
      message.channel.send(embed);
    }

    if (args[0] === "off") {
      let embedon = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(
          "<:certo:736447597102760007> **| SUCESSO AO DESBLOQUEAR IVITES** \n\n • **Informações:** \n • Anti invites está desativado"
        )
        .setFooter(
          `Atenciosamente, ${message.client.user.username}`,
          message.client.user.displayAvatarURL()
        );
      database
        .ref(`Servidores/${message.guild.id}/Defesa/Blockinvite`)
        .set("off");
      message.channel.send(embedon);
    } else if (args[0] === "on") {
      let embedoff = new MessageEmbed()
        .setDescription(
          "<:certo:736447597102760007> **| SUCESSO AO BLOQUEAR IVITES** \n\n **Informações:** \n • anti invites está ativado"
        )
        .setColor("#2f3136")
        .setFooter(
          `Atenciosamente, ${message.client.user.username}`,
          message.client.user.displayAvatarURL()
        );
      database.ref(`/Servidores/${message.guild.id}/Defesa/Blockinvite`).set("on");
      message.channel.send(embedoff);
    }
  }
};
