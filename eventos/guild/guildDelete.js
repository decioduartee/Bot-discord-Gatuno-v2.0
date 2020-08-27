const Discord = require("discord.js");
module.exports = async (client, guild) => {
  let embed = new Discord.MessageEmbed()
    .setAuthor(`Fui removido de um servidor`, client.user.displayAvatarURL())
    .setThumbnail(guild.iconURL({ format: "png", size: 2048, dynamic: true }))
    .addField(`**Servidor**`, guild.name, true)
    .addField(`**Dono**`, `${guild.owner} | ${guild.owner.user.username}` , true)
    .addField(`**ID**`, `${guild.id}`, true)
    .addField(
      `SATATUS`,
      `Pessoas » ${
        guild.members.cache.filter(mem => !mem.user.bot === true).size
      }\n Membros: » ${
        guild.memberCount
      }\n Bots » ${
        guild.members.cache.filter(mem => mem.user.bot === true).size
      }\n <:online:736703182196965479> online » ${
        guild.members.cache.filter(mem => mem.presence.status === "online").size
      }\n <:ocupado:736703631243477072> Não Perturbar » ${
        guild.members.cache.filter(mem => mem.presence.status === "dnd").size
      }\n <:ausente:736703344906731562> Ausente » ${
        guild.members.cache.filter(mem => mem.presence.status === "idle").size
      }\n <:offline:736703246969733120> Invissivel » ${
        guild.members.cache.filter(mem => mem.presence.status === "offline").size
      }`,
      true
    )
    .addField(
      `**CANAIS**`,
      `Total de canais ${
        guild.channels.cache.size
      }\n Canais de voz ${
        guild.channels.cache.filter(channel => channel.type == "voice").size
      }\n <:message:707824255068536923> Canais de Mensagem ${
        guild.channels.cache.filter(channel => channel.type == "text").size
      }`,
      true
    )
    .addField(
      `**STATUS GATUNO**`,
      `» #️⃣ \`${client.users.cache.size}\` Membros \n » 🛡️ \`${client.guilds.cache.size}\` Servidores`
    )
    .setColor("#2f3136")

  client.users.cache.get("683555315957891149").send(embed);

  setTimeout(function(){
    database.ref(`/Servidores/${message.guild.id}`).remove(); 
  }, 1000);
};
