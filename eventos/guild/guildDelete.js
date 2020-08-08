const Discord = require("discord.js");
module.exports = async (client, guild) => {
  let embed = new Discord.MessageEmbed()
    .setAuthor(`Fui removido de um servidor`, client.user.displayAvatarURL())
    .setThumbnail(guild.iconURL())
    .addField(`<:servidor:707831809102184540> **Servidor**`, guild.name, true)
    .addField(`<:gatuno:706278203559247952> **Dono**`, guild.owner, true)
    .addField(`<:iid:707829912689704962> **ID**`, `${guild.id}`, true)
    .addField(
      `<:membros:707819398601375777> **Membros: ${guild.memberCount}**`,
      `<:pessoas:707821644252446742> Pessoas » ${
        guild.members.cache.filter(mem => !mem.user.bot === true).size
      }\n <:bot:707823206425428018> Bots » ${
        guild.members.cache.filter(mem => mem.user.bot === true).size
      }\n 🟢 online » ${
        guild.members.cache.filter(mem => mem.presence.status === "online").size
      }\n 🔴 Não Perturbar » ${
        guild.members.cache.filter(mem => mem.presence.status === "dnd").size
      }\n 🟡 Ausente » ${
        guild.members.cache.filter(mem => mem.presence.status === "idle").size
      }\n🟣 Stream » ${
        guild.members.cache.filter(mem => mem.presence.status === "strem").size
      }\n ⚫ Invissivel » ${
        guild.members.cache.filter(mem => mem.presence.status === "offline")
          .size
      }`,
      true
    )
    .addField(
      `🗳️ **Total de canais ${guild.channels.cache.size}**`,
      `<:som:707824194490204220> Canais de voz ${
        guild.channels.cache.filter(channel => channel.type == "voice").size
      }\n <:message:707824255068536923> Canais de Mensagem ${
        guild.channels.cache.filter(channel => channel.type == "text").size
      }`,
      true
    )
    .addField(
      `**Agora Tenho Um Total De**`,
      `» #️⃣ \`${client.users.cache.size}\` Membros\n » 🛡️ \`${client.guilds.cache.size}\` Servidores`
    )
    .setColor("#206694");

  client.users.cache.get("683555315957891149").send(embed);
};
