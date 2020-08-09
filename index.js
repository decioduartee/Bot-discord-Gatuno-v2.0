const express = require("express");
const http = require("http")
const app = express();

app.use(express.static("public"))
app.get("/", (request, response) => {
  response.sendStatus(200)
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
});

const listener = app.listen(process.env.PORT, function() {})
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 270000)

//app.listen(process.env.PORT); // Recebe solicitações que o deixa online
  
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const jimp = require("jimp");
const firebase = require("firebase");
const db = require(`quick.db`);
const Constants = require("discord.js/src/util/Constants.js");
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;

const client = new Discord.Client(
  { partials: ["MESSAGE", "CHANNEL", "REACTION"] },
  new Discord.Client({
    disableEveryone: true
  })
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





client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  const serverQueue = oldMember.client.queue.get(oldMember.guild.id);


  if(oldUserChannel === undefined && newUserChannel !== undefined) {
      // User joines a voice channel
  } else if(newUserChannel === undefined){

    // User leaves a voice channel
      if(oldMember.id === '705189249544224849'){
          return console.log("BOT");
      } else {
          if(client.guilds.cache.get(oldMember.guild.id).voiceConnection != null){
              if(client.guilds.cache.get(oldMember.guild.id).voiceConnection.channel.id === oldUserChannel.id){
                    if(oldUserChannel.members.cache.size < 2){
                        serverQueue.songs = [];
                        serverQueue.connection.dispatcher.end()
                      
                    }    
          }else{
            return console.log();
          }
        }else{
          return undefined;
      }
    }
  }
})







client.on("message", async message => {
  if (message.author.bot) return;

 //___________________________________Modo afk_____________________________

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
  
//____________________Quando alguem menciona o bot__________________________

  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {

    const embed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(`Olá ${message.author.username}`, client.user.displayAvatarURL())
      .setDescription(`Vi que você me mencionou no chat, se você estiver com duvidas..\nSem problemas estou aqui para te ajudar, se estiver com duvidas\nSobre meus comando Por Favor use **${prefix}ajuda**, qualquer outra duvida\nSobre o Servidor Por Favor entre em contato com um moderador`)
      .setFooter(`Fui mencionado por ${message.author.username}`,message.author.displayAvatarURL())
      .setTimestamp();
    message.channel.send(embed);
  }

//____________________________Sistemna de level_______________________________________

  //comando para o bot não responder dm's
  if (message.author.bot && message.guild) return;
  if (message.channel.type === "dm") return;

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
            level: 10,
            cats: 1000
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

//_______________________________final do comando de level___________________

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let comando = client.comandos.get(cmd);
  if (!comando) comando = client.comandos.get(client.aliases.get(cmd));

  if (comando) {
    comando.run(client, message, args, database);
  } else {
    message.react("🔍");
    message.delete({ timeout: 40000 });

    message
      .reply({
        embed: {
          color: "#2f3136",
          description: `<:listadecomandos:706682302989860876> Chequei meus comandos e não encontrei \`${prefix}${cmd}\` Por Favor use \`${prefix}ajuda\`` //+ err.message
        }
      })
      .then(message => message.delete({ timeout: 40000 }));
  }
});

//----------------------------------------------------------------------------------

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) {
    return;
  }

  let EditEmbed = new Discord.MessageEmbed()
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

//-----------------------------------------------------------------------------------

client.on("messageDelete", async (message, channel) => {

  let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalLog`).once(`value`)
  canais = canais.val()

  let DeleteEmbed = new Discord.MessageEmbed()
    .setAuthor(`Mensagem Deletada`, message.guild.iconURL({dynamic: true}))
    .setColor("#2f3136")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`Registro de mensagens deletadas por ${message.author}. \n\n **• Informações** \n ▪︎ **Mensagem Deletada**: ${message} \n ▪︎ **No canal**: ${message.channel} \n ▪︎ **Servidor**: ${message.guild.name}`)

  const canal = message.guild.channels.cache.get(canais);
    if (!canal) return;
  canal.send(DeleteEmbed);
});

//-----------------------------------------------------------------------------------

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

client.login(process.env.token);
