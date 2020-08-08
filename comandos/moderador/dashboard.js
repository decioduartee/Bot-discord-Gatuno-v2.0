module.exports = {
    name: "dashboard",
    aliases: ["config", "menu", "painel"],
    category: "info",
    run: async (client, message,args) => {
        const { MessageEmbed } = require('discord.js')
        const db = require('quick.db')

        if (!message.member.hasPermission("ADMINISTRATOR")){
            const embed = new MessageEmbed()
            .setColor("#e74c3c")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não tem a permissão \`ADMINISTRATOR\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (!message.guild.me.hasPermission("ADMINISTRATOR")){
            const embed = new MessageEmbed()
            .setColor("#e74c3c")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nEu não tenho a permissão \`ADMINISTRATOR\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        //welcome
        let wmensagem = db.get(`wmessage_${message.guild.id}`)
        let wtitulo   = db.get(`wtitle_${message.guild.id}`)
        let wcanal    = db.get(`wcanal_${message.guild.id}`)

        //leave
        let lmensagem = db.get(`lmessage_${message.guild.id}`)
        let ltitulo   = db.get(`ltitle_${message.guild.id}`)
        let lcanal    = db.get(`lcanal_${message.guild.id}`)

        //autorole
        let wrole     = db.get(`wrole_${message.guild.id}`)

        //setlog
        const scanal  = db.get(`punichannel_${message.guild.id}`);

        const embed = new MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`Painel de controle`)
        .addField(`<:welcome:716171948844908585> Welcome`, `Configurações do Welcome`)
        .addField(`<:leave:716171949046497340> Leave`, `Configurações do Leave`)
        .addField(`<:logs:716194178035482635> Logs`, `Configurações de Logs`)
        .addField(`<:ajuda:716171948853428254> Ajuda`, `Configurações de Ajuda`)
        message.delete().catch();
        message.channel.send(embed).then((msg) => {
            msg.react(':welcome:716171948844908585')
            msg.react(':leave:716171949046497340')
            msg.react(':logs:716194178035482635')
            msg.react(':ajuda:716171948853428254')

            const welcomefilter = (reaction, user) => reaction.emoji.id === ('716171948844908585') && user.id === message.author.id;
            const leavefilter = (reaction, user) => reaction.emoji.id === ('716194178035482635') && user.id === message.author.id;            
            const logfilter = (reaction, user) => reaction.emoji.id === ('716171949046497340') && user.id === message.author.id;
            const ajudafilter = (reaction, user) => reaction.emoji.id === ('716171948853428254') && user.id === message.author.id;
            const voltarfilter = (reaction, user) => reaction.emoji.id === ('716178387986808933') && user.id === message.author.id;
            
            const welcome = msg.createReactionCollector(welcomefilter);
            const leave = msg.createReactionCollector(leavefilter);
            const voltar = msg.createReactionCollector(voltarfilter);
            const log = msg.createReactionCollector(logfilter);
            const ajuda = msg.createReactionCollector(ajudafilter);
          
          //__________________________________menu ajuda__________________________________
          const bemvindofilter = (reaction, user) => reaction.emoji.name === ('1⃣') && user.id === message.author.id;
          const logsAjfilter = (reaction, user) => reaction.emoji.name === ('3⃣') && user.id === message.author.id;
          const saidafilter = (reaction, user) => reaction.emoji.name === ('2⃣') && user.id === message.author.id;
          const muterolefilter = (reaction, user) => reaction.emoji.name === ('4⃣') && user.id === message.author.id;
          
          const bemvindo = msg.createReactionCollector(bemvindofilter);
          const logsAj = msg.createReactionCollector(logsAjfilter);
          const saida = msg.createReactionCollector(saidafilter);
          const muterole = msg.createReactionCollector(muterolefilter);
          
          //===============================================================================

            welcome.on('collect', (r) => {
                const welcome = new MessageEmbed()
                .setColor('#2f3136')
                .setTitle(`Sistema de Welcome`)
                if(wmensagem === null || wmensagem === undefined) {
                    welcome.addField(`Mensagem`, `<:desativado:716183213332234340> Desativado`)
                } else {
                    welcome.addField(`Mensagem`, `<:ativado:716184599327146004> Ativado\nTitulo da mensagem: ${wtitulo}\nMensagem: ${wmensagem}`)
                };
                if(wcanal === null || wcanal === undefined) {
                    welcome.addField(`Canal`, `<:desativado:716183213332234340> Desativado`)
                } else {
                    welcome.addField(`Canal`, `<:ativado:716184599327146004> Ativado\nCanal setado: <#${wcanal}>`)
                };
                if(wrole === null || wrole === undefined) {
                    welcome.addField(`Cargo`, `<:desativado:716183213332234340> Desativado`)
                } else {
                    welcome.addField(`Cargo`, `<:ativado:716184599327146004> Ativado\nCargo setado: <@&${wrole}>`)
                };
                msg.reactions.removeAll();
                msg.react(':voltar:716178387986808933').then((r) => {
                    voltar.on('collect', (r) => {
                        msg.edit(embed)
                        msg.reactions.removeAll(':voltar:716178387986808933')
                        msg.react(':welcome:716171948844908585')
                        msg.react(':leave:716171949046497340')
                        msg.react(':logs:716194178035482635')
                        msg.react(':ajuda:716171948853428254')
                    })
                })
                msg.edit(welcome)
            })

            leave.on('collect', (r) => {
                const leave = new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`Sistema de Leave`)
                if(lmensagem === null || lmensagem === undefined) {
                    leave.addField(`Mensagem`, `<:desativado:716183213332234340> Desativado`)
                } else {
                    leave.addField(`Mensagem`, `<:ativado:716184599327146004> Ativado\nTitulo da mensagem: ${ltitulo}\nMensagem: ${lmensagem}`)
                }
                if(lcanal === null || lcanal === undefined) {
                    leave.addField(`Canal`, `<:desativado:716183213332234340> Desativado`)
                } else {
                    leave.addField(`Canal`, `<:ativado:716184599327146004> Ativado\nCanal setado: <#${lcanal}>`)
                }
                msg.reactions.removeAll();
                msg.react(':voltar:716178387986808933').then((r) => {
                    voltar.on('collect', (r) => {
                        msg.edit(embed)
                        msg.reactions.removeAll(':voltar:716178387986808933')
                        msg.react(':welcome:716171948844908585')
                        msg.react(':leave:716171949046497340')
                        msg.react(':logs:716194178035482635')
                        msg.react(':ajuda:716171948853428254')
                    })
                })
                msg.edit(leave)
            })

            log.on('collect', (r) => {
                const log = new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`Sistema de log`)
                if(scanal === null || scanal === undefined) {
                    log.addField(`Canal`, `<:desativado:716183213332234340> Desativado`)
                } else {
                    log.addField(`Canal`, `<:ativado:716184599327146004> Ativado\nCanal setado: <#${scanal}>`)
                }
                msg.reactions.removeAll();
                msg.react(':voltar:716178387986808933').then((r) => {
                    voltar.on('collect', (r) => {
                        msg.edit(embed)
                        msg.reactions.removeAll(':voltar:716178387986808933')
                        msg.react(':welcome:716171948844908585')
                        msg.react(':leave:716171949046497340')
                        msg.react(':logs:716194178035482635')
                        msg.react(':ajuda:716171948853428254')
                    })
                })
                msg.edit(log)
            })
          
            ajuda.on('collect', r => {
              const ajuda = new MessageEmbed()
                .setColor('#2f3136')
                .addField(':one: Bemvindo', 'Ajuda nos comandos de Welcome')
                .addField(':two: Saida', 'Ajuda nos comandos de Leave')
                .addField(':three: Logs', 'Ajuda nos comandos de Logs')
                .addField(':four: MuteRole','Defina um cargo de mute')
                msg.edit(ajuda)
                msg.reactions.removeAll();
                msg.react('1⃣')
                msg.react('2⃣')
                msg.react('3⃣')
                msg.react('4⃣')
            msg.react(':voltar:716178387986808933').then((r) => {
                voltar.on('collect', (r) => {
                    msg.edit(embed)
                    msg.reactions.removeAll(':voltar:716178387986808933')
                    msg.react(':welcome:716171948844908585')
                    msg.react(':leave:716171949046497340')
                    msg.react(':logs:716194178035482635')
                    msg.react(':ajuda:716171948853428254')
                })
            })

            bemvindo.on('collect', r => {
              const bemvindo = new MessageEmbed()
              .setColor('#2f3136')
              .addField('.autorole', 'Adiciona um cargo automaticamente quando um membro entrar no servidor')
              .addField('.welcome', 'Seta a mensagem de boas-vindas, além do canal também')
              msg.edit(bemvindo)
              msg.reactions.removeAll();
              msg.react(':voltar:716178387986808933').then((r) => {
                    voltar.on('collect', (r) => {
                        msg.edit(ajuda)
                        msg.reactions.removeAll(':voltar:716178387986808933')
                        msg.react('1⃣')
                        msg.react('2⃣')
                        msg.react('3⃣')
                        msg.react('4⃣')     
                        msg.react(':voltar:716178387986808933').then((r) => {
                            voltar.on('collect', (r) => {
                                msg.edit(embed)
                                msg.reactions.removeAll(':voltar:716178387986808933')
                                msg.react(':welcome:716171948844908585')
                                msg.react(':leave:716171949046497340')
                                msg.react(':logs:716194178035482635')
                                msg.react(':ajuda:716171948853428254')
                            })
                        })
                    })
                })
            })

            logsAj.on('collect', r => {
                const setlog = new MessageEmbed()
                .setColor('#2f3136')
                .addField('.setlogs', 'Use para definir um canal de logs do servidor')
                msg.edit(setlog)
                msg.reactions.removeAll();
                msg.react(':voltar:716178387986808933').then((r) => {
                    voltar.on('collect', (r) => {
                        msg.edit(ajuda)
                        msg.reactions.removeAll(':voltar:716178387986808933')
                        msg.react('1⃣')
                        msg.react('2⃣')
                        msg.react('3⃣')
                        msg.react('4⃣')     
                        msg.react(':voltar:716178387986808933').then((r) => {
                            voltar.on('collect', (r) => {
                                msg.edit(embed)
                                msg.reactions.removeAll(':voltar:716178387986808933')
                                msg.react(':welcome:716171948844908585')
                                msg.react(':leave:716171949046497340')
                                msg.react(':logs:716194178035482635')
                                msg.react(':ajuda:716171948853428254')
                            })
                        })
                    })
                })
            })

            saida.on('collect', r => {
                const saida = new MessageEmbed()
                .setColor('#2f3136')
                .addField('.saida', 'Seta a mensagem de saida, além do canal também')
                msg.edit(saida)
                msg.reactions.removeAll();
                msg.react(':voltar:716178387986808933').then((r) => {
                    voltar.on('collect', (r) => {
                        msg.edit(ajuda)
                        msg.reactions.removeAll(':voltar:716178387986808933')
                        msg.react('1⃣')
                        msg.react('2⃣')
                        msg.react('3⃣')
                        msg.react('4⃣')     
                        msg.react(':voltar:716178387986808933').then((r) => {
                            voltar.on('collect', (r) => {
                                msg.edit(embed)
                                msg.reactions.removeAll(':voltar:716178387986808933')
                                msg.react(':welcome:716171948844908585')
                                msg.react(':leave:716171949046497340')
                                msg.react(':logs:716194178035482635')
                                msg.react(':ajuda:716171948853428254')
                            })
                        })
                    })
                })
            })

            muterole.on('collect', r => {
                const muterole = new MessageEmbed()
                .setColor('#2f3136')
                .addField('.muterole', 'Use para setar o cargo/role de mute, ou o Gatuno criara um cargo chamado "Mutado"')
                msg.edit(muterole)
                msg.reactions.removeAll();
                msg.react(':voltar:716178387986808933').then((r) => {
                    voltar.on('collect', (r) => {
                        msg.edit(ajuda)
                        msg.reactions.removeAll(':voltar:716178387986808933')
                        msg.react('1⃣')
                        msg.react('2⃣')
                        msg.react('3⃣')
                        msg.react('4⃣')     
                        msg.react(':voltar:716178387986808933').then((r) => {
                            voltar.on('collect', (r) => {
                                msg.edit(embed)
                                msg.reactions.removeAll(':voltar:716178387986808933')
                                msg.react(':welcome:716171948844908585')
                                msg.react(':leave:716171949046497340')
                                msg.react(':logs:716194178035482635')
                                msg.react(':ajuda:716171948853428254')
                            })
                        })
                    })
                })
            })
        })
      })
    }
}