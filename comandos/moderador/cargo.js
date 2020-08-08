const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "cargo",
        aliases: ['rolemembers', 'role'],
        category: "info",
        description: "Mostra a lista de membros com função",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO VER O CARGO** \n\n • Você não tem a permissão \`MANAGE_MESSAGES\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
          return;
          }
      
          if (!message.guild.me.hasPermission("MANAGE_MESSAGES")){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO VER O CARGO** \n\n • Eu não tenho a permissão \`MANAGE_MESSAGES\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
          return;
          }

        if (args.includes("@everyone")) return message.channel.send(`${message.author}, **Você não pode mencionar este cargo**`);
        
        if (args.includes("@here")) return message.channel.send(`${message.author}, **Você não pode mencionar este cargo**`);

        if (!args[0]) return message.channel.send("**Digite uma função!**")

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.channel.send("**Digite uma função válida!**");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user;
        })
        if (membersWithRole > 2048) return message.channel.send('**A lista é muito longa!**')

        let roleEmbed = new MessageEmbed()
            .setColor(0x333333)
            .setThumbnail(message.guild.iconURL({ dynamic: true}))
            .setTitle(`Usuários com o cargo ${role.name}`)
            .setDescription(membersWithRole.join("\n"));
        message.channel.send(roleEmbed);
    }
}