const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild) => {

  let vccount = 0;
  let textcount = 0;
  let newscount = 0;
  let storecount = 0;
  let categorycount = 0;
  let totalchannel = guild.channels.cache.size.toLocaleString()
  guild.channels.cache.map(c => {
    if (c.type === "text") {
      textcount += 1;
    } else if (c.type === "voice") {
      vccount += 1;
    } else if (c.type === "news") {
      newscount += 1;
    } else if (c.type === "store") {
      storecount += 1;
    } else if (c.type === "category") {
      categorycount += 1;
    }
  });
  
  let embed = new MessageEmbed()
    .setAuthor("Fui adicionado em um servidor", client.user.displayAvatarURL())
    .setThumbnail(guild.iconURL({ format: "png", size: 2048, dynamic: true }))
    .addField(`**Servidor**`, guild.name, true)
    .addField(`**Dono**`, `${guild.owner} | ${guild.owner.user.username}` , true)
    .addField(`**ID**`, `${guild.id}`, true)
    .addField(
      `**CANAIS**`,
      `• Total de Canais ${
        totalchannel
      }\n • Total de Categorias ${
        categorycount
      }\n • Canais de Mensagem ${
        textcount
      }\n • Canais de Voz ${
        vccount
      }\n • Canais de Loja ${
        storecount
      }\n • Canais de Notícias ${
        newscount
      }`, true
    )
    .addField(
      `USERS`,
      `• Pessoas » ${
        guild.members.cache.filter(mem => !mem.user.bot === true).size.toLocaleString()
      }\n • Membros: » ${
        guild.memberCount.toLocaleString()
      }\n • Bots » ${
        guild.members.cache.filter(mem => mem.user.bot === true).size.toLocaleString()
      }`, true
    )
    .addField(`STATUS`,
      `<:online:736703182196965479> online » ${
      guild.members.cache.filter(mem => mem.presence.status === "online").size.toLocaleString()
      }\n <:ocupado:736703631243477072> Não Perturbar » ${
      guild.members.cache.filter(mem => mem.presence.status === "dnd").size.toLocaleString()
      }\n <:ausente:736703344906731562> Ausente » ${
      guild.members.cache.filter(mem => mem.presence.status === "idle").size.toLocaleString()
      }\n <:offline:736703246969733120> Invissivel » ${
      guild.members.cache.filter(mem => mem.presence.status === "offline").size.toLocaleString()
      }`
    )
    .addField(
      `**STATUS GATUNO**`,
      `» #️⃣ \`${client.users.cache.size.toLocaleString()}\` Membros \n » 🛡️ \`${client.guilds.cache.size.toLocaleString()}\` Servidores`
    )
    .setColor("#2f3136")

  client.users.cache.get("683555315957891149").send(embed);
};
