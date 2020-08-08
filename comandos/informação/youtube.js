const { MessageEmbed } = require('discord.js')
const { YouTube } = require('better-youtube-api')
const youtube = new YouTube('AIzaSyD9nD6s6POz9mIBRpiGicXy7wmM8EhvPOQ')

module.exports = {
  name: "youtube",
  category:  "info",
  description: "comando para ver o canal do youtube em tempo real",
  aliases: ["yt"],
  run: async (client, message, args) => {
    
    function valores(value) {
      
      if(value <=1000){
        return value.toString()
      }
      
      const numDigits = (""+value).length
      const suffixIndex = Math.floor(numDigits/ 3)
      const normalisedValue = value / Math.pow(1000, suffixIndex);
      
      let precisao =2;
      if(normalisedValue < 1){
        precisao =1;
      }
      
      const suffixes = ["", "K", "M", "B", "T"]
      return normalisedValue.toPrecision(precisao) + suffixes[suffixIndex]
    }
    
    let canal = args[0]
    if (!canal) {
      return message.reply("Mencione um canal!")
    }
  
    const analytics = await youtube.getChannel(args.slice().join(' '));
    
    const embed = new MessageEmbed()
    .setTitle(`Informações sobre o canal ${analytics.name}`)
    .setColor(`#ff0000`)
    .setThumbnail(analytics.profilePictures.default.url)
    .setImage(analytics.banners.bannerImageUrl)
    .addField(`Quantidade de inscritos:`, `**${valores(analytics.subCount)}**`)
    .addField(`Quantidade de visualizações:`, `**${valores(analytics.views)}**`)
    .addField(`Link do canal:`, `**[${analytics.name}](${analytics.url})**`)
    .setFooter(`comando executado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true}))
    message.channel.send(embed)
  }
}