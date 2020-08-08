module.exports = {
  name: "perfil",
  aliases: ["profile"],
  description: "",
  category: "informacao",
  run: async (client, message, args, database) => {
    const { MessageEmbed } = require("discord.js");
    const { prefix } = require("../../config.json")
    const db = require("quick.db");
    const member = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author)  || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) 
    
    let status = {};
    if (member.presence.status === "dnd") status = "<:ocupado:736703631243477072> Ocupado";
    if (member.presence.status === "idle") status = "<:ausente:736703344906731562> Ausente";
    //if (member.presence.status === "stream") status = "🟣 Transmitindo";
    if (member.presence.status === "offline") status = "<:offline:736703246969733120> Offline";
    if (member.presence.status === "online") status = "<:online:736703182196965479> Online";
    
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
      VERIFIED_BOT: `<:VERIFIED_BOT:741065914413482096>`,
      VERIFIED_DEVELOPER: `<:VERIFIED_DEVELOPER:741067883286626355>`
    };

  let userFlags = member.user.flags.toArray();

  const emblema = userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : '';
    
    let cats = ``;
    let level = ``;
    database.ref(`Servidores/${message.guild.id}/Levels/${member.user.id}`).once("value").then(async function(snap) {
        if (snap.val() == null) {
          database
            .ref(`Servidores/${message.guild.id}/Levels/${member.user.id}`)
            .set({
            cats: 0,
            level: 0
            });
        } else {
          cats = snap.val().cats;
          level = snap.val().level;
          database
            .ref(`Servidores/${message.guild.id}/Levels/${member.user.id}`)
            .update({
            cats: cats,
            level: level
            });

    var desc = await db.get(`biografia_${member.id}`);
    var thumb = await db.get(`imagem_${member.id}`);
    var cor = await db.get(`color_${member.id}`);
    if (desc === null) desc = "Nenhuma biografia definida";

    let embed = new MessageEmbed()
      if (!["683555315957891149"].includes(member.id)) {
        embed.setDescription(`• Perfil do usuário: **${member}** \n • Emblemas: ${emblema || `Não possui emblemas`} \n\n • Biografia:\n\`\`\`md\n# ${desc}\n\`\`\` \n **Informações adicionais:** \n • level: \`${level}\` \n • Cats: $ \`${cats.toLocaleString()}\` \n • status: ${status}`)
      } else {
        embed.setDescription(`• Perfil do usuário: **${member}** \n • Desenvolvedor do ${client.user} \n • Emblemas: ${emblema || `Não possui emblemas`} \n\n • Biografia:\n\`\`\`md\n# ${desc}\n\`\`\` \n **Informações adicionais:** \n • level: ${level} \n • Cats: $ ${cats.toLocaleString()} \n • status: ${status}`);
      }
      if (cor === null || cor === undefined) {
        embed.setColor('#2f3136')
      } else {
        embed.setColor(`${cor}`)
      }
      embed.setThumbnail(member.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
      embed.setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL());
    message.delete().catch();
    if (thumb != null || thumb != undefined) {
      embed.setImage(`${thumb}`);
    }
      message.channel.send(embed).then(msg => {
        msg.react('❓')
        const comandofilter = (reaction, user) => reaction.emoji.name === ("❓") && user.id === message.author.id;
        const comando = msg.createReactionCollector(comandofilter, { timeout: 900000 })
        
          comando.on('collect', r => {
            const embed1 = new MessageEmbed()
              .setColor('#2f3136')
              .setTitle(`comandos do perfil`)
              .setDescription(`\`${prefix}sobremim\` = use para setar sua Bio \n\n \`${prefix}setimagem\` = use para setar uma imagem ao seu perfil \n\n \`${prefix}setcor\` = use para setar uma cor ao seu perfil`)
            msg.edit(embed1)
            msg.reactions.removeAll().then(msg => {
              msg.react('◀️')
            const voltarfilter = (reaction, user) => reaction.emoji.name === ("◀️") && user.id === message.author.id;
            const voltar = msg.createReactionCollector(voltarfilter, { timeout: 900000 })
          
            voltar.on('collect', r => {
              msg.edit(embed)
              msg.reactions.removeAll();
              })
            })
          })
        })
      }
    })
  }
}