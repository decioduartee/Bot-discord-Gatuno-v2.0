  
const Discord = require('discord.js');

module.exports = {
        name: "invite",
        aliases: ['invites', 'convites'],
        category: "info",
        description: "Mostra usuários ingressados por meio de convites de alguém",
        userPerm: ["MANAGE_MESSAGES"],
        botPerm: ["MANAGE_MESSAGES"],
    run: async (bot, message, args) => {
        try {
            let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

            let invites = await message.guild.fetchInvites()

            let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

            if (memberInvites.size <= 0) {
                let embed = new Discord.MessageEmbed()
                    .setColor("#2f3136")
                    .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
                    .setDescription(`<:certo:736447597102760007> **| INFORMAÇÕES DE CONVITES**`)
                    .addField('• Informações', `• **Membro:** ${member.user} \n • **Mensagem:** Você não convidou ninguém para o servidor!`)
                    .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                message.channel.send(embed)
            }

            let index = 0;
            memberInvites.forEach(invite => index += invite.uses);

            let embed = new Discord.MessageEmbed()
            setColor("#2f3136")
                .setThumbnail(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
                .setDescription(`<:certo:736447597102760007> **| INFORMAÇÕES DE CONVITES**`)
                .addField(`• Informações`, `• **Mensagem:** Pessoas Convidadas por ${member.user} \n • **Pessoa convidadas:** ${index}`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            message.channel.send(embed);
        } catch (e) {
            return;
        }
    }
};