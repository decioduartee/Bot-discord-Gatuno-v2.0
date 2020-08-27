const firebase = require('firebase');
const database = firebase.database();
  
module.exports = async (dados) => {

    if(dados.t !== "MESSAGE_REACTION_ADD") return;
  
    let categoria = await database.ref(`ServIDTicket/Servidores/${dados.d.guild_id}/Categoria`).once('value')
    categoria = categoria.val()

    if(categoria === null) {
      return;
    }

    let servidorID = await database.ref(`ServIDTicket/Servidores/${dados.d.guild_id}/IDServ`).once('value')
    servidorID = servidorID.val()

    if(servidorID === null) {
      return;
    }

    let mensagem = await database.ref(`Servidores/${dados.d.guild.id}/Ticket/Mensagem`).once('value')
    mensagem = mensagem.val()

    if(mensagem === null) {
      return;
    }

    let canal = await database.ref(`Servidores/${dados.d.guild.id}/Ticket/Canal`).once('value')
    canal = canal.val()

    if(canal === null) {
      return;
    }

    let role = await database.ref(`Servidores/${dados.d.guild.id}/Ticket/Cargo`).once('value')
    role = role.val()

    if(role === null) {
      return;
    }

    let ticketAberto = await database.ref(`Servidores/${dados.d.guild.id}/TicketAberto/${dados.d.user_id}`).once('value')
    ticketAberto = ticketAberto.val()

    if(ticketAberto === null) {
        return;
    }

    if(dados.d.message_id != mensagem) return;

    const servidor = client.guilds.cache.get(servidorID)

    let membro = servidor.members.cache.get(dados.d.user_id)

    if(dados.t === "MESSAGE_REACTION_ADD"){
      
      
      
        if(['🎫'].includes(dados.d.emoji.name)) {
          
        if(client.users.cache.get(dados.d.user_id).bot) {
          return;
        }
          
        if(servidor.channels.cache.find(x => x.id === ticketAberto)) {
            const embeda = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:errado:736447664329326613> **| ERROR AO CRIAR O TICKET** \n •**Informações** \n • **Erro:** Você já possui um Ticket em aberto! \n • **Mensagem:** Para criar outro feche o que está em aberto.`)
                .setFooter(`Reação adicionada por: ${membro.user.username}`, membro.user.displayAvatarURL())
            client.users.fetch(membro.id,false).then(user => {
            user.send(embeda).then(c => {
                setTimeout(() => {
                    c.delete()
                }, 8000)
            })
        })
          
        } else {
                                                                          
        /* if(userTickets.has(membro.id) || servidor.channels.cache.some(channel => channel.id === teste)) {
          const embeda = new MessageEmbed()
            .setTitle('ERROR')
            .setDescription('Você já possui um ticket aberto!')
            .setFooter(`Reação adicionada por: ${membro.user.username}`, membro.user.displayAvatarURL())
          client.users.fetch(membro.id,false).then(user => {
            user.send(embeda).then(c => {
              setTimeout(() => {
              c.delete()
              }, 8000)
            })
          })    
        } else { */
        
        servidor.channels.create(`ticket-${membro.user.username}`, {type: "text"
          }).then(x => {
                database.ref(`Servidores/${dados.d.guild.id}/TicketAberto/${dados.d.user_id}`).set(x.id)
                x.setParent(categoria)
                x.updateOverwrite(membro.guild.roles.everyone, {VIEW_CHANNEL: false})
                x.updateOverwrite(membro, {VIEW_CHANNEL: true})
                x.updateOverwrite(role, {VIEW_CHANNEL: true})
                x.updateOverwrite(client.user.id,{VIEW_CHANNEL: true})

          const embedx = new MessageEmbed()
            .setTitle(`Olá ${membro.user.username}!`)
            .setDescription(`Seja bem vindo ao canal de ticket!\n Caso queira fechar o ticket, reaja com: ❎!`)
            .setFooter(`Ticket aberto por: ${membro.user.username}`, membro.user.displayAvatarURL({ dynamic: true }))
          x.send(`${membro} & <@&${role}>`, embedx).then(msg => {
              msg.react('❎')
            const FecharA = (reaction, user, ) => reaction.emoji.name === '❎' && user.id ===
                membro.user.id;
            const Fechar = msg.createReactionCollector(FecharA)

            Fechar.on('collect', r2 => {
                msg.delete()
                x.send(`${membro}, o canal será deletado em 5 segundos!`)
                setTimeout(() => {
                    x.delete()
                }, 5000)
          
                        })
                    })
                })
              //}
            }
        }
    }     
}