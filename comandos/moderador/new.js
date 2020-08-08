module.exports = {
  name: "new",
  description: "use para informar uma noticia sobre jogos",
  aliases: ["news", "noticia"],
  category: "moderador",
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")){
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não tem a permissão \`MANAGE_MESSAGES\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed)
    return;
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")){
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:error:715218174215323691> **| ERRO**\nEu não tenho a permissão \`MANAGE_MESSAGES\``)
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed)
    return;
    }

    const embed = new MessageEmbed()
      .setTitle(`__MENSAGEM__`)
      .setDescription(
        `<:listadecomandos:706682302989860876> » Escreva a baixo um mensagem para a noticia!`
      )
      .setColor(`#2f3136`);
    message.channel.send(embed).then((msg) => {
      let cj = message.channel
        .createMessageCollector((x) => x.author.id == message.author.id, {
          max: 1,
        })
        .on("collect", (c) => {
          const texto = c.content;

          const embed2 = new MessageEmbed()
            .setTitle(`__TÍTULO__`)
            .setDescription(
              `<:listadecomandos:706682302989860876> » Agora, escreva um título para a noticia`
            )
            .setColor(`#2f3136`);
          message.channel.send(embed2).then((msg2) => {
            let cjj = message.channel
              .createMessageCollector((x) => x.author.id == message.author.id, {
                max: 1,
              })
              .on("collect", (c) => {
                const titulo = c.content;

                const embed3 = new MessageEmbed()
                  .setColor(`#2f3136`)
                  .setTitle(`__ADICIONAIS__`)
                  .setDescription(
                    `<:listadecomandos:706682302989860876> Deseja adicionar uma imagem a postagem?\n\n» Se quiser basta reagir com <:addimagem:711731022043152415>\n\n» Se não q basta reagir com <:semimagem:711731022462713856>`
                  );
                message.channel.send(embed3).then(async (msg3) => {
                  await msg3.react(":semimagem:711731022462713856");
                  await msg3.react(":addimagem:711731022043152415");
                  const continuarfilter = (reaction, user) =>
                    reaction.emoji.id === "711731022043152415" &&
                    user.id === message.author.id;
                  const cancelarfilter = (reaction, user) =>
                    reaction.emoji.id === "711731022462713856" &&
                    user.id === message.author.id;
                  const continuar = msg3.createReactionCollector(
                    continuarfilter,
                    { timeout: 900000 }
                  );
                  const cancelar = msg3.createReactionCollector(
                    cancelarfilter,
                    { timeout: 900000 }
                  );

                  cancelar.on("collect", (r) => {
                    msg3.delete();
                    const embed4 = new MessageEmbed()
                      .setColor(`#2f3136`)
                      .setTitle(`__CANAL__`)
                      .setDescription(
                        `<:listadecomandos:706682302989860876> » Por fim mencione um canal para que eu possa enviar amensagem`
                      );
                    message.channel.send(embed4).then((msg4) => {
                      let cjjj = message.channel
                        .createMessageCollector(
                          (x) => x.author.id == message.author.id,
                          {
                            max: 1,
                          }
                        )
                        .on("collect", (c) => {
                          const canal = c.mentions.channels.first();
                          if (!canal) {
                            return message.channel.send({
                              embed: {
                                color: 15158332,
                                title: "❌ **|** COMANDO INCORRETO",
                                description: "`< mencione um canal >`",
                              },
                            });
                          }

                          message.channel.send({
                            embed: {
                              color: "#2f3136",
                              description: `${message.author}, Sua postagem foi envia com sucesso!`,
                            },
                          });

                          const embedd = new MessageEmbed()
                            .setTitle(titulo)
                            .setDescription(texto)
                            .setFooter(`postagem enviado por @${message.author.username}`, message.author.displayAvatarURL())
                            .setColor("#2f3136");
                          canal.send(embedd);
                        });
                    });
                  });

                  continuar.on("collect", (r) => {
                    msg3.delete();
                    r.users.remove(message.author.id);
                    const embed3 = new MessageEmbed()
                      .setColor(`#2f3136`)
                      .setTitle(`__IMAGEM__`)
                      .setDescription(
                        `<:listadecomandos:706682302989860876> Me envie um link de imagem.\n\n» Quer ver um exemplo? basta reagir com <:imagem:711731969511260192>`
                      );
                    message.channel.send(embed3).then(async (msg) => {
                      await msg.react(":imagem:711731969511260192");
                      const exemplofilter = (reaction, user) =>
                        reaction.emoji.id === "711731969511260192" &&
                        user.id === message.author.id;
                      const exemplo = msg.createReactionCollector(
                        exemplofilter,
                        { timeout: 900000 }
                      );

                      exemplo.on("collect", (r) => {
                        r.users.remove(message.author.id);
                        const embed = new MessageEmbed()
                          .setImage(
                            "https://cdn.discordapp.com/attachments/705905702648152144/710965638562054236/Catestepturar.PNG"
                          )
                          .setColor("#2f3136");
                        message
                          .reply("Aqui está um exemplo de como ficara.", embed)
                          .then(async (msg5) => {
                            await msg5.react(":lixeira:707833140953219134");
                            const limparfilter = (reaction, user) =>
                              reaction.emoji.id === "707833140953219134" &&
                              user.id === message.author.id;
                            const limpar = msg5.createReactionCollector(
                              limparfilter,
                              { max: 1 }
                            );

                            limpar.on("collect", (r) => {
                              msg5.delete();
                              return message.channel
                                .send({
                                  embed: {
                                    color: 2123412,
                                    description: `✅ **|** Você acaba de apagar essa mensagem`,
                                  },
                                })
                                .then((msg) => msg.delete({ timeout: 5000 }));
                            });
                          });
                      });
                      let cjjj = message.channel
                        .createMessageCollector(
                          (x) => x.author.id == message.author.id,
                          {
                            max: 1,
                          }
                        )
                        .on("collect", (c) => {
                          const imagem = c.content;
                          if (!imagem.startsWith("https://")) {
                            let embed6 = new MessageEmbed()
                              .setTitle("❌ **|** ERRO")
                              .setDescription(
                                "Isso não é uma URL valida, por favor verifique se esta certo e tente novamente."
                              )
                              .setColor(`#2f3136`);
                            message.channel.send(embed6);
                            return;
                          }

                          const embed4 = new MessageEmbed()
                            .setColor(`#2f3136`)
                            .setTitle(`__CANAL__`)
                            .setDescription(
                              `<:listadecomandos:706682302989860876> » Por fim mencione um canal para que eu possa enviar amensagem`
                            );
                          message.channel.send(embed4).then((msg4) => {
                            let cjjj = message.channel
                              .createMessageCollector(
                                (x) => x.author.id == message.author.id,
                                {
                                  max: 1,
                                }
                              )
                              .on("collect", (c) => {
                                const canal = c.mentions.channels.first();
                                if (!canal) {
                                  return message.channel.send({
                                    embed: {
                                      color: 15158332,
                                      title: "❌ **|** COMANDO INCORRETO",
                                      description: "`< mencione um canal >`",
                                    },
                                  });
                                }

                                message.channel.send({
                                  embed: {
                                    color: "#2f3136",
                                    description: `${message.author}, Sua postagem foi envia com sucesso!`,
                                  },
                                });

                                const embedd = new MessageEmbed()
                                  .setTitle(titulo)
                                  .setDescription(texto)
                                  .setImage(imagem)
                                  .setFooter(`postagem enviado por @${message.author.username}`, message.author.displayAvatarURL())
                                  .setColor("#2f3136");
                                canal.send(embedd);
                              });
                          });
                        });
                    });
                  });
                });
              });
          });
        });
    });
  },
};
