module.exports = async (client, message ) => {

    //eventos com mensagem estão aqui
    
    const firebase = require('firebase')
    const database = firebase.database()
    const { MessageEmbed } = require("discord.js")
    const jimp = require("jimp");

    //____________________________________________________________________________

    client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) {
      return;
    }
  
    let EditEmbed = new MessageEmbed()
      .setAuthor(`Mensagem Editada`, newMessage.guild.iconURL({dynamic: true}))
      .setColor("#2f3136")
      .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Registro de mensagens editadas por ${oldMessage.author}. \n\n **• Informações** \n ▪︎ **Antes**: ${oldMessage.content} \n ▪︎ **Depois**: ${newMessage.content} \n ▪︎ **No canal**: ${newMessage.channel} \n ▪︎ **Servidor**: ${newMessage.guild.name}`);
  
    let canais = await database.ref(`Servidores/${newMessage.guild.id}/Canais/CanalLog`).once('value')
    canais = canais.val()
  
    const canal = newMessage.guild.channels.cache.get(canais)
    if (!canal) return;
    canal.send(EditEmbed);
  })

  //____________________________________________________________________________

  client.on("messageDelete", async (message, channel) => {

    let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalLog`).once(`value`)
    canais = canais.val()
  
    let DeleteEmbed = new MessageEmbed()
      .setAuthor(`Mensagem Deletada`, message.guild.iconURL({dynamic: true}))
      .setColor("#2f3136")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Registro de mensagens deletadas por ${message.author}. \n\n **• Informações** \n ▪︎ **Mensagem Deletada**: ${message} \n ▪︎ **No canal**: ${message.channel} \n ▪︎ **Servidor**: ${message.guild.name}`)
  
    const canal = message.guild.channels.cache.get(canais);
      if (!canal) return;
    canal.send(DeleteEmbed);
  })

  //____________________________________________________________________________

  client.on("guildMemberUpdate", async (oldMember, newMember) => {
  
    let canais = await database.ref(`Servidores/${newMember.guild.id}/Canais/CanalLog`).once(`value`)
    canais = canais.val()
  
    const canal = newMember.guild.channels.cache.get(canais);
    if (!canal) return;
  
    let membros = [oldMember.nickname, newMember.nickname];
  
    if (membros[0] == null) 
    {
      membros[0] = oldMember.user.username;
    }
    if (membros[1] == null) 
    {
      membros[1] = newMember.user.username;
    }
  
    if (oldMember.nickname != newMember.nickname) 
    {
      let ApelidoEmbed = new Discord.MessageEmbed()
        .setAuthor(`Apelido alterado`, newMember.guild.iconURL({ dynamic: true }))
        .setColor("#2f3136")
        .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Registro de apelidos alterados por ${newMember}. \n\n **• Informações** \n ▪︎ **Antes**: ${membros[0]} \n ▪︎ **Depois**: ${membros[1]} \n ▪︎ **Servidor**: ${newMember.guild.name}`);
      canal.send(ApelidoEmbed);
    }
  })

  //____________________________________________________________________________

  let xp = "";
  let cats = "";
  let nextlevel = "";
  let pontosXp = Math.floor(Math.random() * 7) + 8;
  let pontosCat = Math.floor(Math.random() * 7) + 5;

database
.ref(`Servidores/${message.guild.id}/Levels/${message.author.id}`)
.once("value")
.then(async function(snap) {
  if (snap.val() == null) {
    database
      .ref(`Servidores/${message.guild.id}/Levels/${message.author.id}`)
      .set({
        xp: 0,
        level: 1,
        cats: 0
      });
  } else {
    cats = snap.val().cats + pontosCat;
    xp = snap.val().xp + pontosXp;
    nextlevel = snap.val().level * 1000;

    database
      .ref(`Servidores/${message.guild.id}/Levels/${message.author.id}`)
      .update({
        cats: cats,
        xp: xp
      });
    if (nextlevel <= xp) {
      nextlevel = snap.val().level + 1;
      database
        .ref(`Servidores/${message.guild.id}/Levels/${message.author.id}`)
        .update({
          level: nextlevel
        });

      let fonte = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);
      let fonte2 = await jimp.loadFont(jimp.FONT_SANS_10_BLACK);
      let fonte3 = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
      let mask = await jimp.read("https://cdn.glitch.com/1d240323-0ebf-4fea-9cd7-6957397cac48%2Fmascara.png?v=1588971802782");
      let fundo = await jimp.read("https://cdn.glitch.com/1d240323-0ebf-4fea-9cd7-6957397cac48%2Ffundo.png?v=1588971803012");

      jimp.read(message.author.displayAvatarURL().replace(".webp", ".png?size=2048"))
        .then(async avatar => {
        
          let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalLevel`).once('value')
          canais = canais.val()
        
          avatar.resize(130, 130);
          mask.resize(130, 130);
          avatar.mask(mask);
          fundo.print(fonte, 487, 42, `Novo level`);
          fundo.print(fonte, 513, 81, `${nextlevel}`);
          fundo.print(fonte2, 495, 119, `nivel completo!`);
          fundo.print(fonte3, 255, 99, `${message.author.tag}`);
          fundo.composite(avatar, 38, 23).write("level.png");
          let canal = message.guild.channels.cache.get(canais)
          canal.send(``, { files: ["level.png"] })
        });
      }
    }
  });
}