const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "removerole",
    category: "moderador",
    aliases: ["rr"],
    description: "Remove cargo de membros no discord",
    accessableby: "Administrator",
    usage: "[nome | nickname | mention | ID] <role>",
    userPerm: ["ADMINISTRATOR"],
    botPerm: ["ADMINISTRATOR"],
    run: async (client, message, args) => {

        if (!args[0]){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nPor favor Mencione um usuario!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nNão foi possível encontrar esse usuário`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nMencione o cargo que deseja remover`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (!role){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nnão foi possivel remover esse cargo`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Não é possível remover a função deste usuário! - [Devet ter o cargo mais alto que o meu]**')
        if (message.guild.me.roles.highest.comparePositionTo(role) < 0) return message.channel.send('**O cargo atualmente é superior a mim, portanto, não é possível removê-la do usuário!**')
        if (role.managed){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nNão é possível remover esse cargo deste usuário!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return
        }

        if (!rMember.roles.cache.has(role.id)){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nO membro não possui este cargo`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return
        }
        if (rMember.roles.cache.has(role.id)) await (rMember.roles.remove(role.id));

        const sembed = new MessageEmbed()
            .setColor("#2f3136")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`O Cargo ${role} foi removido de ${rMember.user}`)
        message.channel.send(sembed);

        let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalPunição`).once('value');
        canais = canais.val()

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
            .setColor("#2f3136")
            .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Comando usado**", "removerole")
            .addField("**Cargo removido de**", rMember.user)
            .addField("**Cargo**", role)
            .addField("**Moderador responsavel**", message.author)
            .setTimestamp();

        let canal = message.guild.channels.cache.get(canais)
        if (!canal) return;
        canal.send(embed)
    }
}