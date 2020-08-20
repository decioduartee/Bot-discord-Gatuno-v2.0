const Discord = require("discord.js");
const firebase = require("firebase");
const db = require(`quick.db`);
const { MessageEmbed } = require("discord.js")
const { prefix } = require("./config.json")
const jimp = require("jimp");
//const Constants = require("discord.js/src/util/Constants.js");
//Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;

const client = new Discord.Client(
  { partials: ["MESSAGE", "CHANNEL", "REACTION"] },
  new Discord.Client({ disableEveryone: true })
);

var firebaseConfig = {
  apiKey: "AIzaSyCvameiSh9UygMOBgckn9jpVDYnyLbRcz0",
  authDomain: "gatuno-bot.firebaseapp.com",
  databaseURL: "https://gatuno-bot.firebaseio.com",
  projectId: "gatuno-bot",
  storageBucket: "gatuno-bot.appspot.com",
  messagingSenderId: "169162698827",
  appId: "1:169162698827:web:f4e3848d74805a3bac9dce",
  measurementId: "G-1N2TPXXEGL"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

client.comandos = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();
client.eventos = new Map();

["comando", "eventos"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  
  if (message.channel.type === "dm") return null;
  if (message.author.bot || message.system) return null;

 //__________________________________Modo afk____________________________

  const afk = new db.table("AFKs"),
    mentioned = await message.mentions.members.first();
  if (mentioned) {
    let status = await afk.get(mentioned.id);

    if (status) {
      const embed = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:certo:736447597102760007> **| MODO AFK ATIVADO** \n\n ${mentioned.user} Está em modo **AFK**\n\n**Lembrete**:\n\`\`\`fix\n${status}\`\`\``)
        .setThumbnail(mentioned.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
        .setTimestamp()
        .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
      message.channel.send(embed).then(i => i.delete({ timeout: 50000 }));
    }
  }
  
//_____________________________comando de anti invites___________________

    let blockinvite = await database.ref(`Servidores/${message.guild.id}/Defesa/Blockinvite`).once('value')
    
    blockinvite = blockinvite.val()

    if(blockinvite === "on") {

    let Link = ["discord.gg", "discord.com/invite", "discordapp.com/invite"];
  
      if (Link.some(word => message.content.toLowerCase().includes(word))) {
      await message.delete();

    let embed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription("**Por favor respeite as regas**! não mande convites neste servidor")
    return message.channel.send(embed).then(m => m.delete({timeout: 10000}))
      }
    }

    //______________________________________________________________________

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

  //______________________________________________________________________

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
      
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setAuthor(`Olá ${message.author.username}`, client.user.displayAvatarURL())
        .setDescription(`Vi que você me mencionou no chat, se você estiver com duvidas..\nSem problemas estou aqui para te ajudar, se estiver com duvidas\nSobre meus comando Por Favor use **${prefix}ajuda**, qualquer outra duvida\nSobre o Servidor Por Favor entre em contato com um moderador`)
        .setFooter(`Fui mencionado por ${message.author.username}`,message.author.displayAvatarURL())
        .setTimestamp();
      message.channel.send(embed);
    }
  
  //______________________________________________________________________
  

    client.on("messageUpdate", async (oldMessage, newMessage) => {
      if (oldMessage.content === newMessage.content) {
        return;
      }
    
      let EditEmbed = new MessageEmbed()
        .setAuthor(`Mensagem Editada`, newMessage.guild.iconURL({dynamic: true}))
        .setColor("#2f3136")
        .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Registro de mensagens editadas por ${oldMessage.author}. \n\n **• Informações** \n ▪︎ **Antes**: ${oldMessage.content} \n ▪︎ **Depois**: ${newMessage.content} \n ▪︎ **No canal**: ${newMessage.channel} \n ▪︎ **Link da mensagem:** [link](${newMessage.url}) \n ▪︎ **Servidor**: ${newMessage.guild.name}`);
    
      let canais = await database.ref(`Servidores/${newMessage.guild.id}/Canais/CanalLog`).once('value')
      canais = canais.val()
    
      const canal = newMessage.guild.channels.cache.get(canais)
      if (!canal) return;
      canal.send(EditEmbed);
  })
  
    //______________________________________________________________________

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
      return canal.send(DeleteEmbed);
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

    if (!message.content.startsWith(prefix)) return null;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    const cmd = client.comandos.get(comando) || client.comandos.get(client.aliases.get(comando));
    if (!cmd) return null;
  
    cmd.run(client, message, args, database);
  
    if (message.guild && !message.channel.permissionsFor(message.guild.me).has(cmd.botPerm, {checkAdmin: true})) {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:errado:736447664329326613> **| ERRO AO EXECUTAR O COMANDO**`)
        .addField(`• **Informações:**`, [
          "• **Mensagem:** Eu preciso de permissões para funcionar corretarmente",
          `• **Permissões:** \`${cmd.botPerm.join('`, `')}\``,
        ])
        .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed)
    };
    if (message.guild && message.guild.ownerID !== message.member.id && !message.channel.permissionsFor(message.member).has(cmd.userPerm, {checkAdmin: true})) {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`<:errado:736447664329326613> **| ERRO AO EXECUTAR O COMANDO**`)
        .addField(`• **Informações:**`, [
          "• **Mensagem:** Você precisa de permissões para executar esse comando",
          `• **Permissões:** \`${cmd.userPerm.join('`, `')}\``,
        ])
        .setFooter(`Atenciosamente, ${message.client.user.username}`, message.client.user.displayAvatarURL());
      return message.channel.send(embed) 
    };

});

client.login(process.env.token);
