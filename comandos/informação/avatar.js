const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "avatar",
    description: "Comando ajuda mostra todos os comandos do bot",
    usage: "avatar",
    cooldown: 5,
    run: async (client, message, args) => {

      let membro = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        
      const avatarEmbed = new MessageEmbed()
        .setDescription(`clique **[aqui](${membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true })})** para baixar`)
        .setColor("#2f3136")
        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
        .setFooter(`Foto de @${membro.user.username}`)
        .setTimestamp()
        .setImage(membro.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
      message.channel.send(avatarEmbed).then(msg => {
        msg.react(':lixeira:707833140953219134').then( r => {
      
      const apagarFilter = (reaction, user) => reaction.emoji.id === '707833140953219134' && user.id === message.author.id;
      const apagar = msg.createReactionCollector(apagarFilter, { time: 60000 });
      
        apagar.on('collect', r => {
          msg.delete()
            const embed = new MessageEmbed()
              .setColor("#2f3136")
              .setDescription("<:certo:736447597102760007> **| Avatar apagado com sucesso!**")
          message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }))
        })
      })
    })
  }
}