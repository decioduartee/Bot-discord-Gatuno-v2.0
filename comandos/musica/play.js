const { MessageEmbed } = require("discord.js")
const { Util } = require("discord.js");
const { YOUTUBE_API_KEY, QUEUE_LIMIT, prefix} = require("../../config.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const { play } = require("../system/music.js");

module.exports = {
    name: "play",
    botPerm: ['CONNECT', 'SPEAK', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS'],
    aliases: ["p"],
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
      
    let embed = new MessageEmbed()
    .setColor("#2f3136");
    if (!args.length) {
      embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n **Use o comando dessa forma:** \n\n > • ${prefix}play link da musica **ou** \n > • ${prefix}play nome da música`)
      .setThumbnail(message.client.user.displayAvatarURL())
      .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}p"`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;
        
    if (!channel) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n • Entre em um canal de voz")
      .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed);
    }

    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      embed.setDescription("<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n • Não consigo reproduzir está lista de reprodução por enquanto")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };
    
    const voteConstruct = {
      vote: 0,
      voters: []
    }

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
        songData = await ytdl.getInfo(args[0]);
      
        song = {
             title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          duration: songData.videoDetails.lengthSeconds,
          thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url
        };
      } catch (error) {
        
        if(message.includes === "copyright") {
          let embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:Erro:733785842438635571> **| ERRO COPYRINGHT** \n\n • Este vídeo contém conteúdo protegido por direitos autorais`)
            .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
          message.channel.send(embed)
        }else {
          console.error(error);
        }
      }
    } else {
          
      try {
        const result = await youtube.searchVideos(targetsong, 1);
        songData = await ytdl.getInfo(result[0].url);
      
        song = {
          title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          duration: songData.videoDetails.lengthSeconds,
          thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
        };
      } catch (error) {
        console.log(error)
        if(error.errors[0].domain === "youtube.quota") {
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription('<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n > • Infelizmente eu excedi a Api do Youtube de tanto reproduzir músicas \n > Tente novamente mais tarde.')
            .setFooter(`Atenciosamente, ${client.user.username}`,client.user.displayAvatarURL());
          message.channel.send(embed)
        }
      }
    }

    if (serverQueue) {
        if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n > • Você não pode adicionar mais de ${QUEUE_LIMIT} músicas na fila`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL());
        message.channel.send(embed)
    }
      
      //let hours = Math.floor(song.duration / 3600);
      //let min = Math.floor(song.duration / 60);
      //let sec = Math.floor(song.duration % 60);
      //let tempo = `${hours}:${min}:${sec}`.split(' ')
      
      let likes = songData.videoDetails.likes
      let dislikes = songData.videoDetails.dislikes
      let views = songData.videoDetails.viewCount
      let data = new Date(songData.videoDetails.uploadDate)
      let categoria = songData.videoDetails.category
      let canal = songData.videoDetails.ownerProfileUrl
      let nomecanal = songData.videoDetails.ownerChannelName
      
      serverQueue.songs.push(song);
      let embedMusica = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`**<:Adicionado:733774156742524929> Música Adicionada:** \n\n **[${song.title}](${song.url})**`)
      .addField('**Likes:**', `<:like:733805179261943809> **${likes.toLocaleString()}**`, true)
      .addField('**Dislikes:**', `<:deslike:733805179731705946> **${dislikes.toLocaleString()}**`, true)
      if (song.duration > 0) embedMusica.addField("**Tempo Da Música**", `**▬▬▬● ${new Date(song.duration * 1000).toISOString().substr(11, 8)}**`, true);
      //.addField("**Tempo Da Música**", `▬▬▬▬● **${tempo}**`, true)
      embedMusica.setThumbnail(song.thumbnail)
      .setFooter(`Música pedida por ${message.member.displayName}`, message.author.displayAvatarURL({ dinymic: true }))
      
      return serverQueue.textChannel
        .send(embedMusica).then(msg => {
        msg.react("734286187015176274")
        
        const sobrefilter = (reaction, user) => reaction.emoji.id === "734286187015176274" && user.id === message.author.id;
        const voltarfilter = (reaction, user) => reaction.emoji.id === "734297348020240395" && user.id === message.author.id;
        
        const sobre = msg.createReactionCollector(sobrefilter, { timeout: 900000, max: 1 })
        const voltar = msg.createReactionCollector(voltarfilter, { timeoutr: 90000, max: 1 })
        
        sobre.on("collect", r => {
          let embedsobre = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription("<:sobre:734286187015176274> **| SOBRE A MÚSICA**")
          .setThumbnail(song.thumbnail)
          .addField('**Views:**', `<:views:734589021627613204> **${views}**`)
          .addField("**Canal:**", `<:youtube:734574682648346736> **[${nomecanal}](${canal})**`)
          .addField("**Categoria:**", `<:categoria:734589021468098582> **${categoria}**`)
          .addField("**Data De Postagem:**", `<:data:734574682895810560> **${data.toLocaleString()}**`)
          .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL());
          msg.reactions.removeAll();
          msg.react("734297348020240395").then((r) => {
            voltar.on("collect", (r) => {
              msg.reactions.removeAll();
              msg.edit(embedMusica)
            })
          })
          msg.edit(embedsobre)
        })
        
      })
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);
    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel
          .send({
            embed: {
              description: `<:Erro:733785842438635571> **| ERRO AO REPRODUZIR** \n\n • Não consegui me conectar no canal pois a Conexão não estabelecida dentro de 15 segundos.`,
              footer: {
                text: `Atenciosamente, ${client.user.username}`,
                icon_url: `${client.user.displayAvatarURL()}`
              },
              color: "#2f3136"
            }
          })
          .catch(console.error);
      }
    }
  }
};
