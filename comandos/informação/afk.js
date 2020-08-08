module.exports = {
    name: "afk",
    description: "usa pra ficar afk",
    usage: "afk <mensagem>",
    category: "ulteis",
    run: async (client, message, args) => {
        const { MessageEmbed } = require('discord.js')
        const db = require('quick.db')
        const status = new db.table("AFKs");
        let afk = await status.fetch(message.author.id);
            
        if (!afk) {
            const embed = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`<:certo:736447597102760007> **| MODO AFK ATIVADO** \n\n ${message.author}, Agora você está em modo AFK. \n\n **Lembrete:** \n \`\`\`fix\n${args.join(" ") ? args.join(" ") : 'modo AFK'}\`\`\``)
                .setThumbnail(message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
                .setTimestamp()
                .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
                status.set(message.author.id, args.join(" ") || `modo AFK`);
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setDescription(`<:certo:736447597102760007> **| VOCÊ NÃO ESTÁ MAIS EM MODO [ AFK ]**`)
                .setColor('#2f3136')
                status.delete(message.author.id);
            message.channel.send(embed)
        }
    }
}