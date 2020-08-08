  
const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
        name: "kick",
        category: "moderation",
        description: "Kicks the user",
        accessableby: "Administrator",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: ["k"],
    run: async (client, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não tem a permisão \`KICK_MEMBERS\``)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }
    
            if (!message.guild.me.hasPermission("  KICK_MEMBERS")){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nEu não tenho a permissão \`   KICK_MEMBERS\``)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            if (!args[0]){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nPor favor mencione um membro para kickar!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nEsse membro não está no servidor!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            if (kickMember.id === message.member.id){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nVocê não pode se kickar!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            if (!kickMember.kickable){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nNão é possivel kickar esse membro`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }
            if (kickMember.user.bot){
                const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nNão é possivel kickar bots do servidor`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
              message.channel.send(embed)
            return;
            }

            var reason = args.slice(1).join(" ");
            try {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setThumbnail(message.guild.iconURL())
                    .setDescription(`Olá, infelizmente você caba de ser kickado`)
                    .addField('Servidor', `${message.guild.name}`)
                    .addField("Moderador responsavel", message.author)
                    .addField('Motivo', `${reason || "Nenhum motivo definido"}`)
                    .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                    .setTimestamp()
                kickMember.send(embed).then(() =>
                kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }

            let canais = await database.ref(`Servidores/${message.guild.id}/Canais/CanalPunição`).once('value');
            canais = canais.val()

            if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${kickMember.user} Foi kickado com sucesso! Veja o motivo em <#${canais}>`)
                message.channel.send(sembed);
            } else {
                const sembed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${kickMember.user} Foi kickado com sucesso!`)
                message.channel.send(sembed);
            }

            const embed = new MessageEmbed()
                .setTimestamp()
                .setColor("#2f3136")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .setAuthor(`${message.guild.name} Puni`, message.guild.iconURL())
                .addField("**Comando usado**", "kick")
                .addField("**Membro kickado**", `${kickMember.user}`)
                .addField("**ID Do Membro**", `${kickMember.user.id}`)
                .addField("**Moderador responsavel**", `${message.author}`)
                .addField("**Motivo**", `${reason || "**Nenhum motivo definido**"}`)
            const canal = message.guild.channels.cache.get(canais)
            canal.send(embed)
        } catch (e) {
            return console.log(e)
        }
    }
}