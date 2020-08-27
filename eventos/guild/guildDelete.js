const { MessageEmbed } = require("discord.js");
const firebase = require('firebase')
const database = firebase.database()

module.exports = async (client, guild) => {
  let embed = new MessageEmbed()
    .setAuthor(`Fui removido de um servidor`, client.user.displayAvatarURL())
    .setThumbnail(guild.iconURL({ format: "png", size: 2048, dynamic: true }))
    .addField(`**Servidor**`, guild.name, true)
    .addField(`**Dono**`, `${guild.owner} | ${guild.owner.user.username}` , true)
    .addField(`**ID**`, `${guild.id}`, true)
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
    .addField(
      `**CANAIS**`,
      `• Total de canais ${
        guild.channels.cache.size.toLocaleString()
      }\n • Canais de voz ${
        guild.channels.cache.filter(channel => channel.type == "voice").size
      }\n • Canais de Mensagem ${
        guild.channels.cache.filter(channel => channel.type == "text").size
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

  setTimeout(function(){
    database.ref(`/Servidores/${guild.id}`).remove(); 
  }, 1000);
};

const { MessageEmbed } = require('discord.js');
