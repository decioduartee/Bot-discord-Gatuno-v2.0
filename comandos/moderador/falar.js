module.exports = {
  name: "falar",
  aliases: ["falar", "say"],
  category: "moderacao",
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");

    if (!message.member.hasPermission("MANAGE_MESSAGES")){
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:errado:736447664329326613> **| ERRO AO FALAR** \n\n • Você não tem a permissão \`MANAGE_MESSAGES\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed)
    return;
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")){
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:errado:736447664329326613> **| ERRO AO FALAR** \n\n • Eu não tenho a permissão \`MANAGE_MESSAGES\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed)
    return;
    }

    let footerNome = message.author.username

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