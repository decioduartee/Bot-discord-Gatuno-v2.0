module.exports = (client, message) => {

    if (message.channel.type === "dm") return;
  if (message.author.bot || message.system) return;

    const { MessageEmbed } = require("discord.js");
    const firebase = require('firebase')
    const database = firebase.database()
    const { prefix } = require("../../config.json")

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
      
        const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setAuthor(`Olá ${message.author.username}`, client.user.displayAvatarURL())
          .setDescription(`Vi que você me mencionou no chat, se você estiver com duvidas..\nSem problemas estou aqui para te ajudar, se estiver com duvidas\nSobre meus comando Por Favor use **${prefix}ajuda**, qualquer outra duvida\nSobre o Servidor Por Favor entre em contato com um moderador`)
          .setFooter(`Fui mencionado por ${message.author.username}`,message.author.displayAvatarURL())
          .setTimestamp();
        message.channel.send(embed);
      }

    if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const comando = args.shift().toLowerCase();
        const cmd = client.comandos.get(comando) || client.comandos.get(client.aliases.get(comando));
        if (!cmd) return;
      
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
}