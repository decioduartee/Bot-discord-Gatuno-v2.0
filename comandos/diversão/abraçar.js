module.exports = {
  name: "abraçar",
  aliases: ["hug"],
  category: "diversao",
  run: async (client, message, args) => {
    const superagent = require("superagent");
    const { MessageEmbed } = require("discord.js");

    const member = message.mentions.users.first();
    if (!member) {
            const embed = new MessageEmbed()
        .setColor("#e74c3c")
        .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione o usuário que deseja abraçar`)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed)
    return;
    }
    if (member === message.author) {
      const embed = new MessageEmbed()
        .setColor("#e74c3c")
        .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não pode se abraçar... Isso é falta de carinho? Vem aqui :)`)
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed)
    return;
    }

    const { body } = await superagent.get("https://nekos.life/api/v2/img/hug");

    const embed = new MessageEmbed()

      .setDescription(`:hugging: » **${message.author.username}** acaba de abraçar **${member.username}**`)
      .setColor('#206694')
      .setImage(body.url);

    message.channel.send(embed);
  },
};
