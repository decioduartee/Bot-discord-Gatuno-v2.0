const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js")
const { QUEUE_LIMIT } = require("../../config.json");

module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed()
    .setColor("#2f3136");

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
            embed.setColor('#2f3136')
            .setDescription(`<:Aviso:733774505939435570> **| Fila concluída** \n\n • Adicione mais algumas músicas para reproduzir!`)
            .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL())
            .setTimestamp()      
      return queue.textChannel
        .send(embed)
        .catch(console.error);
    }

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

    if(error.message.includes === "copyright") {
      let embed = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`<:Erro:733785842438635571> **| ERRO COPYRINGHT** \n\n > • Este vídeo contém conteúdo protegido por direitos autorais`)
      message.channel.send(embed)
    } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);
  
    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    embed.setThumbnail(song.thumbnail)
    .setDescription(`**<:tocando:733743541066661928> | Tocando Agora:** \n\n **[${song.title}](${song.url})**`)
    .setFooter(`Música pedida por ${message.member.displayName}`, message.author.displayAvatarURL({ dinymic: true }))
    
    queue.textChannel
      .send(embed).then((async (msg, client, args) => {
            await msg.react('733737056190332939') 
            const ameifilter = (reaction, user) => reaction.emoji.id === '733737056190332939' && user.id === message.author.id;
      
            const amei = msg.createReactionCollector(ameifilter, { timeout: 900000, max: 1 })
            
            amei.on('collect', r => {
              let embed = new MessageEmbed()
                  .setColor('#2f3136')
                  .setDescription(`<:amei:733737056190332939> **| MÚSICA MARCADA COM UM AMEI** \n\n > • ${message.author}, acabo de salvar as informações dessa música na sua **DM** caso queira ouvir novamente!`)
              message.channel.send(embed).then(msg => msg.delete({ timeout: 50000 }))
              
              let embedDM = new MessageEmbed()
                  .setColor('#2f3136')
                  .setThumbnail(song.thumbnail)
                  .setDescription(`<:amei:733737056190332939> **VOCÊ DEU UM AMEI NA MUSICA:** \n\n **Nome Da Música** \n [${song.title}](${song.url})`)
                  .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
               message.author.send(embedDM)
            })
    })).catch(err => message.channel.send("UNABLE TO PLAY SONG"));
    
  }
};