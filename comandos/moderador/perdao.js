const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../config.json");

module.exports = {
    name: "perdao",
    aliases: ["perdon", "perdão", "perdoar"],
    category: "moderador",
    description: "puni membros",
    accessableby: "Moderador",
    userPerm: ["MANAGE_GUILD"],
    botPerm: ["MANAGE_GUILD"],
    run: async (client, message, args, database) => {
        
        let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalPunição`).once('value')
          canais = canais.val()
        let canal = message.guild.channels.cache.get(canais)
        
        if(!args[0]) {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`<:errado:736447664329326613> **| ERRO AO PERDOAR**`)
            .addField(`**Use:**`, `• ${prefix}perdoar \`< @Membro > < Motivo >\` \n\n > Lembrando que o Motivo é opcional \n > pois se não houver motivo \n > o mesmo será: **Nenhum motivo definido.**`)
            .addField(`**Exemplo:**`, `• ${prefix}perdoar \`@papito\` Perdoado por ser lindo igual eu`)
            .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}perdon"`, message.client.user.displayAvatarURL());
          message.channel.send(embed)
        }

        /* let bannedMemberInfo = await message.guild */
        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        let motivo = args.slice(1).join(" ");

        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
            .setAuthor(`COMO DESEJA PERDOA ESTE MEMBRO?`, client.user.displayAvatarURL())
            .setDescription(`» Reaja a baixo com o emoji corespondente ao perdão`)
            .addField(`• **Informações** `, `▪︎ **Membro a ser Perdoado:** ${membro} \n ▪︎ **Moderador responsavel:** ${message.author} \n\n • **Perdões:** \n <:offline:736703246969733120> Use para perdoar um mute de um membro \n <:ausente:736703344906731562> Use para perdoa um warn de um membro \n <:ocupado:736703631243477072> Use para perdoar um ban de um membro`)
            .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
        message.channel.send(embed).then(async (msg) => {
            msg.react("736703246969733120")
            msg.react("736703344906731562")
            msg.react("736703631243477072")
            msg.react("707833140953219134")

            const mutefilter = (reaction, user) => reaction.emoji.id === '736703246969733120' && user.id === message.author.id;
            const warnfilter = (reaction, user) => reaction.emoji.id === "736703344906731562" && user.id === message.author.id;
            const banfilter = (reaction, user) => reaction.emoji.id === "736703631243477072" && user.id === message.author.id;
            const cancelarfilter = (reaction, user) => reaction.emoji.id === "707833140953219134" && user.id === message.author.id;
        
            const unmute = msg.createReactionCollector(mutefilter)
            const unwarn = msg.createReactionCollector(warnfilter)
            const unban = msg.createReactionCollector(banfilter)
            const cancelar = msg.createReactionCollector(cancelarfilter)

          unmute.on('collect', async r => {
            msg.delete();
            let muterole;
            let cargoMute = await database.ref(`/Servidores/${message.guild.id}/Cargos/CargosMute/CargoMute`).once('value');
              cargoMute = cargoMute.val()
            let muteerole = message.guild.roles.cache.find(r => r.name === "Silenciado")

            if (!message.guild.roles.cache.has(cargoMute)) {
              muterole = muteerole
            } else {
              muterole = message.guild.roles.cache.get(cargoMute)
            }

            let cargosAntesDoMute = await database.ref(`/Servidores/${message.guild.id}/Cargos/CargosMute/CargosAntesDoMute/${membro.user.id}`).once('value')
              cargosAntesDoMute = cargosAntesDoMute.val()
            if (!cargosAntesDoMute) return;

            if (!muterole){
              const embed = new MessageEmbed()
                  .setColor("#2f3136")
                  .setDescription(`<:errado:736447664329326613> **| ERRO AO PERDOAR**\n **• Informações** \n **Mensagem:** Esse membro não possui o cargo **[ ${cargosAntesDoMute} ]** para remover!`)
                  .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                  .setTimestamp()
            return message.channel.send(embed)
            }
            if (!membro.roles.cache.has(muterole.id)) {
              const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription(`<:errado:736447664329326613> **| ERRO AO PERDOAR**\n **• Informações** \n **Mensagem:** Esse membro não está mutado!`)
              .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
              .setTimestamp()
            return message.channel.send(embed)
            }

            try {
            membro.roles.remove(muterole.id).then(() => {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setThumbnail(message.guild.iconURL({ format: "png", size: 2048, dynamic: true }))
                    .setDescription(`Olá, você acaba de ser Desmutado`)
                    .addField('Servidor', `• ${message.guild.name}`)
                    .addField("Moderador responsavel", `• ${message.author} | ${message.author.username}`)
                    .addField('Motivo', `• ${motivo || "Nenhum motivo definido"}`)
                    .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                    .setTimestamp()
                membro.send(embed).catch(() => null)
                let roleadds = cargosAntesDoMute
                if (!roleadds) return;
                membro.roles.add(roleadds)
                return;
            })
            } catch {
                let roleadds2 = cargosAntesDoMute
                if (!roleadds2) return;
                membro.roles.add(roleadds2)                            
            }

            const desmutado = new MessageEmbed()
              .setColor("#2f3136")
              .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
              .setDescription("<:certo:736447597102760007> **| MUTE PERDOADO**")
              .addField("**Moderador responsavel:**", `• ${message.author} | ${message.author.username}`)
              .addField("**Membro Perdoado:**", `• ${membro} | ${membro.user.username}`)
              .addField(`**ID do membro**`, `• ${membro.id}`)
              .addField("**Motivo do perdão:**", `• ${motivo || "Nenhum motivo definido."}`)
              .setTimestamp()
              .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
            
            if(!canal) {
              message.channel.send(desmutado).then(() =>
              message.guild.members.ban(membro, { reason: motivo })).catch(() => null)
  
              const avisoban = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("<:certo:736447597102760007> **| SUCESSO AO PERDOAR O MEMBRO**")
              message.channel.send(avisoban)
            }
              canal.send(desmutado).then(() =>
              message.guild.members.ban(membro, { reason: motivo })).catch(() => null)
  
            const avisoban = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription("<:certo:736447597102760007> **| SUCESSO AO PERDOAR O MEMBRO**")
            message.channel.send(avisoban)
          })

          unban.on('collect', async r => {
            msg.delete();

            let membroUnban = await client.users.fetch(membro)
            let ban = await message.guild.fetchBans();

            if (!ban.get(membro.id)) {
              const ErroUnban = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:errado:736447664329326613> **| ERRO AO PERDOAR**\n **• Informações** \n **Mensagem:** Esse membro não está banido para desmutar!`)
                .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL())
                .setTimestamp()
              return message.channel.send(ErroUnban)
            }

            message.guild.members.unban(membroUnban);
            try {
              msg.delete()
              const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
                .setDescription("<:certo:736447597102760007> **| BAN PERDOADO**")
                .addField("**Moderador responsavel:**", `• ${message.author} | ${message.author.username}`)
                .addField("**Membro Perdoado:**", `• ${membro.user.username} | ${membro.user.tag}`)
                .addField(`**ID do membro**`, `• ${membro.user.id}`)
                .addField("**Motivo do perdão:**", `• ${motivo || "Nenhum motivo definido."}`)
                .setTimestamp()
                .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
              if(!canal) {
                message.channel.send(embed).then(() =>
                  message.guild.members.ban(membro, { reason: motivo })).catch(() => null)
  
                  const avisoban = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("<:certo:736447597102760007> **| SUCESSO AO PERDOAR O MEMBRO**")
                  message.channel.send(avisoban)
              }
              canal.send(embed).then(() =>
                  message.guild.members.ban(membro, { reason: motivo })).catch(() => null)
  
                  const avisoban = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("<:certo:736447597102760007> **| SUCESSO AO PERDOAR O MEMBRO**")
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
        })
    }
}

/* em desenvolvimento */