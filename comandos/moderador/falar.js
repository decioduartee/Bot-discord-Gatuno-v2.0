module.exports = {
  name: "falar",
  aliases: ["falar", "say"],
  category: "moderacao",
  userPerm: ["MANAGE_MESSAGES"],
  botPerm: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");

    const fala = args.slice(1).join(" ");
    if (!fala) {
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:errado:736447664329326613> **| ERRO AO FALAR** \n\n • Use \`.falar < embed > ou < texto > Oi\``)
      .setFooter(`Comando executado por ${message.author.username}`, message.author.displayAvatarURL())
      message.channel.send(embed)
    }

    const resultado = args[0];
    if (!resultado) {
      
    }

    if (resultado === "embed" || resultado === "Embed") {
      const embed = new MessageEmbed()
      .setDescription(fala)
      .setColor(`#2f3136`)
      message.delete().catch;
      message.channel.send(embed);
    }

    if (resultado === "texto" || resultado === "Texto") {
      message.channel.send(fala)
      message.delete().catch;
    }
  },
};