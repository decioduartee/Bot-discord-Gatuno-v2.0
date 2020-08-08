module.exports = {
  name: "setcolor",
  aliases: ["setcor"],
  category: "configuraveis",
  run: async (client, message, args) => {
    const db = require("quick.db");
    const { MessageEmbed } = require("discord.js");

    if (!args[0]) {
      const embedi = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`<:error:715218174215323691> **| ERRO**\nEscreva a cor que deseja em **HEX COLOR**`,true)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.delete().catch();
      message.channel.send(embedi);
      return;
    }
    
    let color = /^[0-9A-F]{6}$/i.test(args[0]);
    if (color === false) {
      const embedi = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`<:error:715218174215323691> **| ERRO**\nDigite uma cor validaem **HEX COLOR** sem a #, como por exemplo: \`206694\``,true)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.delete().catch();
      message.channel.send(embedi);
      return;
    }

    db.set(`color_${message.author.id}`, args[0]);
    var cor = db.get(`color_${message.author.id}`);
    const embed = new MessageEmbed()
        .setColor(cor)
        .setDescription()
      .setThumbnail(message.author.displayAvatarURL())
      .setTitle(`<:okay:715354134231908372> Cor atualizada!`)
      .setDescription(`<:okay:717898352632528927> » Cor atualizada com sucesso! sua nova cor é: \`${cor}\`\n<:Bio:715348236084183091> » Você pode ver a cor escolida na cor dessa mensagem.`)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
    message.delete().catch();
    message.channel.send(embed);
  },
};