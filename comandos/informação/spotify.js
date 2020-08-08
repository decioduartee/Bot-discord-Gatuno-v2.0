module.exports = {
    name: 'spotify',
    descriptio: 'use ver qual a musica que esta tocando no perfil das pessoas',
    aliases: ['spotify', 'sty'],
    run: async (client, message, args) => {
      
      let convert = require('parse-ms')
      let { MessageEmbed } = require('discord.js')
      
      let user = message.mentions.members.first() || message.author;
      
      let status = user.presence.activities[0, 1] || user.presence.activities[0] || user.presence.activities[user.presence.activities.findIndex(a => a.name == "Spotify")];
            
      if (user.presence.activities.length === [0, 1] || user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
          if (user.id === message.author.id) {
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription(`<:spotify:736828191938707478> **| SPOTIFY** \n\n • Você não está ouvindo Spotify nesse momento.`)
              .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            return message.channel.send(embed)
          } else {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:spotify:736828191938707478> **| SPOTIFY** \n\n • ${user} Não está ouvindo spotify nesse momento.`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            return message.channel.send(embed)
          }
       }
      
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
            url = `https://open.spotify.com/track/${status.syncID}`,
            name = status.details,
            artist = status.state,
            album = status.assets.largeText,
            timeStart = status.timestamps.start,
            timeEnd = status.timestamps.end,
            timeConvert = convert(timeEnd - timeStart);

        let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
        let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;

        let time = `${minutes}:${seconds}`;
        
        let embed = new MessageEmbed()
        .setAuthor("Informações sobre a faixa do Spotify", "https://cdn.discordapp.com/attachments/705905702648152144/713817373139927130/spotify-sketch.png")
        .setColor('#2f3136')
        .setThumbnail(image)
        .addField("Nome:", name, true)
        .addField("Album:", album, true)
        .addField("Duração:", time, false)
        .addField("Ouça agora no Sotify", `[\`${artist} - ${name}\`](${url})`, false)
        message.channel.send(embed)
    }
}