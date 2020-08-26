  
const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "setnick",
        aliases: ["sn"],
        category: "moderation",
        description: "Altero o aplido do um membro",
        usage: "[mention | name | nickname | ID] <nickname>",
        accessableby: "everyone",
        userPerm: ["MANAGE_MESSAGES"],
        botPerm: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
      
        if (!args[0]) return message.channel.send("**Por favor menciono um usuário!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Por favor menciono um usuário valido!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Eu não posso alterar o nick desse membro, ele está um cargo a cima do meu!**')

        if (!args[1]) return message.channel.send("**Escreva um apelido**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("#206694")
            .setDescription(`Apelido alterado de ${member.displayName} para ${nick}`)
            .setAuthor(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Me falta permisão - [CHANGE_NICKNAME]")
        }

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
            .setColor("#2f3136")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**comando**", ".setnick")
            .addField("**Mebro mudou de**", member.user.username)
            .addField("**Para**", args.slice(1).join(' '), true)
            .addField("**Moderador responsavel**", message.author.username)
            .addField("**Data**", message.createdAt.toLocaleString())
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp();
      
            message.channel.send(sembed)
    }
}