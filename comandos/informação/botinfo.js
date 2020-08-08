const Discord = require('discord.js')
const { prefix } = require("../../config.json")
const moment = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: "botinfo",
    description: "Mostra as informações do gatuno",
    aliases: ["gatuno", "gatunoinfo"],
    run: async (client, message) => {

        let dias = 0; 
        let week = 0; 
     
         let uptime = ``; 
         let totalSegundos = (client.uptime / 1000); 
         let horas = Math.floor(totalSegundos / 3600); 
         totalSegundos %= 3600; 
         let minutos = Math.floor(totalSegundos / 60); 
         let segundos = Math.floor(totalSegundos % 60); 
     
         if(horas > 23){
             dias = dias + 1;
             horas = 0; 
         }
     
         if(dias == 7){ 
             dias = 0; 
             week = week + 1; 
         }
     
         if(week > 0){ 
             uptime += `${week} week, `;
         }
     
         if(minutos > 60){ 
             minutos = 0;
         }
     
         uptime += `${dias}d ${horas}h ${minutos}m ${segundos}s`;

         let js = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"
         let node = "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"
         let github = "https://github.com"

        const embed = new Discord.MessageEmbed()
        .setThumbnail('https://cdn.discordapp.com/attachments/705905702648152144/706312549314068510/gatuno.png')
        .setAuthor('Sobre mim', client.user.displayAvatarURL())
        .setDescription(`Olá **${message.author.username}** eu me chamo ${client.user.username}, fui criado para ajudar no seu sevidor com multitarefas! sou apenas um simples bot para o Discord. Para saber mais continue lendo abaixo.. \n\n Fui desenvolvido em <:js:736012169207873646> [JavaScript](${js}) utilizando <:node:736012169220587640> [Node.js](${node}) e estou sendo atualizado nesse momento, se você quiser ver meu código-fonte (embreve estara na [GitHub](${github})) \n\n **Desenvolvedor:**\n<@683555315957891149> | \`Papito#2058\``)
        .addField('**Estatísticas:**', `• Servidores: ${client.guilds.cache.size.toLocaleString()} \n • Canais: ${client.channels.cache.size.toLocaleString()} \n • Usuários: ${client.users.cache.size.toLocaleString()} \n • Total de comandos: ${client.comandos.size.toLocaleString()}`, true)
        .addField(`**Status:**`, `• Versão: **V1.0.0** \n • Ontime: \`${uptime}\` \n • Ping: ${client.ws.ping}ms \n • Meu prefixo: **${prefix}**`, true)
        .addField("**Links importantes:**", "• [Suporte](https://discord.gg/Apu5fsa) \n • [Meu site](https://web-gatuno.glitch.me/#Inicio) \n • [Me adicione!](https://discordapp.com/oauth2/authorize?=&client_id=705189249544224849&scope=bot&permissions=8)")
        .setFooter('Gatuno © Todos Direitos Reservados', message.author.displayAvatarURL({ dynamic: true}))
        .setColor('#2f3136')
        .setTimestamp()
        message.channel.send(embed)
    }
}