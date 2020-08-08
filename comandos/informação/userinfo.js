const { MessageEmbed } = require("discord.js");
const moment = require('moment')
moment.locale('pt-BR')

module.exports = {
  name: "userinfo",
  description: "Usado para mostrar as informações do membro",
  usage: "userinfo",
  run: async (client, message, args) => {

    const member = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author)  || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) 
    
    let status = {};
    if (member.user.presence.status === "dnd") status = "<:ocupado:736703631243477072> Ocupado";
    if (member.user.presence.status === "idle") status = "<:ausente:736703344906731562> Ausente";
    if (member.user.presence.status === "offline") status = "<:offline:736703246969733120> Offline";
    if (member.user.presence.status === "online") status = "<:online:736703182196965479> Online";

    let userinfo = {};
    userinfo.avatar = member.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true });
    userinfo.name = member.user;
    userinfo.discrim = `#${member.user.tag}`;
    userinfo.id = member.user.id;

      let presenceMes;
      if (member.user.presence.activities[0]) {
      if (member.user.presence.activities[0].type == "PLAYING") {
        presenceMes = `Jogando **${member.user.presence.activities[0].name}**`;
      } else if (member.user.presence.activities[0].type == "STREAMING") {
        presenceMes = `Strimando **${member.user.presence.activities[0].name}**`;
      } else if (member.user.presence.activities[0].type == "LISTENING") {
        presenceMes = `Ouvindo **${member.user.presence.activities[0].name}**`;
      } else if (member.user.presence.activities[0].type == "WATCHING") {
        presenceMes = `Assistindo **${member.user.presence.activities[0].name}**`;
      } else if (member.user.presence.activities[0].type == "CUSTOM_STATUS") {
        if (member.user.presence.activities[0].emoji == null) {
          presenceMes = `**${member.user.presence.activities[0].state}**`;
        } else  {
          presenceMes = `${member.user.presence.activities[0].emoji} **${member.user.presence.activities[0].state}**`;
        }
      } else {
        presenceMes = 'houve um erro entre em contato com o suporte Gatuno';
      }
      } else {
        presenceMes = 'Nada no momento';
      }
    
      let flags = {
        DISCORD_PARTNER: `<:partner:741058656832979087>`,
        BUGHUNTER_LEVEL_1: `<:BUGHUNTER_LEVEL_1:741058219077795881>`,
        BUGHUNTER_LEVEL_2: `<:BUGHUNTER_LEVEL_2:741059056030187601>`,
        HYPESQUAD_EVENTS: `<:HYPESQUAD_EVENTS:741059448570642582>`,
        HOUSE_BRAVERY: `<:HOUSE_BRAVERY:741059652472799392>`,
        HOUSE_BRILLIANCE: `<:HOUSE_BRILLIANCE:741059916378144770>`,
        HOUSE_BALANCE: `<:HOUSE_BALANCE:741060089926123562>`,
        EARLY_SUPPORTER: `<:earlysupporter:741057833898082385>`,
        TEAM_USER: `<:TEAM_USER:741060291420487710>`,
        VERIFIED_BOT: `<:VERIFIED_DEVELOPER:741067883286626355>`,
        VERIFIED_DEVELOPER: `<:VERIFIED_BOT:741065914413482096>`
      };

      let userFlags = member.user.flags.toArray();

      const emblema = userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : '';
    
      let joinposition;
      let arr = message.guild.members.cache.array();
      arr.sort((a, b) => a.joinedAt - b.joinedAt);

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == member.user.id) joinposition = i;
      }

      const carregando = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<a:load:708444432399335577> **Carregando..**`)
      message.channel.send(carregando)
        .then(msg => {
          setTimeout(function() {
            
          const info = new MessageEmbed()
            .setColor('#2f3136')
            //.setAuthor("User info", client.user.displayAvatarURL())
            .setThumbnail(userinfo.avatar)
            .addField(`**Informações**`, `• NickName: ${userinfo.name} **|** \`${userinfo.discrim}\` **|** \`${userinfo.id}\` \n • Status: ${status} \n • Presence: ${presenceMes}`)
            .addField("**Informações Adicionais**", `• Emblemas: ${emblema || "Nenhum"} \n • Você foi o(a): \`${joinposition + 1}º\` a entrar no servidor`)
            .addField('**Datas**', `<:data:707830764573556737> Data de entrada no servidor: » \`${moment(message.author.joinedAt).format("LLL")}\` \n <:data:707830764573556737> Data de criação da conta \`${moment(message.author.createdAt).format("LLL")}\``)
          .setFooter(`Pagina: 1/2`)
          msg.edit(info).then(msg => {
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
                msg.edit(info)
              })
              
            cargo.on('collect', r => {
                r.users.remove(message.author.id)
            const cargos = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription("<:certo:736447597102760007> **| SEUS CARGOS**")
              .addField(`• **Informações** • **Total de cargos [${message.member.roles.cache.size - 1}]**`, `${message.member.roles.cache.map(r => r)
                .join("\n")
                .replace("@everyone", " ")}`)
              .setFooter(`Pagina: 2/2`)
            msg.edit(cargos)
          })
              
        apagar.on('collect', r => {
          msg.delete()
            const apagar = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription("<:certo:736447597102760007> **| userinfo apagado com sucesso!**")
            message.channel.send(apagar).then(msg => msg.delete({ timeout: 5000 }))
          })
        })
      }, 1500)
    })
  }
}