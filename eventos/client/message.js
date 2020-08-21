module.exports = (message) => {
    const firebase = require('firebase')
    const database = firebase.database()
    const jimp = require("jimp");
    
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