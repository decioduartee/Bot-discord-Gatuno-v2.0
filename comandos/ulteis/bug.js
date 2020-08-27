module.exports = {
  name: "bug",
  description: "informe um bug",
  category: "informar",
  usage: "bug | <mensagem sobre o bug>",
  alisases: ["informar", "bug", "erro"],
  run: async (client, message, args) => {
    const db = require("quick.db");
    const ms = require("parse-ms")
    const timeout = 25000;
    const { MessageEmbed } = require("discord.js");
    const canal = "716756582716669972"

    let tempo = await db.get(`btempo_${message.guild.id}_${message.author.id}`)
    if (tempo !== null && timeout - (Date.now() - tempo) > 0) {
      let time = ms(timeout - (Date.now() - tempo))
      message.channel.send(`${message.author}, **o comando tem um tempo de espera, aguarde** \`${time.seconds}s\``)
      return;
    } else {
    message.delete()
    const bug = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:send:715353578742480907> **|** Enviei no seu privado! Caso não chegue nada, habilite as mensagens diretas de membros do Servidor..`)
    message.channel.send(bug)


    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`Olá ${message.author}, Para prosseguir, Me informe a classe do erro\n\n**__Classe__**:\nbot\ncomando`);
    message.author.send(embed).then((msg) => {
        let cj = message.author.dmChannel.createMessageCollector((x) => x.author.id == message.author.id, {max: 1,})
        .on("collect", (c) => {
          const opção = c.content;
          if (opção !== "bot" && opção !== "comando") {
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription("**Você deve me informar `bot` ou `comando`, Tente novamente.**");
            message.author.send(embed);
          } else {
            if (opção === "comando") {
              db.set(`bopção_${message.guild.id}`, opção);
              const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`Me informe qual o comando`);
              message.author.send(embed).then((msg1) => {
                let cjjj = message.author.dmChannel.createMessageCollector((x) => x.author.id == message.author.id,{ max: 1 })
                  .on("collect", (c) => {
                    const comando = c.content;
                    db.set(`bcomando_${message.guild.id}`, comando);
                    const embed = new MessageEmbed()
                      .setColor("#2f3136")
                      .setDescription(`Me informe qual o erro`);
                    message.author.send(embed).then((msg2) => {
                      let cjjjj = message.author.dmChannel.createMessageCollector((x) => x.author.id == message.author.id, { max: 1 })
                        .on("collect", (c) => {
                          const informação = c.content;
                          db.set(`binformação_${message.guild.id}`, informação);
                          const embed = new MessageEmbed()
                            .setColor("#2f3136")
                            .setDescription(`Deseja enviar essa mensagem?`);
                          message.author.send(embed).then((msg3) => {
                            msg3.react("☑️");
                            msg3.react("✖");
                            const enviarfilter = (reaction, user) =>reaction.emoji.name === "☑️" &&user.id === message.author.id;
                            const naofilter = (reaction, user) =>reaction.emoji.name === "✖" && user.id === message.author.id;
                            const enviar = msg3.createReactionCollector(enviarfilter,{ max: 1 });
                            const não = msg3.createReactionCollector(naofilter,{max: 1});
                            enviar.on("collect", (r) => {
                                msg3.delete();
                                const embed1 = new MessageEmbed()
                                    .setColor("#2f3136")
                                    .setDescription(`${message.author}, **Sua mensgem foi enviado com sucesso**!, Essa mensagem foi enviada direto para meu **desenvolvedor**. Obrigado `);
                              message.author.send(embed1);
                              const channel = client.channels.cache.get(canal);
                              if (channel) {
                                const embed = new MessageEmbed()
                                  .setColor("#206694")
                                  .setTitle(`Bug Detectado`)
                                  .setDescription(`\`\`\`md\n[ Classe: ]( "${db.get(`bopção_${message.guild.id}`)}" )[ ${db.get(`bcomando_${message.guild.id}`)} ]\n\`\`\`\n\`\`\`diff\n- Erro: ${db.get(`binformação_${message.guild.id}`)}\`\`\``)
                                  .setFooter(`Bug reportado por ${message.author.username} - ${message.author.id}`,`${message.author.displayAvatarURL({dynamic: true,})}`);
                                channel.send(embed).then((msg4) => {
                                    msg4.react("☑️");
                                    msg4.react("✖");
                                    const resolvidofilter = (reaction, user) => reaction.emoji.name === "☑️" && !user.bot;
                                    const canceladofilter = (reaction, user) => reaction.emoji.name === "✖" && !user.bot;
                                    const resolvido = msg4.createReactionCollector(resolvidofilter, { max: 1 });
                                    const cancelado = msg4.createReactionCollector(canceladofilter, { max: 1 })

                                    resolvido.on("collect", (r) => {
                                        const resolvido = new MessageEmbed()
                                            .setColor("#206694")
                                            .setTitle(`Bug Detectado [ RESOLVIDO ]`)
                                            .setDescription(`\`\`\`md\n[ Classe: ]( "${db.get(`bopção_${message.guild.id}`)}" )[ ${db.get(`bcomando_${message.guild.id}`)} ]\n\`\`\`\n\`\`\`diff\n- Erro: ${db.get(`binformação_${message.guild.id}`)}\`\`\``)
                                            .setFooter(`Bug reportado por ${message.author.username} - ${message.author.id}`,`${message.author.displayAvatarURL({dynamic: true,})}`);
                                        msg4.edit(resolvido)
                                        msg4.reactions.removeAll().then(emoji => {
                                            emoji.react(':Verified:714992515782279198')
                                        })

                                        const embed = new MessageEmbed()
                                            .setColor("#206694")
                                            .setAuthor(`[ Dev ]`, "https://cdn.discordapp.com/attachments/705905702648152144/716844837772460142/user_1.png")
                                            .addField(`Informa`,`Erro resolvido, Muito **obrigado** por nos ajudar a resolver esse problema!\n\nServidor de suporte: [SERVIDOR](https://discord.gg/MJ6Pjnf)`)
                                            .setFooter(`Mensagem enviada diretamente do desenvolvedor, não precisa responder.`)
                                        message.author.send(embed);
                                    });

                                    cancelado.on("collect", (r) => {
                                        const resolvido = new MessageEmbed()
                                            .setColor("#206694")
                                            .setTitle(`Bug Detectado [ RESOLVIDO ]`)
                                            .setDescription(`\`\`\`md\n[ Classe: ]( "${db.get(`bopção_${message.guild.id}`)}" )[ ${db.get(`bcomando_${message.guild.id}`)} ]\n\`\`\`\n\`\`\`diff\n- Erro: ${db.get(`binformação_${message.guild.id}`)}\`\`\``)
                                            .setFooter(`Bug reportado por ${message.author.username} - ${message.author.id}`,`${message.author.displayAvatarURL({dynamic: true,})}`);
                                        msg4.edit(resolvido)
                                        msg4.reactions.removeAll().then(emoji => {
                                            emoji.react(':Verified:714992515782279198')
                                        })

                                        const embed = new MessageEmbed()
                                            .setColor("#e74c3c")
                                            .setAuthor(`[ Dev ]`, "https://cdn.discordapp.com/attachments/705905702648152144/716844837772460142/user_1.png")
                                            .addField(`Informa`,`Não há nenhum problema com o comando **${db.get(`bcomando_${message.guild.id}`)}**, veja se está usando o comando corretamente.\n\nServidor de suporte: [SERVIDOR](https://discord.gg/MJ6Pjnf)`)
                                            .setFooter(`Mensagem enviada diretamente do desenvolvedor, não precisa responder.`)
                                        message.author.send(embed);
                                    });

                                });
                              }
                            });

                            não.on("collect", (r) => {
                                msg3.delete();
                                const embed = new MessageEmbed()
                                  .setColor("#2f3136")
                                  .setDescription(`A mensagem foi cancelada.`);
                                message.author.send(embed);
                            });
                          });
                        });
                    });
                  });
              });
            } else {
              db.set(`bopção_${message.guild.id}`, opção);
              const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`Agora me informe o erro`);
              message.author.send(embed).then((msg5) => {
                let cjj = message.author.dmChannel.createMessageCollector((x) => x.author.id == message.author.id,{ max: 1 })
                  .on("collect", (c) => {
                    const mensagem = c.content;
                    db.set(`bmensagem_${message.guild.id}`, mensagem);
                    const embed = new MessageEmbed()
                      .setColor("#2f3136")
                      .setDescription(`Deseja enviar essa mensagem?`);
                    message.author.send(embed).then((msg6) => {
                      msg6.react("☑️");
                      msg6.react("✖");
                      const enviarfilter = (reaction, user) => reaction.emoji.name === "☑️" && user.id === message.author.id;
                      const naofilter = (reaction, user) => reaction.emoji.name === "✖" && user.id === message.author.id;
                      const enviar = msg6.createReactionCollector(enviarfilter,{max: 1});
                      const não = msg6.createReactionCollector(naofilter, {max: 1});

                      enviar.on("collect", (r) => {
                        msg6.delete();
                        const embed1 = new MessageEmbed()
                          .setColor("#2f3136")
                          .setDescription(`${message.author}, **Sua mensgem foi enviado com sucesso**!, Essa mensagem foi enviada direto para meu **desenvolvedor**. Obrigado`);
                        message.author.send(embed1);
                        const channel = client.channels.cache.get(canal);
                        if (channel) {
                          const embed = new MessageEmbed()
                            .setColor("#206694")
                            .setTitle(`Bug Detectado`)
                            .setDescription(`\`\`\`md\n[ Classe: ]( "${db.get( `bopção_${message.guild.id}`)}" )\n\`\`\`\n\`\`\`diff\n- Erro: ${db.get(`bmensagem_${message.guild.id}`)}\`\`\``)
                            .setFooter(`Bug reportado por ${message.author.username} - ${message.author.id}`,`${message.author.displayAvatarURL({dynamic: true,})}`);
                          channel.send(embed).then((msg5) => {
                            msg5.react("☑️");
                            msg5.react("✖");
                            const resolvidofilter = (reaction, user) => reaction.emoji.name === "☑️" && !user.bot;
                            const canceladofilter = (reaction, user) => reaction.emoji.name === "✖" && !user.bot;
                            const resolvido = msg5.createReactionCollector(resolvidofilter, { max: 1 });
                            const cancelado = msg5.createReactionCollector(canceladofilter, { max: 1 })

                            resolvido.on("collect", (r) => {
                                const resolvido = new MessageEmbed()
                                        .setColor("#206694")
                                        .setTitle(`Bug Detectado [ RESOLVIDO ]`)
                                        .setDescription(`\`\`\`md\n[ Classe: ]( "${db.get(`bopção_${message.guild.id}`)}" )\n\`\`\`\n\`\`\`diff\n- Erro: ${db.get(`bmensagem_${message.guild.id}`)}\`\`\``)
                                        .setFooter(`Bug reportado por ${message.author.username} - ${message.author.id}`,`${message.author.displayAvatarURL({dynamic: true,})}`);
                                    msg5.edit(resolvido)
                                msg5.reactions.removeAll().then(emoji => {
                                    emoji.react(':Verified:714992515782279198')
                                })

                                const embed = new MessageEmbed()
                                .setColor("#206694")
                                .setAuthor(`[ Dev ]`, "https://cdn.discordapp.com/attachments/705905702648152144/716844837772460142/user_1.png")
                                .addField(`Informa`,`Erro resolvido, Muito **obrigado** por nos ajudar a resolver esse problema!\n\nServidor de suporte: [SERVIDOR](https://discord.gg/MJ6Pjnf)`)
                                .setFooter(`Mensagem enviada diretamente do desenvolvedor, não precisa responder.`)
                                message.author.send(embed);
                            });

                            cancelado.on("collect", (r) => {
                                const resolvido = new MessageEmbed()
                                        .setColor("#206694")
                                        .setTitle(`Bug Detectado [ RESOLVIDO ]`)
                                        .setDescription(`\`\`\`md\n[ Classe: ]( "${db.get(`bopção_${message.guild.id}`)}" )\n\`\`\`\n\`\`\`diff\n- Erro: ${db.get(`bmensagem_${message.guild.id}`)}\`\`\``)
                                        .setFooter(`Bug reportado por ${message.author.username} - ${message.author.id}`,`${message.author.displayAvatarURL({dynamic: true,})}`);
                                    msg5.edit(resolvido)
                                msg5.reactions.removeAll().then(emoji => {
                                    emoji.react(':Verified:714992515782279198')
                                })

                                const embed = new MessageEmbed()
                                .setColor("#e74c3c")
                                .setAuthor(`[ Dev ]`, "https://cdn.discordapp.com/attachments/705905702648152144/716844837772460142/user_1.png")
                                .addField(`Informa`,`Não há nenhum problema, veja se está usando o bot corretamente.\n\nServidor de suporte: [SERVIDOR](https://discord.gg/MJ6Pjnf)`)
                                .setFooter(`Mensagem enviada diretamente do desenvolvedor, não precisa responder.`)
                                message.author.send(embed);
                            });

                          });
                        }
                      });

                      não.on("collect", (r) => {
                        msg6.delete();
                        const embed = new MessageEmbed()
                          .setColor("#2f3136")
                          .setDescription(`A mensagem foi cancelada.`);
                        message.author.send(embed);
                      });

                    });
                  });
              });
            }
          }
        });
    });
    db.set(`btempo_${message.guild.id}_${message.author.id}`, Date.now())
    }
  },
};
