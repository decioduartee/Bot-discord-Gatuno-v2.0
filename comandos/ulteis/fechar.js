module.exports = {
    name: "fechar",
    description: "crie um tiket",
    run: async (client, message) => {
        const firebase = require('firebase');
        const database = firebase.database();
        const { MessageEmbed } = require("discord.js")

        let ticketAberto = await database.ref(`Servidores/${message.guild.id}/TicketAberto/${message.author.id}`).once('value')
        ticketAberto = ticketAberto.val()

        let servidorID = await database.ref(`Servidores/${message.guild.id}/Ticket/Servidor`).once('value')
        servidorID = servidorID.val()

        const servidor = client.guilds.cache.get(servidorID)
      
    if(servidor.channels.cache.find(x => x.id === ticketAberto)) {
        return message.reply("você não tem nenhum **Ticket** em aberto!").then(msg => msg.delete({ timeout: 5000 }))
    } else {

        let embed = new MessageEmbed()
            .setColor("#2f3136")
            .setAuthor(`VOCÊ DESEJA MESMO FECHAR O TICKET EM ABERTO?`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed).then(async msg => {
          msg.react("✅");
          msg.react("❎");
          
          const fecharfilter = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
          const cancelarfilter = (reaction, user) => reaction.emoji.name === "❎" && user.id === message.author.id;
          
          const fechar = msg.createReactionCollector(fecharfilter)
          const cancelar = msg.createReactionCollector(cancelarfilter)
          
        fechar.on("collect", async r => {
            msg.delete()
            message.channel.send("O **Ticket** será encerrado em 5 segundos..")
            
            setTimeout(function(){
              message.channel.delete()
              database.ref(`Servidores/${message.guild.id}/TicketAberto/${message.author.id}`).remove()
            }, 5000)
        })
            
        cancelar.on("collect", async r => {
            msg.delete()
            message.channel.send("O encerramento do **Ticket** foi cancelada!").then(msg => msg.delete({ timeout: 5000 }))
        })
          
      })        
    } 
  }
}