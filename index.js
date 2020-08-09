const Discord = require("discord.js");
const firebase = require("firebase");
const db = require(`quick.db`);
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
  
});

client.login(process.env.token);
