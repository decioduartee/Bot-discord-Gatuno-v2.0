module.exports = {
  name: "setimage",
  aliases: ["setthumb", "setthumbnail", "setimagem"],
  category: "configuraveis",
  run: async (client, message, args) => {
    const db = require("quick.db");
    const { MessageEmbed } = require("discord.js");

    if (!args[0]) {
    const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`<:error:715218174215323691> **| ERRO**\n Escreva o link da imagem que deseja!`)
    message.channel.send(embed)
    return;
    }
    if (!args[0].startsWith(`https://`)) {
    const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`<:error:715218174215323691> **| ERRO**\n  Digite uma imagem valida`)
    message.channel.send(embed)
    return;
    }

    db.set(`imagem_${message.author.id}`, args[0]);
    var image = db.get(`imagem_${message.author.id}`);
    const embed = new MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTitle(`<:okay:715354134231908372> Imagem atualizada!`)
      .setDescription(`<:send:715353578742480907> » Imagem Atualizada com sucesso!`)
      .setColor('#206694')
    message.delete().catch();
    message.channel.send(embed);
  },
};