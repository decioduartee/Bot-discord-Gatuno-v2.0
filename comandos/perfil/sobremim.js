module.exports = {
  name: "sobremim",
  aliases: ["biografia", "setbio"],
  category: "configuraveis",
  run: async (client, message, args) => {
    const db = require("quick.db");
    const { MessageEmbed } = require("discord.js");

    if (!args[0]) {
      const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`<:error:715218174215323691> **| ERRO**\n  Escreva a mensagem da sua biografia`)
    message.channel.send(embed)
    return;
    }
    if (message.content.includes("`")) {
    const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`<:error:715218174215323691> **| ERRO**\n  Para a sua biografia ficar bonita, alguns caracteres está bloqueado!`)
    message.channel.send(embed)
    return;
    }
    if (message.content.includes("*")) {
      const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`<:error:715218174215323691> **| ERRO**\n Para a sua biografia ficar bonita, alguns caracteres está bloqueado!`)
    message.channel.send(embed)
    }
    if (message.content.includes("_")) {
    const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`<:error:715218174215323691> **| ERRO**\n Para a sua biografia ficar bonita, alguns caracteres está bloqueado!`)
    message.channel.send(embed)
    return;
    }
    db.set(`biografia_${message.author.id}`, args.join(" ").trim());
    var bio = db.get(`biografia_${message.author.id}`);
    const embed = new MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`<:okay:715354134231908372> Biografia`)
      .setDescription(`<:send:715353578742480907> » Biografia atualizada com sucesso! Sua nova biografia é:\n\`\`\`md\n# ${bio}\n\`\`\``)
      .setColor('#206694')
    message.delete().catch();
    message.channel.send(embed);
  },
};