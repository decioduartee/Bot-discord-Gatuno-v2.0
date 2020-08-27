module.exports = {
    name: "ticketconfig",
    description: "crie um tiket",
    run: async (client, message, database) => {
      
  const { MessageEmbed } = require('discord.js');
  const prefix = require('../../config.json');

  const embedprinc = new MessageEmbed()
  .setTitle(`Olá ${message.author.username}!`)
  .setColor("#2f3136")
  .setDescription('Bem vindo as configurações do sistema **Ticket**!')
  .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
  .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

  message.channel.send(embedprinc)
      
  const categoriaID = new MessageEmbed()

    .setTitle('CATEGORIA')
    .setColor("#2f3136")
    .setDescription('Me informe o **ID** da categoria onde o bot irá criar o canal de **Ticket**')
    .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    .setTimestamp()

  const canal = new MessageEmbed()

    .setTitle('CANAL')
    .setColor("#2f3136")
    .setDescription('Mencione um canal para o bot enviar a mensagem de **Ticket**')
    .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    .setTimestamp()

  const cargo = new MessageEmbed()

    .setTitle('CARGO')
    .setColor("#2f3136")
    .setDescription('Mencione o cargo de "moderador" que podera ver os canais de **Ticket**')
    .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    .setTimestamp()

  const erro1 = new MessageEmbed()
    .setColor("#2f3136")
    .setDescription(`<:errado:736447664329326613> **| ERROR AO CRIAR O TICKET** \n •**Informações** \n • **Erro:** Você deve mencionar um canal! \n • **Mensagem:** Para tentar novamente, use: ${prefix}configticket`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    .setTimestamp()

  const erro2 = new MessageEmbed()
    .setColor("#2f3136")
    .setDescription(`<:errado:736447664329326613> **| ERROR AO CRIAR O TICKET** \n •**Informações** \n • **Erro:** Você deve mencionar um cargo! \n • **Mensagem:** Para tentar novamente, use: ${prefix}configticket`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    .setTimestamp()

  const mensagem = new MessageEmbed()
    .setTitle('MENSAGEM')
    .setColor("#2f3136")
    .setDescription('Me informe a mensagem do **Ticket**')
    .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    .setTimestamp()

  const titulo = new MessageEmbed()
    .setTitle('TITULO')
    .setColor("#2f3136")
    .setDescription('Me informe um titulo para o **Ticket**')
    .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
    .setTimestamp()

  message.channel.send(categoriaID).then(msg => {
    let up1 = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
    .on('collect', c => {
            const categoria = c.content
        message.channel.send(canal).then(msg1 => {
        let up2 = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            const canal = c.mentions.channels.first()
            if (!canal) {
               return message.channel.send(erro1)
            } else {
            message.channel.send(cargo).then(msg2 => {
            let up3 = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
            .on('collect', c => {
            const cargo = c.mentions.roles.first()
            if (!cargo) {
               return message.channel.send(erro2)
            } else {
                message.channel.send(mensagem).then(msg3 => {
                let up4 = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                .on('collect', c => {
                    const desc = c.content
                    
                    message.channel.send(titulo).then(msg4 => {
                    let up5 = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                    .on('collect', c => {
                        const title = c.content

        const embeda = new Discord.MessageEmbed()
      
            .setTitle('FINALIZAÇÃO')
            .setDescription('Deseja habilitar o sistema?\n\nCaso queira, reaja com: ✅!\n Caso queira desabilitar o sistema, reaja com: ❎!')
            .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
            .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
            .setTimestamp()
  

        message.channel.send(embeda).then(msg => {
            msg.react('✅').then(r => {
                msg.react('❎').then(r => {
                })
            })

        const SimFilter = (reaction, user, ) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const NaoFilter = (reaction, user, ) => reaction.emoji.name === '❎' && user.id === message.author.id;

        const Sim = msg.createReactionCollector(SimFilter, {max: 1})
        const Nao = msg.createReactionCollector(NaoFilter, {max: 1})

        Sim.on('collect', r2 =>{

            msg.delete()

            const embed9 = new MessageEmbed()
  
                .setColor("#2f3136")
                .setDescription(`<:certo:736447597102760007> **| SUCESSO AO CONFIGURAR** \n • **Informações:** \n • **Mensagem:** Sistema de Ticket ativado com sucesso!`)
                .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
                .setTimestamp()

            message.channel.send(embed9)

            const embedf = new MessageEmbed()
                .setTitle(`${title}`)
                .setDescription(`${desc}`)
                .setColor("#2f3136")
                .setFooter(`Sistema realizado por: ${client.user.username}`, client.user.displayAvatarURL())
                .setThumbnail(message.guild.iconURL({dynamic: true}))
    

            canal.send(embedf).then(msg => {
          
                database.ref(`Servidores/${message.guild.id}/Ticket/Categoria`).set(categoria)
                database.ref(`Servidores/${message.guild.id}/Ticket/canal`).set(canal.id)
                database.ref(`Servidores/${message.guild.id}/Ticket/Cargo`).set(Cargo.id)
                database.ref(`Servidores/${message.guild.id}/Ticket/Mensagem`).set(msg.id)
                database.ref(`Servidores/${message.guild.id}/Ticket/Servidor`).set(msg.guild.id)
                msg.react('🎫')
            })
        })

        Nao.on('collect', r2 =>{

            msg.delete()

            database.ref(`Servidores/${message.guild.id}/Ticket/Categoria`).remove()
            database.ref(`Servidores/${message.guild.id}/Ticket/canal`).remove()
            database.ref(`Servidores/${message.guild.id}/Ticket/Cargo`).remove()
            database.ref(`Servidores/${message.guild.id}/Ticket/Mensagem`).remove()
            database.ref(`Servidores/${message.guild.id}/Ticket/Servidor`).remove()

            const embed10 = new MessageEmbed()
  
                .setColor("#2f3136")
                .setDescription(`<:certo:736447597102760007> **| SUCESSO AO CANCELAR** \n • **Informações:** \n • **Mensagem:** Sistema de Ticket desativado com sucesso!`)
                .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL())
                .setTimestamp()
    

            message.channel.send(embed10)

                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}