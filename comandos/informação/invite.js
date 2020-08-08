  
const Discord = require('discord.js');

module.exports = {
        name: "invite",
        aliases: ['invites', 'invi'],
        category: "info",
        description: "Mostra usuários ingressados por meio de convites de alguém",
    run: async (bot, message, args) => {
        try {
            let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

            let invites = await message.guild.fetchInvites()

            let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

            if (memberInvites.size <= 0) {
             return message.channel.send({embed: {
                color: '#206694',
                description: (`**${member.user} não convidou ninguém para o servidor!**`)
              }})
            }

            let index = 0;
            memberInvites.forEach(invite => index += invite.uses);

            let embed = new Discord.MessageEmbed()
                .setColor('#206694')
                .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setAuthor(`Informações sobre convites do ${message.guild.name}`)
                .setDescription(`Pessoas Convidadas por ${member.user}`)
                .addField("**Pessoa convidadas**", index)
            message.channel.send(embed);
        } catch (e) { return message.channel.send(`Erro detectado: ${e}`) }
    }
};