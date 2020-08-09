const { MessageEmbed } = require("discord.js")
const moment = require('moment');

module.exports = {
    name: "np",
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
      
    const serverQueue = message.client.queue.get(message.guild.id);
    const dispatcher = serverQueue.connection.dispatcher.streamTime
      
    const progress = moment.duration({ms: dispatcher});
      
    const npEmbed = new MessageEmbed()
      .setColor('#2f3136')
      .setTitle('<:tocando:733743541066661928> **Agora está tocando:**')
      .setDescription(`[**${serverQueue.songs[0].title}**](${serverQueue.songs[0].url})`)
      .setThumbnail(serverQueue.songs[0].thumbnail)
      .addField('Duração', `[\`${progress.minutes()}:${progress.seconds() ? '0' : '0'} • ${new Date(serverQueue.songs[0].duration * 1000).toISOString().substr(11, 8)}\`]`)
    message.channel.send({embed: npEmbed});
  }
}