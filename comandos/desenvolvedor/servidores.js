const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'servidores',
    descriptio: 'use para ver o tempo do client',
    aliases: ['servidor', 'server', 'sv'],
    run: async (client, message, args) => {
      
      message.delete().catch(() => {})

      if (![
          "705378350079803413",
          "683555315957891149",
        ].includes(message.author.id)) {
        return;
      }
      
      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let servidores =
        client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** \`${r.name}\` **ID** \`${r.id}\` **Membros** \`${r.memberCount}\``).slice(0, 10)
          .join("\n");
      
        message.delete()
      
        
        const embed = new MessageEmbed()
        .setDescription(`${servidores}`)
        .setFooter(`Pagina ${page} de ${Math.round(client.guilds.cache.size / 10 + 1)}`, message.author.displayAvatarURL)
        .setTitle(`Total de servidores [ ${client.guilds.cache.size} ]`)
        .setColor('#2f3136')
        .setThumbnail(client.user.displayAvatarURL)
        message.channel.send(embed).then(async msg => {
            await msg.react("⬅️");
            await msg.react("➡️");

            const voltarfilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
            const passarfilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;

            const voltar = msg.createReactionCollector(voltarfilter)
            const passar = msg.createReactionCollector(passarfilter)

        voltar.on('collect', r => {
          r.users.remove(message.author.id)
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page -1;
          
          if (i0 + 1 < 1) {
            msg.delete();
            return message.reply("**Como minha lista de servidores acabou**, Eu apaguei a lista").then(msg => msg.delete({ timeout: 5000 }))
          }

          servidores =
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map((r, i) => `**${i + 1}** \`${r.name}\` **ID** \`${r.id}\` **Membros** \`${r.memberCount}\``)
              .slice(i0, i1)
              .join("\n");

          embed.setDescription(servidores);

          msg.edit(embed);
            })

            passar.on('collect', r => {
              r.users.remove(message.author.id)
              
              i0 = i0 + 10;
              i1 = i1 + 10;
              page = page +1;
              
            if (i1 > client.guilds.cache.size + 10) {
              msg.delete();
              return message.reply("**Como minha lista de servidores acabou**, Eu apaguei a lista").then(msg => msg.delete({ timeout: 5000 }))
            }
              
            servidores =
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map((r, i) => `**${i + 1}** \`${r.name}\` **ID** \`${r.id}\` **Membros** \`${r.memberCount}\``)
              .slice(i0, i1)
              .join("\n");

          embed.setDescription(servidores);
          msg.edit(embed);
              
            })
        })
    }
}