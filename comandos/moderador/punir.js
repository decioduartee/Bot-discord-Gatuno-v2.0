const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../config.json");

module.exports = {
    name: "punir",
    aliases: ["puni"],
    category: "moderador",
    description: "puni membros",
    accessableby: "Moderador",
    userPerm: ["BAN_MEMBERS", "KICK_MEMBERS", "MUTE_MEMBERS"],
    botPerm: ["BAN_MEMBERS", "KICK_MEMBERS", "MUTE_MEMBERS"],
    run: async (client, message, args, database) => {
      
      try {
        
      let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalPunição`).once('value')
          canais = canais.val()
      let canal = message.guild.channels.cache.get(canais)
        
      if(!args[0]) {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`<:errado:736447664329326613> **| ERRO AO PUNIR**`)
            .addField(`**Use:**`, `• ${prefix}punir \`< @Membro > < Motivo >\` \n\n > Lembrando que o Motivo é opcional \n > pois se não houver motivo \n > o mesmo será: **Nenhum motivo definido.**`)
            .addField(`**Exemplo:**`, `• ${prefix}punir \`@papito\` banido por ser muito lindo`)
            .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}puni"`, message.client.user.displayAvatarURL());
          message.channel.send(embed)
        }
      
      let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
      
      let motivo = args.slice(1).join(" ");
        
      if(!membro) {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`<:errado:736447664329326613> **| ERRO AO PUNIR**`)
            .addField(`**Use:**`, `• ${prefix}punir \`< @Membro > < Motivo >\` \n\n > Lembrando que o Motivo é opcional \n > pois se não houver motivo \n > o mesmo será: **Nenhum motivo definido.**`)
            .addField(`**Exemplo:**`, `• ${prefix}punir \`@papito\` banido por ser muito lindo`)
            .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}puni"`, message.client.user.displayAvatarURL());
          message.channel.send(embed)
      }
        
      const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
            .setAuthor(`COMO DESEJA PUNIR ESTE MEMBRO?`, client.user.displayAvatarURL())
            .setDescription(`» Reaja a baixo com o emoji corespondente a punição`)
            .addField(`• **Informações** `, `▪︎ **Membro a ser punido:** ${membro} \n ▪︎ **Moderador responsavel:** ${message.author} \n\n • **Punições:** \n <:online:736703182196965479> Use para kickar o membro \n <:offline:736703246969733120> Use para mutar um membro \n <:ausente:736703344906731562> Use para dar warn no membro \n <:ocupado:736703631243477072> Use para banir o membro`)
            .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
        message.channel.send(embed).then(( async (msg) => {
          msg.react("736703182196965479")
          msg.react("736703246969733120")
          msg.react("736703344906731562")
          msg.react("736703631243477072")
          msg.react("707833140953219134")
          
          const kickfilter = (reaction, user) => reaction.emoji.id === '736703182196965479' && user.id === message.author.id;          
          const mutefilter = (reaction, user) => reaction.emoji.id === '736703246969733120' && user.id === message.author.id;
          const warnfilter = (reaction, user) => reaction.emoji.id === "736703344906731562" && user.id === message.author.id;
          const banfilter = (reaction, user) => reaction.emoji.id === "736703631243477072" && user.id === message.author.id;
          const cancelarfilter = (reaction, user) => reaction.emoji.id === "707833140953219134" && user.id === message.author.id;
      
          const kick = msg.createReactionCollector(kickfilter)
          const mute = msg.createReactionCollector(mutefilter)
          const warn = msg.createReactionCollector(warnfilter)
          const ban = msg.createReactionCollector(banfilter)
          const cancelar = msg.createReactionCollector(cancelarfilter)
          
          kick.on('collect', r => {
            msg.delete()
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
              .setDescription("<:certo:736447597102760007> **| KICK APLICADO**")
              .addField("**Moderador responsavel:**", `• ${message.author}`)
              .addField("**Membro kickado:**", `• ${membro} | ${membro.user.username}`)
              .addField(`**ID do membro**`, `• ${membro.id}`)
              .addField("**Motivo da punição:**", `• ${motivo || "Nenhum motivo definido."}`)
              .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
            
              if(!canal) {
                return message.channel.send(embed)
              }
              canal.send(embed)
  
              const avisokick = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("<:certo:736447597102760007> **| SUCESSO AO KICKAR O MEMBRO**")
              message.channel.send(avisokick)
          })
          
          mute.on('collect', async r => {
            msg.delete()
            
            const userRoles = membro.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.id)

            let muterole;
            let dbmute = await database.ref(`/Servidores/${message.guild.id}/Cargos/CargosMute/CargoMute`).once("value")
              dbmute = dbmute.val()
            let membrorole = message.guild.roles.cache.find(r => r.name === "Silenciado")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = membrorole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "Silenciado",
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

            if (membro.roles.cache.has(muterole.id)){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\n O usuário já está silenciado!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            database.ref(`/Servidores/${message.guild.id}/Cargos/CargosMute/CargosAntesDoMute/${membro.user.id}`).set(userRoles)
            
            membro.roles.set([muterole.id]).then(() => {
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
              .setDescription("<:certo:736447597102760007> **| MUTE APLICADO**")
              .addField("**Moderador responsavel:**", `• ${message.author}`)
              .addField("**Membro mutado:**", `• ${membro} | ${membro.user.username}`)
              .addField(`**ID do membro**`, `• ${membro.id}`)
              .addField("**Motivo da punição:**", `• ${motivo || "Nenhum motivo definido."}`)
              .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
              if(!canal) {
                return message.channel.send(embed)
              }
              canal.send(embed)
  
              const avisomute = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("<:certo:736447597102760007> **| SUCESSO AO MUTAR O MEMBRO**")
              message.channel.send(avisomute)
            })
          })
          
          warn.on('collect', r => {
            msg.delete()
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
              .setDescription("<:certo:736447597102760007> **| WARN APLICADO**")
              .addField("**Moderador responsavel:**", `• ${message.author}`)
              .addField("**Membro que recebeu warn:**", `• ${membro} | ${membro.user.username}`)
              .addField(`**ID do membro**`, `• ${membro.id}`)
              .addField("**Motivo da punição:**", `• ${motivo || "Nenhum motivo definido."}`)
              .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
            if(!canal) {
              return message.channel.send(embed)
            }
            canal.send(embed)

            const avisowarn = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription("<:certo:736447597102760007> **| SUCESSO AO DAR WARN AO MEMBRO**")
            message.channel.send(avisowarn)
            
          })
          
          ban.on('collect', r => {
            try {
            msg.delete()
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
              .setDescription("<:certo:736447597102760007> **| BAN APLICADO**")
              .addField("**Moderador responsavel:**", `• ${message.author}`)
              .addField("**Membro Banido:**", `• ${membro} | ${membro.user.username}`)
              .addField(`**ID do membro**`, `• ${membro.id}`)
              .addField("**Motivo da punição:**", `• ${motivo || "Nenhum motivo definido."}`)
              .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
            if(!canal) {
              message.channel.send(embed).then(() =>
                message.guild.members.ban(membro, { reason: motivo })).catch(() => null)

                const avisoban = new MessageEmbed()
                  .setColor("#2f3136")
                  .setDescription("<:certo:736447597102760007> **| SUCESSO AO BANIR O MEMBRO**")
                message.channel.send(avisoban)
            }
            canal.send(embed).then(() =>
                message.guild.members.ban(membro, { reason: motivo })).catch(() => null)

                const avisoban = new MessageEmbed()
                  .setColor("#2f3136")
                  .setDescription("<:certo:736447597102760007> **| SUCESSO AO BANIR O MEMBRO**")
                message.channel.send(avisoban)

            } catch {
                message.guild.members.ban(membro, { reason: motivo })
            }
          })
          
          cancelar.on('collect', r => {
            msg.delete()
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription("<:certo:736447597102760007> **| Punição cancelada com sucesso!**")
            message.channel.send(embed)
          })                   
          
        }))
        
      } catch(e) {
        console.log(e)
    }
  }
}