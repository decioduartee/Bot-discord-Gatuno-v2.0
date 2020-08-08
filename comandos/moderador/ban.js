const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    aliases: ["b", "banir"],
    category: "moderador",
    description: "Bane membros",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    accessableby: "Administrator",
    run: async (client, message, args, database) => {
        try {

            if (!message.member.hasPermission("BAN_MEMBERS")){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não tem a permisão \`BAN_MEMBERS\``)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }
    
            if (!message.guild.me.hasPermission("BAN_MEMBERS")){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nEu não tenho a permissão \`BAN_MEMBERS\``)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }
            
            if (!args[0]){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione um membro para banir`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nEsse membro não esta no servidor`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            if (banMember === message.member){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nvocê não pode banir a sí mesmo!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nNão é possível banir esse membro!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            try {
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`Olá, você acaba de ser banido`)
                .addField('Servidor', `${message.guild.name}`)
                .addField("Moderador responsavel", message.author)
                .addField('Motivo', `${reason || "Nenhum motivo definido"}`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
                banMember.send(embed).then(() =>
                message.guild.members.ban(banMember, { days: 7, reason: reason })).catch(() => null)
            } catch {
                message.guild.members.ban(banMember, { days: 7, reason: reason })
            }

            let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalPunição`).once('value');
            canais = canais.val()

            if (reason) {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                    .setDescription(`${banMember} Acaba de ser banido, veja mais em <#${canais}>!`)
                message.channel.send(embed)
                } else {
                    const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                    .setDescription(`${banMember} Acaba de banido do servidor!`)
                message.channel.send(embed)
                }

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Puni`, message.guild.iconURL())
                .setColor("#2f3136")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Comando usado**", "ban")
                .addField("**Membro banido**", banMember.user)
                .addField("**ID do membro**", `${banMember.id}`)
                .addField("**Moderador responsavel**", message.author)
                .addField("**Motivo**", `${reason || "**Nenhum motivo definido**"}`)
                .setTimestamp();

            let canal = message.guild.channels.cache.get(canais)
            if (!canal) return;
            canal.send(embed)
        } catch(e) {
            console.log(e)
        }
    }
};