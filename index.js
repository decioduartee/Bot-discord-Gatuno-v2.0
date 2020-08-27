const Discord = require("discord.js");
const firebase = require("firebase");

const client = new Discord.Client({ 
  partials: ["MESSAGE", "CHANNEL", "REACTION"] }, 
  new Discord.Client({ disableEveryone: true 
  })
);

/*
const Constants = require("discord.js/src/util/Constants.js");
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;

deixa o bot em modo celular como status
*/

var firebaseConfig = {
  apiKey: "AIzaSyCvameiSh9UygMOBgckn9jpVDYnyLbRcz0",
  authDomain: "gatuno-bot.firebaseapp.com",
  databaseURL: "https://gatuno-bot.firebaseio.com",
  projectId: "gatuno-bot",
  storageBucket: "gatuno-bot.appspot.com",
  messagingSenderId: "169162698827",
  appId: "1:169162698827:web:f4e3848d74805a3bac9dce",
  measurementId: "G-1N2TPXXEGL"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

client.comandos = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();
client.eventos = new Map();

["comando", "eventos"].forEach(handler => { require(`./handlers/${handler}`)(client) });

client.on('raw', async dados => {

  if(dados.t !== "MESSAGE_REACTION_ADD") return;

  let categoria = await database.ref(`Servidores/${dados.d.guild_id}/Ticket/Categoria`).once('value')
  categoria = categoria.val()

  if(categoria === null) {
    return;
  }

  let servidorID = await database.ref(`Servidores/${dados.d.guild_id}/Ticket/Servidor`).once('value')
  servidorID = servidorID.val()

  if(servidorID === null) {
    return;
  }

  let mensagem = await database.ref(`Servidores/${dados.d.guild_id}/Ticket/Mensagem`).once('value')
  mensagem = mensagem.val()

  if(mensagem === null) {
    return;
  }

  let canal = await database.ref(`Servidores/${dados.d.guild_id}/Ticket/Canal`).once('value')
  canal = canal.val()

  if(canal === null) {
    return;
  }

  let role = await database.ref(`Servidores/${dados.d.guild_id}/Ticket/Cargo`).once('value')
  role = role.val()

  if(role === null) {
    return;
  }

  //let ticketAberto = await database.ref(`Servidores/${dados.d.guild_id}/TicketAberto/${dados.d.user_id}`).once('value')
  //ticketAberto = ticketAberto.val()

  //if(ticketAberto === null) {
      //return;
  //}

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
      
      servidor.channels.create(`ticket-${membro.user.username}`, {type: "text"
        }).then(x => {
              database.ref(`Servidores/${dados.d.guild_id}/TicketAberto/${dados.d.user_id}`).set(x.id)
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
          const FecharA = (reaction, user, ) => reaction.emoji.name === '❎' && user.id === membro.user.id;
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
      }
    }
  }     
})
/*
client.on("message", async message => {
  
  //______________________________________________________________________
  
    
    client.on("messageUpdate", async (oldMessage, newMessage) => {
      if (oldMessage.content === newMessage.content) {
        return;
      }
    
      let EditEmbed = new MessageEmbed()
        .setAuthor(`Mensagem Editada`, newMessage.guild.iconURL({dynamic: true}))
        .setColor("#2f3136")
        .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Registro de mensagens editadas por ${oldMessage.author}. \n\n **• Informações** \n ▪︎ **Antes**: ${oldMessage.content} \n ▪︎ **Depois**: ${newMessage.content} \n ▪︎ **No canal**: ${newMessage.channel} \n ▪︎ **Link da mensagem:** [link](${newMessage.url}) \n ▪︎ **Servidor**: ${newMessage.guild.name}`);
    
      let canais = await database.ref(`Servidores/${newMessage.guild.id}/Canais/CanalLog`).once('value')
      canais = canais.val()
    
      const canal = newMessage.guild.channels.cache.get(canais)
      if (!canal) return;
      canal.send(EditEmbed);
    })
  
    //______________________________________________________________________

    client.on("messageDelete", async (message, channel) => {

      let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalLog`).once(`value`)
      canais = canais.val()
    
      let DeleteEmbed = new MessageEmbed()
        .setAuthor(`Mensagem Deletada`, message.guild.iconURL({dynamic: true}))
        .setColor("#2f3136")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Registro de mensagens deletadas por ${message.author}. \n\n **• Informações** \n ▪︎ **Mensagem Deletada**: ${message} \n ▪︎ **No canal**: ${message.channel} \n ▪︎ **Servidor**: ${message.guild.name}`)
    
      const canal = message.guild.channels.cache.get(canais);
        if (!canal) return;
      return canal.send(DeleteEmbed);
    })

    //____________________________________________________________________________

    client.on("guildMemberUpdate", async (oldMember, newMember) => {
  
      let canais = await database.ref(`Servidores/${newMember.guild.id}/Canais/CanalLog`).once(`value`)
        canais = canais.val()
  
      const canal = newMember.guild.channels.cache.get(canais);
        if (!canal) return;
  
      let membros = [oldMember.nickname, newMember.nickname];
  
        if (membros[0] == null) 
        {
        membros[0] = oldMember.user.username;
        }
        if (membros[1] == null) 
        {
        membros[1] = newMember.user.username;
        }
  
        if (oldMember.nickname != newMember.nickname) 
        {
      let ApelidoEmbed = new Discord.MessageEmbed()
        .setAuthor(`Apelido alterado`, newMember.guild.iconURL({ dynamic: true }))
        .setColor("#2f3136")
        .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Registro de apelidos alterados por ${newMember}. \n\n **• Informações** \n ▪︎ **Antes**: ${membros[0]} \n ▪︎ **Depois**: ${membros[1]} \n ▪︎ **Servidor**: ${newMember.guild.name}`);
      canal.send(ApelidoEmbed);
      }
    })

});
*/

client.login(process.env.token);
