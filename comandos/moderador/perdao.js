const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../config.json");

module.exports = {
    name: "perdao",
    aliases: ["perdon", "perdão"],
    category: "moderador",
    description: "puni membros",
    accessableby: "Moderador",
    userPerm: ["MANAGE_GUILD"],
    botPerm: ["MANAGE_GUILD"],
    run: async (client, message, args, database) => {
        
        /* let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalPunição`).once('value')
          canais = canais.val()
        let canal = message.guild.channels.cache.get(canais) */
        
        if(!args[0]) {
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`<:errado:736447664329326613> **| ERRO AO PERDOAR**`)
            .addField(`**Use:**`, `• ${prefix}Perdoar \`< @Membro > < Motivo >\` \n\n > Lembrando que o Motivo é opcional \n > pois se não houver motivo \n > o mesmo será: **Nenhum motivo definido.**`)
            .addField(`**Exemplo:**`, `• ${prefix}Perdoar \`@papito\` Perdoado por ser lindo igual eu`)
            .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}perdon"`, message.client.user.displayAvatarURL());
          message.channel.send(embed)
        }

        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());

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
        })
    }
}