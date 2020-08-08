const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
        name: "mute",
        description: "Mute membro no discord!",
        usage: "[nome | nickname | mention | ID] <reason> (optional)",
        category: "moderation",
        accessableby: "everyone",
        noalias: "No Aliases",
    run: async (client, message, args) => {
        try {
            if (!message.member.hasPermission("MANAGE_GUILD")){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não tem a permisão \`MANAGE_GUILD\``)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }
    
            if (!message.guild.me.hasPermission("MANAGE_GUILD")){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nEu não tenho a permissão \`MANAGE_GUILD\``)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }
            if (!args[0]){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione um usuário para silenciar!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            
          if (!mutee){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione um usuário válido para ser silenciado!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            if (mutee === message.member){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não pode silenciar-se!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nNão é possível silenciar este usuário!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            let reason = args.slice(1).join(" ");
          
            if (mutee.user.bot){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nNão é possível silenciar bots!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.get(`cargomute_${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "Mutado")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "Mutado",
                            color: "#8d0000",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };

            if (mutee.roles.cache.has(muterole.id)){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nO usuário já está silenciado!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)

          try {
            mutee.roles.set([muterole.id]).then(() => {
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`Olá, você acaba de ser Mutado`)
                .addField('Servidor', `${message.guild.name}`)
                .addField('Motivo', `${reason || "Nenhum motivo definido"}`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              mutee.send(embed).catch(() => null)
            return;
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${mutee.user} Foi mutado com sucesso! Veja o motivo em <#${db.get(`punichannel_${message.guild.id}`)}>`)
                message.channel.send(sembed);
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor("#2f3136")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${mutee.user} Foi mutado com sucesso!`)
                message.channel.send(sembed2);
                }
            
            let canal = db.get(`punichannel_${message.guild.id}`)
            if (!canal) return;

            let embed = new MessageEmbed()
                .setColor("#2f3136")
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Puni`, message.guild.iconURL())
                .addField("**Comando usado**", "mute")
                .addField("**Membro mutado**", mutee.user)
                .addField("**Moderador Responsavel**", message.author)
                .addField("**Motivo**", `${reason || "**Nenhum motivo definido**"}`)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
                
            const sChannel = message.guild.channels.cache.get(canal)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch {
            return;
        }
    }
}