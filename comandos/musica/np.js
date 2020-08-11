const { MessageEmbed } = require("discord.js")
const createBar = require("string-progressbar");

module.exports = {
    name: "np",
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
      
      const serverQueue = message.client.queue.get(message.guild.id);

      if (!serverQueue) {
        embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO VER A FILA** \n\n • Não há nada na fila`)
        return message.channel.send(embed);
      }
    
      const song = serverQueue.songs[0];
      const seek = (serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000;
      const left = song.duration - seek;
  
      let nowPlaying = new MessageEmbed()
        .setTitle(`<a:cristal:740177670343491726> **|** ${client.user.username} - Now Playing **|** <a:cristal:740177670343491726>`)
        .setDescription(`[${song.title}](${song.url})`)
        .setColor("RANDOM")
        .addField("\u200b", new Date(seek * 1000).toISOString().substr(11, 8) + "[" + createBar((song.duration == 0 ? seek : song.duration), seek, 20)[0] + "]" + (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)), false);
  
      if (song.duration > 0) nowPlaying.setFooter("Tempo Restante: " + new Date(left * 1000).toISOString().substr(11, 8));
  
      return message.channel.send(nowPlaying);
      
    //const progress = moment.duration({ms: dispatcher});
    // ${progress.minutes()}:${progress.seconds()} •
      
    /* const npEmbed = new MessageEmbed()
      .setColor('#2f3136')
      .setTitle('<:tocando:733743541066661928> **Agora está tocando:**')
      .setDescription(`[**${serverQueue.songs[0].title}**](${serverQueue.songs[0].url})`)
      .setThumbnail(serverQueue.songs[0].thumbnail)
      .addField('Duração', `[\`${new Date(serverQueue.songs[0].duration * 1000).toISOString().substr(11, 8)}\`]`)
    message.channel.send({embed: npEmbed}); */
  }
}