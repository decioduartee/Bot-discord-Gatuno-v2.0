module.exports = {
    name: "removeemoji",
    category: "moderador",
    userPerm: ["MANAGE_EMOJIS"],
    botPerm: ["MANAGE_EMOJIS"],
    run: async (client, message, args) => {
      const { MessageEmbed } = require("discord.js");
      const { prefix } = require("../../config.json")
      
      if (!args[0]) {
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO REMOVER EMOJI**`)
            .addField("• **Informações:**", [
              "• **Mensagem:** Me informe o emoji pra remover",
              `• **Exemplo:** ${prefix}removeemoji < emoji > **ou** id`
            ])
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
      }
      
      try {

        const embed = new MessageEmbed()
          .setColor(`#2f3136`)
          .setDescription(`<:certo:736447597102760007> **| SUCESSO AO REMOVER EMOJI**`)
          .addField("**Informações**", `• **Emoji removido:** ${args[0]}`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
        message.channel.send(embed)

        setTimeout(() => {
          message.guild.emojis.resolve(args[0].id).delete()
        }, 300)

      } catch (err) {
        message.delete().catch;
        message.channel.send(`Errou: ${err}`);
      }
    },
  };