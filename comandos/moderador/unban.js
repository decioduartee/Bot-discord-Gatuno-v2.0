const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    name: "unban",
    description: "Unban a user from the guild!",
    usage: "[name | tag | mention | ID] <reason> (optional)",
    category: "moderador",
    accessableby: "Administrator",
    aliases: ["ub", "unbanish"],
    userPerm: ["BAN_MEMBERS"],
    botPerm: ["BAN_MEMBERS"],
    run: async (client, message, args) => {

        if (!args[0]){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione um membro para banir`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nForneça um nome de usuário, tag ou ID válido ou o usuário não será desbanido!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        let reason = args.slice(1).join(" ")
        
        if (reason) {
            message.guild.members.unban(bannedMember.user.id, reason)
            const embed = new MessageEmbed()
                .setColor("#206694")
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setDescription(`${bannedMember.user.tag} Acaba de ser desbanido, veja mais em <#${db.get(`punichannel_${message.guild.id}`)}>!`)
            message.channel.send(embed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                const embed = new MessageEmbed()
                .setColor("#206694")
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setDescription(`${bannedMember.user} Acaba de desbanido do servidor!`)
            message.channel.send(embed)
            }

        try{
            let channel = db.get(`punichannel_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Puni`, message.guild.iconURL())
                .setColor("#2f3136")
                .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Comando usado**", "unban")
                .addField("**Membro desbanido**", bannedMember.user)
                .addField("**ID do membro**", `${bannedMember.user.id}`)
                .addField("**Moderador responsavel**", message.author)
                .addField("**Motivo**", `${reason || "**Nenhum motivo definido**"}`)
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch(e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}