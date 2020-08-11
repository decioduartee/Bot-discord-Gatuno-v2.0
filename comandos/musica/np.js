const { MessageEmbed } = require("discord.js")
const createBar = require("string-progressbar");

module.exports = {
    name: "np",
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
      
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("<:Erro:733785842438635571> **| ERRO AO VER A FILA** \n\n • Não há nada na fila");
    }
  
    const song = serverQueue.songs[0];
    const seek = (serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle(`<:tocando:733743541066661928> **| Agora está tocando:**`)
      .setDescription(`[**${song.title}**](${song.url}) \n \`\`\`${new Date(seek * 1000).toISOString().substr(11, 8) + " " + createBar((song.duration == 0 ? seek : song.duration), seek, 20)[0] + " " + (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8))}\`\`\``)
      .setThumbnail(song.thumbnail)
      .setColor('#2f3136')

    if (song.duration > 0) nowPlaying.setFooter("Tempo Restante: " + new Date(left * 1000).toISOString().substr(11, 8));

    return message.channel.send(nowPlaying);
  }
}