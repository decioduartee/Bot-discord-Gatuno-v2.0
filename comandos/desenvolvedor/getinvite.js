const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "getinvite",
        aliases: ['getinv', 'gt'],
        category: "owner",
        description: "Gera um convite para o servidor em questão..",
        usage: "[ID | name]",
        accessableby: "Owner",
    run: async(client, message, args) => {
      
      message.delete().catch(() => {})
      
      const ownerid = "691107890609520670";
      
        if (message.author.id === ownerid) {
        let guild = null;

        if (!args[0]) {
          const embed = new MessageEmbed()
          .setColor('#2f3136')
          .setTitle('Vamos lá')
          .setDescription(`Primeiro me informe um \`nome\` ou \`id\` de um servidor junto ao comando.`)
          .setFooter(`você pode ver em quais servidores estou, Reagindo a baixo.`)
          message.channel.send({ embed }).then(async msg => {
            await msg.react(':servidores:713696627675758633')
            const servidoresfilter = (reaction, user) => reaction.emoji.id === '713696627675758633' && user.id=== message.author.id;
            const servidores = msg.createReactionCollector(servidoresfilter)
            
            servidores.on('collect', r => {
              msg.delete()
                let comandosFile = require('../desenvolvedor/servidores.js')
                comandosFile.run(client, message, args)
            })
          })
          return;
        }

        if(args[0]){
            let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
            let found = client.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
          let embed = new MessageEmbed()
          .setColor('#2f3136')
          .setTitle('❌ **|** ERRO')
          .setDescription(`Nome invalido`)
          message.channel.send(embed)
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
              let embed = new MessageEmbed()
              .setColor('#2f3136')
              .setTitle('❌ **|** ERRO')
              .setDescription(`Ocorreu um erro desconhecido, tente novamente!`)
              message.channel.send(embed)
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} ocorreu!`);
            });
            message.channel.send(invite.url);
        } else {
          let embed = new MessageEmbed()
            .setColor('#2f3136')
            .setTitle('❌ **|** ERRO')
            .setDescription(`**\`${args.join(' ')}\`** Eu não estou neste servidor`)
          message.channel.send(embed)
        }
    } else {
        return;
    }
  }
}