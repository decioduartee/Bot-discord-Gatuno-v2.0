const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "emojis",
    aliases: ["emoji"],
    description: "mostra os emojis do servidor",
    run: async (client, message, args) => {

  try {

  let notAnimated = []
  let animated = []


  message.guild.emojis.cache.forEach(async emoji => {
    if (emoji.animated) animated.push(emoji.toString())
    else notAnimated.push(emoji.toString())
  })

    if (!animated[0]) animated = ['Nenhum']
    if (!notAnimated[0]) notAnimated = ['Nenhum']

      let embed = new MessageEmbed()
          .setColor('#2f3136')
          .setDescription('Animados: ' + animated.join(' ') + '\n\nNormais: ' + notAnimated.join(' '))
        message.channel.send(embed)
    } catch (err) {
    message.channel.send('Erro :/ >' + err).catch()
    }
  }
}
