const { MessageEmbed } = require("discord.js");
const firebase = require('firebase')
const database = firebase.database()

module.exports = async (member, message) => {

  let mensagem = await database.ref(`/Servidores/${message.guild.id}/Lobby/Saida/Mensagem`).once("value")
  mensagem = mensagem.val()

  let titulo = await database.ref(`/Servidores/${message.guild.id}/Lobby/Saida/Titulo`).once("value")
  titulo = titulo.val()

  let canais = await database.ref(`/Servidores/${message.guild.id}/Lobby/Saida/Canal`).once("value")
  canais = canais.val()

  let canal = message.guild.channels.cache.get(canais)

  let membro = mensagem.replace("{membro}", message.user.username);
  let servidor = membro.replace("{server}", message.guild.name)
  let user = servidor.replace("{membros}", message.guild.memberCount.toLocaleString())

  const embed = new MessageEmbed()

    .setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
    .setTitle(titulo)
    .setDescription(`${user}`)
    .setColor("#2f3136");
  canal.send(embed);
};
