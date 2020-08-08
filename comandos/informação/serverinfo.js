const { MessageEmbed } = require('discord.js');
const moment  = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: "serverinfo",
    description: "Usado para mostrar as informações do membro",
    usage: "serverinfo",
    run: async (client, message, args) => {
      
      message.delete({ timeout: 9000})
      
      
      let vccount = 0;
      let textcount = 0;
      let newscount = 0;
      let storecount = 0;
      let categorycount = 0;
      let totalchannel = message.guild.channels.cache.size.toLocaleString()
      message.guild.channels.cache.map(c => {
        if (c.type === "text") {
          textcount += 1;
        } else if (c.type === "voice") {
          vccount += 1;
        } else if (c.type === "news") {
          newscount += 1;
        } else if (c.type === "store") {
          storecount += 1;
        } else if (c.type === "category") {
          categorycount += 1;
        }
      });
      
      let mobilecount = 0;
      let webcount = 0;
      let desktopcount = 0;
        message.guild.members.cache.map(m => {
          let plat = m.presence.clientStatus;
            if (plat != null && JSON.stringify(plat) != "{}") {
              if (plat.web) webcount += 1;
              if (plat.mobile) mobilecount += 1;
              if (plat.desktop) desktopcount += 1;
            }
        });

        let none = message.guild.verificationLevel.replace("VERY_HIGH", "Muito Alto | ┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻")
        let low = none.replace("LOW", "Baixa")
        let medium = low.replace("MEDIUM", "Média")
        let high = medium.replace("HIGH", "Alto | (╯°□°）╯︵  ┻━┻")
        let very = high.replace("NONE", "Nenhum!")
        
        let online = message.guild.members.cache.filter(mem => mem.presence.status === "online").size.toLocaleString()
        let ocupado = message.guild.members.cache.filter(mem => mem.presence.status === "dnd").size.toLocaleString()
        let ausente = message.guild.members.cache.filter(mem => mem.presence.status === "idle").size.toLocaleString()
        let offline = message.guild.members.cache.filter(mem => mem.presence.status === "offline").size.toLocaleString()

        const carregando = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<a:load:708444432399335577> **Carregando..**`)
        message.channel.send(carregando)
        .then(msg => {
          setTimeout(function() {
                    
            const server = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(message.guild.iconURL({ format: "png", size: 2048, dynamic: true }))
            .setDescription(`• Olá **${message.author.username}** aqui está algumas informações sobre o servior **${message.guild.name}**.`)
            .addField(`**Informações:**`, `• Nome do servidor: ${message.guild.name} \n • Dono: ${message.guild.owner} | \`${message.guild.owner.user.tag}\` \n • ID Do Servidor: \`${message.guild.id}\` \n • Região: ${message.guild.region}!`)
            .addField(`**Membros:**`, `• Pessoas: ${message.guild.members.cache.filter(mem => !mem.user.bot === true).size.toLocaleString()} \n • Bots: ${message.guild.members.cache.filter(mem => mem.user.bot === true).size.toLocaleString()} \n • Membros via pc: ${desktopcount}  \n • Membros via web: ${webcount} \n • Membros via celular: ${mobilecount} \n • Total de membros: ${message.guild.memberCount.toLocaleString()} \n\n **Status** \n <:online:736703182196965479> Membros online: ${online} \n <:ocupado:736703631243477072> Membros ocupados: ${ocupado} \n <:ausente:736703344906731562> Membros ausente: ${ausente} \n <:offline:736703246969733120> Membros offline: ${offline}`, true)
            .addField(`**Canais**`, `• Canais de voz: ${vccount.toLocaleString()} \n • Canais de texto: ${textcount.toLocaleString()} \n • Canais de noticias: ${newscount.toLocaleString()} \n • Canais comerciais: ${storecount.toLocaleString()} \n • Total de canais: ${totalchannel} \n • Total de categorias: ${categorycount} \n\n **Nivel de Boost:** \n <:boost:740681170253250601> Nivel: ${message.guild.premiumTier ? `${message.guild.premiumTier}` : `Nenhum`} \n\n **Total de Boost:** \n <:boost:740681170253250601> Total: ${message.guild.premiumSubscriptionCount || `Nenhum`}`,true)
            .addField(`**Datas**`, `<:data:707830764573556737> » Servidor criado em: \`${moment(message.guild.createdAt).format('LLL')}\` \n <:data:707830764573556737> » Você se juntou aqui em: \`${moment(message.author.joinedAt).format("LLL")}\` \n <:data:707830764573556737> » Eu me juntei ao servidor em: \`${moment(client.joinedAt).format('LLL')}\``)
            .addField(`**Verificação**`, `<:nivellvl:740691346997903360> » Level: ${very}`)
            message.guild.banner ? server.setImage(message.guild.bannerURL({ format: "png", size: 2048 })) : false
            server.setFooter(`Pagina: 1/2`)
            msg.edit(server).then(msg => {
              msg.react("🔗")
              msg.react("707831809102184540")
              msg.react("707833140953219134")
              
              const serverinfoFilter = (reaction, user) => reaction.emoji.name === ("🔗") && user.id === message.author.id;
              const cargoFilter = (reaction, user) => reaction.emoji.id === ("707831809102184540") && user.id === message.author.id;
              const apagarFilter = (reaction, user) => reaction.emoji.id === ("707833140953219134") && user.id === message.author.id;
              
              const serverinfo = msg.createReactionCollector(serverinfoFilter)
              const cargo = msg.createReactionCollector(cargoFilter)
              const apagar = msg.createReactionCollector(apagarFilter)
              
              serverinfo.on('collect', r => {
                  r.users.remove(message.author.id)
                msg.edit(server)
              })
              
              cargo.on('collect', r => {
                r.users.remove(message.author.id)
                const cargos = new MessageEmbed()
                  .setColor("#2f3136")
                  .setDescription("<:certo:736447597102760007> **| CARGOS DO SERVIDOR**")
                  .addField(`• **Informações** • **Total de cargos: [ ${message.guild.roles.cache.size - 1} ]**`, `${message.guild.roles.cache.map(r => r)
                    .join("\n")
                    .replace("@everyone", " ")}`)
                  .setFooter(`Pagina: 2/2`)
                msg.edit(cargos)
              })
              
              apagar.on('collect', r => {
                msg.delete()
                const apagar = new MessageEmbed()
                  .setColor("#2f3136")
                  .setDescription("<:certo:736447597102760007> **| Serverinfo apagado com sucesso!**")
                message.channel.send(apagar).then(msg => msg.delete({ timeout: 5000 }))
              })
              
            })
          }, 1500);
        })
    }
}