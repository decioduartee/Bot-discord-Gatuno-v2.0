  
const { MessageEmbed } = require("discord.js");

module.exports = {
        name: "addrole",
        aliases: ["ar"],
        description: "Adds role to a user",
        category: "moderation",
        usage: "[name | nickname | mention | ID] <role>",
        accessableby: "Administrator",
    run: async (client, message, args, database) => {

        if (!message.member.hasPermission("ADMINISTRATOR")){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Você não tem a permissão \`ADIMINISTRADOR\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (!message.guild.me.hasPermission("ADMINISTRATOR")){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Eu não tenho a permissão \`ADIMINISTRADOR\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        } 
        
        if (!args[0]){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Me informe o cargo a ser adicionado ao membro`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Mencione um membro que desejá adicionar esse cargo`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Não é possível adicionar o cargo a este usuário!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Me informe o cargo a ser adicionado ao membro`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (!role){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Esse cargo não existe ou você escreveu errado, Por favor verifique`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (role.managed){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • Não é possível adicionar o cargo a este usuário!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • A função atualmente é superior a mim, portanto, não é possível adicioná-la ao usuário!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (rMember.roles.cache.has(role.id)){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:errado:736447664329326613> **| ERRO AO ADICIONAR O CARGO** \n\n • O mebro já possui este cargo`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        var sembed = new MessageEmbed()
            .setColor("#2f3136")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`O Cargo ${role} Foi adicionado há ${rMember.user}`)
        message.channel.send(sembed)

        let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalPunição`).once('value');
        canais = canais.val()

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
            .setColor("#2f3136")
            .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Comando usado**", "addrole")
            .addField("**Quem recebeu o Cargo**", rMember.user)
            .addField("**Cargo adicionado**", role)
            .addField("**Moderador responsavel**", message.author)
            .setTimestamp();

        let canal = message.guild.channels.cache.get(canais)
        if (!canal) return;
        canal.send(embed)
    }
};