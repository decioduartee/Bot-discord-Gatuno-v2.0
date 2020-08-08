const { Discord, MessageEmbed, MessageAttachment } = require("discord.js");
const jimp = require("jimp");

module.exports = {
  name: "level",
  description: "Usado para mostrar seu level ou o level de um membro",
  aliases: ["level", "l", "lvl"],
  run: async (client, message, args, database) => {
    
    const db = require("quick.db")
    const ms = require('parse-ms')
    const timeout = 14000;
    
    let tempo = await db.get(`ltempo_${message.guild.id}_${message.author.id}`)
    if (tempo !== null && timeout - (Date.now() - tempo) > 0) {
     let time = ms(timeout - (Date.now() - tempo));
        message.channel.send(`${message.author}, **o comando tem um tempo de espera, aguarde** \`${time.seconds}s\``); 
      return;
    } else {
    
    let xp = "";
    let cats = "";
    let level = "";
      
    const usuarios = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author)  || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) 

    database
      .ref(`Servidores/${message.guild.id}/Levels/${usuarios.user.id}`)
      .once("value")
      .then(async function(snap) {
        if (snap.val() == null) {
          database
            .ref(`Servidores/${message.guild.id}/Levels/${usuarios.user.id}`)
            .set({
              xp: 0,
              level: 1,
              cats: 0
            });

          let embed = new MessageEmbed()
           .setColor("#2f3136")
           .setDescription("**Interaja com o servidor para ganhar XP e Pontos**")
          message.channel.send(embed)
        } else {
          
          cats = snap.val().cats;
          let xp = snap.val().xp;
          let level = snap.val().level;
          let quantoFalta = level * 1000;
          let falta = quantoFalta - xp;
          database
            .ref(`Servidores/${message.guild.id}/Levels/${usuarios.user.id}`)
            .update({
              cats: cats,
              xp: xp,
              level: level
            });

          let fonte = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);
          let fonte2 = await jimp.loadFont(jimp.FONT_SANS_10_BLACK);
          let fonte3 = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
          let mask = await jimp.read("https://cdn.glitch.com/1d240323-0ebf-4fea-9cd7-6957397cac48%2Fmascara2.png?v=1588980748050");
          let fundo = await jimp.read("https://cdn.glitch.com/1d240323-0ebf-4fea-9cd7-6957397cac48%2Ffundo2.png?v=1588980793916");
          
          jimp.read(usuarios.user.displayAvatarURL({dynamic: true }).replace(".webp", ".png?size=2048")).then(avatar => {
              avatar.resize(130, 130);
              mask.resize(130, 130);
              avatar.mask(mask);
              fundo.print(fonte, 487, 42, `Level Atual`);
              fundo.print(fonte, 513, 81, `${level}`);
              fundo.print(fonte, 244, 57, `Cats ${cats.toLocaleString()}`);
              fundo.print(fonte2, 432, 119,`falta ${falta} XP / Proximo level`);
              fundo.print(fonte3, 255, 99, `${usuarios.user.tag}`);
              fundo.composite(avatar, 38, 23).write("level.png");
              message.channel.send(``, { files: ["level.png"] });
            });
          }
        });
      }
    db.set(`ltempo_${message.guild.id}_${message.author.id}`, Date.now())  
  }
};