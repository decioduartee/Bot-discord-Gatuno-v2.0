const { MessageEmbed, MessageAttachment } = require("discord.js")
const { createCanvas, loadImage } = require('canvas')

module.exports = {
  name: 'ship',
  description: "use para chamar a policia pra um usuario",
  aliases: ["primeiraspalavras", "bebe", "pb"],
  run: async (client, message, args) => {
  
  const [ avatar1,  avatar2 ] = message.mentions.members.first(message, args[0])
  
  if(avatar1.id === message.author.id) return message.channel.send(`**${message.author.username}** Você não pode se alto shipar`)
  
  if(avatar2 === null || avatar2 === undefined) {
    
  const tu = await loadImage(avatar1.user.displayAvatarURL({ format: 'png' }))
  const eu = await loadImage(message.author.displayAvatarURL({ format: 'png' }))
    
  const love = Math.random() * 100;
  const loveIndex = Math.floor(love / 10)
  const LoveLevel = "█".repeat(loveIndex) + ".".repeat(15 - loveIndex)
  
  const canvas = createCanvas(384, 128)
  const ctx = canvas.getContext('2d');
  const heart = await loadImage('https://cdn.glitch.com/b2af5da0-94c9-46f1-8246-5198d2524e8b%2Fship%20gatuno.png?v=1596657364978')
  
  ctx.drawImage(eu, 0, 0);
  ctx.drawImage(tu, 256, 0);
  ctx.drawImage(heart, 160, 32, 64, 64);

  const embed = new MessageEmbed()
    embed.setColor("#2f3136")
      if(avatar2 === null || avatar2 === undefined) {
        embed.setDescription(`${message.author} **SUAS CHANCES COM** ${avatar1} \n\n • **É DE ${Math.floor(love)}%** \n [\`${LoveLevel}\`]`)
      } else {
        embed.setDescription(`${avatar1} **SUAS CHANCES COM** ${avatar2} \n\n • **É DE ${Math.floor(love)}%** \n [\`${LoveLevel}\`]`)
      }
      embed.attachFiles([ new MessageAttachment(canvas.toBuffer(), 'love.png') ])
      embed.setImage('attachment://love.png')
    message.channel.send(embed)
    
    } else {
      
      const tu = await loadImage(avatar2.user.displayAvatarURL({ format: 'png' }))
      const eu = await loadImage(avatar1.user.displayAvatarURL({ format: 'png' }))
    
      const love = Math.random() * 100;
      const loveIndex = Math.floor(love / 10)
      const LoveLevel = "█".repeat(loveIndex) + ".".repeat(15 - loveIndex)
  
      const canvas = createCanvas(384, 128)
      const ctx = canvas.getContext('2d');
      const heart = await loadImage('https://cdn.glitch.com/b2af5da0-94c9-46f1-8246-5198d2524e8b%2Fship%20gatuno.png?v=1596657364978')
  
      ctx.drawImage(eu, 0, 0);
      ctx.drawImage(tu, 256, 0);
      ctx.drawImage(heart, 160, 32, 64, 64);

      const embed = new MessageEmbed()
        embed.setColor("#2f3136")
          .setDescription(`${avatar1} **SUAS CHANCES COM** ${avatar2} \n\n • **É DE ${Math.floor(love)}%** \n [\`${LoveLevel}\`]`)
          .attachFiles([ new MessageAttachment(canvas.toBuffer(), 'love.png') ])
          .setImage('attachment://love.png')
      message.channel.send(embed)
    }
  }
}