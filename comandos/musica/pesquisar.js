const { MessageEmbed, Util } = require("discord.js")
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(process.env.youtubeapi);
const ytdl = require('ytdl-core');
//const ytdlDiscord = require('ytdl-core-discord')

module.exports = {
    name: "pesquisar",
    aliases: ["pesquisar", "pesquisa", "ps"],
    run: async (client, message, args) => {
      
        if (!args[0]) {
          const embed = new MessageEmbed()
              .setColor('#2f3136')
              .setDescription(`<:Erro:733785842438635571> **| ERRO AO PESQUISAR** \n\n • Me informe um nome para a pesquisa`)
              .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL());
            message.channel.send(embed)
          return;
        }
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const searchString = args.slice(1).join(' ');

    const { channel } = message.member.voice;
       if (!channel) {
        const embed = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription("<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n • Entre em um canal de voz")
        .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
        return message.channel.send(embed);
       }

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, channel, true);
            }
        }
        else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                  
                    const videosEmbed = new MessageEmbed()
                        .setColor('#2f3136')
                        .setThumbnail(client.user.displayAvatarURL())
                        .setFooter(`${client.user.username}: Me informe o numero de uma música para reproduzir`, client.user.displayAvatarURL())
                        .setDescription(`<:categoria:734589021468098582> **RESULTADO DA PESQUISA:**`)
                        videos.map(video2 => videosEmbed.addField(`${video2.url}`, `**${index + 1} »** ${video2.title} ${++index}`))                  
                    message.channel.send(videosEmbed).then(message2 => message2.delete({ timeout: 10000 }))
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            max: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                    const embed = new MessageEmbed()
                      .setColor('#2f3136')
                      .setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n • Tempo esgotado`)
                      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
                      message.channel.send(embed)
                    return;
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                const embed = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n • Não foi possível obter nenhum resultado da pesquisa.`)
                    .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
                  message.channel.send(embed)
                return;
              }
            }
            return handleVideo(video, message, channel);
        }

        async function handleVideo(video, message, channel, playlist = false) {
            const serverQueue = message.client.queue.get(message.guild.id)
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`,
                time: video.length_seconds,
                thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
            };
          
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: channel,
                    connection: null,
                    songs: [],
                    volume: 3,
                    playing: true,
                    loop: false
                };
                message.client.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
                try {
                    var connection = await channel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0], message);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    message.client.queue.delete(message.guild.id);
                    return undefined;
                }

            } else {
                serverQueue.songs.push(song);
              if (playlist) return undefined;
              else {
                const embed = new MessageEmbed()
                  .setColor("#2f3136")
                  .setDescription(`**<:Adicionado:733774156742524929> Música Adicionada:** \n\n **[${song.title}](${song.url})**`)
                  .setThumbnail(song.thumbnail)
                  .setFooter(`Música pedida por ${message.member.displayName}`, message.author.displayAvatarURL({ dinymic: true }))
                message.channel.send(embed)
              }
            }
            return undefined;
        }
      
        async function play(guild, song, msg) {
           const serverQueue = message.client.queue.get(message.guild.id)

            if (!song) {
                serverQueue.voiceChannel.leave()
                message.client.queue.delete(guild.id);
                return;
            }

            const dispatcher = serverQueue.connection.play(await ytdl(song.url, { filter: "audioonly", highWaterMark: 1 << 20, quality: "highestaudio" }))
                .on('finish', () => {
                    if (serverQueue.loop) {
                        serverQueue.songs.push(serverQueue.songs.shift());
                        return play(guild, serverQueue.songs[0], msg)
                    }
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0], msg)

                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

            const embed = new MessageEmbed()
                .setColor('#2f3136')
                .setThumbnail(song.thumbnail)
                .setTimestamp()
                .setDescription(`<:tocando:733743541066661928> **Tocando Agora: \n\n [${song.title}](${song.url})**`)
                .setFooter(message.author.username, message.author.displayAvatarURL());
            serverQueue.textChannel.send(embed);

        };
    }
};