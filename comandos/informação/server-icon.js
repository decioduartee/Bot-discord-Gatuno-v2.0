module.exports = {
    name: "server-icon",
    aliases: ["servericon"],
    category: "diversão",
    run: async (client, message, args) => {
        const { MessageEmbed } = require('discord.js')

        const embed = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`clique **[aqui](${message.guild.iconURL({ format: "png", size: 2048, dynamic: true })})** para baixar`)
        .setImage(message.guild.iconURL({ format: "png", size: 2048, dynamic: true }))
        .setFooter(`Icone de: ${message.guild.name}`)
        message.channel.send(embed)
    }
}