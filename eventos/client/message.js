module.exports = async (client, message ) => {

    const firebaseConfig = {
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


    const { MessageEmbed } = require("discord.js")
    const { prefix } = require("../../config.json");

    if (message.author.bot || message.system) return null;
    if (!message.content.startsWith(prefix)) return null;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    const cmd = client.comandos.get(comando) || client.comandos.get(client.aliases.get(comando));
    if (!cmd) return null;

    cmd.run(client, message, args, database);

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {

    const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setAuthor(`Olá ${message.author.username}`, client.user.displayAvatarURL())
        .setDescription(`Vi que você me mencionou no chat, se você estiver com duvidas..\nSem problemas estou aqui para te ajudar, se estiver com duvidas\nSobre meus comando Por Favor use **${prefix}ajuda**, qualquer outra duvida\nSobre o Servidor Por Favor entre em contato com um moderador`)
        .setFooter(`Fui mencionado por ${message.author.username}`,message.author.displayAvatarURL())
        .setTimestamp();
    message.channel.send(embed);
    }
}