const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
        name: "unmute",
        aliases: ["um"],
        description: "use para desmutar um mebro no discord!",
        usage: "[nome | nickname | mention | ID] <motivo> (optional)",
        accessableby: "Administrator",
        category: "moderação",
        userPerm: ["MANAGE_GUILD"],
        botPerm: ["MANAGE_GUILD"],
    run: async (client, message, args) => {

        if (!args[0]){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nPor favor mencione um membro!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee){
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nPor favor mencione um membro valido para ser desmutado!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.get(`cargomute_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.get(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole){
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:error:715218174215323691> **| ERRO**\nEsse membro não tem o cargo ${db.get(`cargomute_${message.guild.id}`)} para remover!`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
          message.channel.send(embed)
        return;
        }
        if (!mutee.roles.cache.has(muterole.id)) {
            const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`<:error:715218174215323691> **| ERRO**\nEsse membro não está mutado!`)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }
        try {
        mutee.roles.remove(muterole.id).then(() => {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`Olá, você acaba de ser Desmutado`)
                .addField('Servidor', `${message.guild.name}`)
                .addField("Moderador responsavel", message.author)
                .addField('Motivo', `${reason || "Nenhum motivo definido"}`)
                .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp()
            mutee.send(embed).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
            return;
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            const sembed = new MessageEmbed()
                .setColor("#206694")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`${mutee.user} Desmutado com sucesso.`)
            message.channel.send(sembed);
        

        let channel = db.get(`punichannel_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#2f3136")
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Puni`, message.guild.iconURL())
            .addField("**Comando usado**", "unmute")
            .addField("**Membro desmutado**", mutee.user)
            .addField("**Moderador Responsavel**", message.author)
            .addField("**Motivo**", `${reason || "**Nenhum motivo definido**"}`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()

        const sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)

    }
}