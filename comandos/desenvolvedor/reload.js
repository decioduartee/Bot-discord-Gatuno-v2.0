const ownerid = "683555315957891149";
const { prefix } = require("../../config.json")

module.exports = {
      name: 'reload',
      usage: '!reload [folder] [command]',
    run: async(client, message, args) => {
      
      message.delete().catch(() => {})
      
      const { MessageEmbed } = require('discord.js')

      if (message.author.id === ownerid) {
        
        if(!args[0]) {
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:errado:736447664329326613> **| ERRO AO REINICIAR UM COMANDO** \n\n • **Informações:** \n • **Use:** ${prefix}reload \`< nome da pasta > / < nome do comando >\``)
            .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
          return;
        };

        let Pasta = args[0].toLowerCase();
        let NomeComando = args[1].toLowerCase();

        try {
            delete require.cache[require.resolve(`../${Pasta}/${NomeComando}.js`)]; //

            client.comandos.delete(NomeComando);
            
            const req = require(`../${Pasta}/${NomeComando}.js`);
            client.comandos.set(NomeComando, req);
        } catch (err){
            console.log(err);
          
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:errado:736447664329326613> **| ERRO AO REINICIAR UM COMANDO** \n\n • **Informações:** \n • **Comando:** \`${NomeComando}\` \n\n » Você tem certeza de que existe esse comando?`)
            .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
          return;
        }
      
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:certo:736447597102760007> **| SUCESSO AO REINICIAR UM COMANDO** \n\n • **Informações:** \n • **Pasta:** \`${Pasta}\` \n • **Comando:** \`${NomeComando}\``)
            .setThumbnail(client.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
          return;
      } else {
        return;
      }
    },
}