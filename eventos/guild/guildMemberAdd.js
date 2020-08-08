module.exports = async (member, message) => {
  
  const { MessageEmbed } = require("discord.js");
  const firebase = require('firebase')
  const database = firebase.database()
    
  let mensagem = await database.ref(`/Servidores/${message.guild.id}/Lobby/Bemvido/Mensagem`).once("value")
  mensagem = mensagem.val()

  let titulo = await database.ref(`/Servidores/${message.guild.id}/Lobby/Bemvido/Titulo`).once("value")
  titulo = titulo.val()

  let canais = await database.ref(`/Servidores/${message.guild.id}/Lobby/Bemvido/Canal`).once("value")
  canais = canais.val()

  let canal = message.guild.channels.cache.get(canais)

  let membro = mensagem.replace("{membro}", message.user).cacth(() => {})
  let servidor = membro.replace("{server}", message.guild.name).cacth(() => {})
  let user = servidor.replace("{membros}", message.guild.memberCount.toLocaleString()).cacth(() => {})

  const embed = new MessageEmbed()

    .setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
    .setTitle(titulo)
    .setDescription(`${user}`)
    .setColor("#2f3136");

  canal.send(embed)

  let cargo = await database.ref(`/Servidores/${message.guild.id}/Cargos/AltoRole`).once("value")
  cargo = cargo.val()

  let role = message.guild.roles.cache.get(cargo);
  if (role === undefined || role === null) {
    return console.log("Não indentifiquei o cargo");
  }

  message.roles.add(role).catch(e => {
    console.log(`erro: ${e}`);
  });
};