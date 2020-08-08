module.exports = {
    name: 'leave',
    aliases: ['saida'],
    category: 'saida',
    run: async (client, message, args, database) => {

        const { MessageEmbed } = require('discord.js')

        if (!message.member.hasPermission("ADMINISTRATOR")){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\n\n • Você não tem a permissão \`ADMINISTRATOR\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (!message.guild.me.hasPermission("ADMINISTRATOR")){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\n\n • Eu não tenho a permissão \`ADMINISTRATOR\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        const embed = new MessageEmbed()
            .setTitle(`__MENSAGEM__`)
            .setDescription(`<:listadecomandos:706682302989860876> • Escreva abaixo a mensagem de boas-vindas`)
            .addField(`__**VARIAÇÕES**__`, `• {membro} - Menciona o usuário\n • {membros} - Puxa a quantidade de usuários no servidor\n • {server} - Puxa o nome do servidor`)
            .setColor('#2f3136')
        message.channel.send(embed).then(msg => {
            message.delete()
            let cj = message.channel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                .on('collect', c => {
                    const texto = c.content
                    database.ref(`/Servidores/${message.guild.id}/Lobby/Saida/Mensagem`).set(texto)


                    const embed2 = new MessageEmbed()
                        .setTitle(`__TÍTULO__`)
                        .setColor('#2f3136')
                        .setDescription(`<:listadecomandos:706682302989860876> • Agora, escreva um título`)

                   message.channel.send(embed2).then(msg2 => {
                        message.delete()
                        let cjj = message.channel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                            .on('collect', c => {
                                const titulo = c.content
                                database.ref(`/Servidores/${message.guild.id}/Lobby/Saida/Titulo`).set(titulo)


                                const embed3 = new MessageEmbed()
                                    .setTitle(`__CANAL__`)
                                    .setColor('#2f3136')
                                    .setDescription(`<:listadecomandos:706682302989860876> • Por fim, mencione o canal que deseja definir`)

                               message.channel.send(embed3).then(msg3 => {
                                    message.delete()
                                    let cjjj = message.channel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                                        .on('collect', c => {
                                            const canal = c.mentions.channels.first()
                                            if (!canal) {
                                                return message.channel.send({embed: {
                                                    color: 15158332,
                                                    title: "<:error:715218174215323691> **| ERRO**",
                                                    description:"\`< mencione um canal >\`"
                                                }})
                                            }
                                            database.ref(`/Servidores/${message.guild.id}/Lobby/Saida/Canal`).set(canal.id)

                                            const pronto = new MessageEmbed()
                                            .setColor("#2f3136")
                                            .setDescription(`**Pronto** ${message.author}, Sistema de saida configurado com sucesso!`)
                                            message.channel.send(pronto) 
                                        })
                                })
                            })
                    })
                })
        })
    }
}