module.exports = {
    name: 'fakediscord',
    aliases: ['fakedc', "fake"],
    category: 'diversao',
    run: async (client, message, args) => {
      
        message.delete()

        const { MessageEmbed } = require('discord.js')
        const jimp = require('jimp')
        const moment  = require('moment');
        moment.locale('pt-BR')
        
        const usuarios = message.guild.member(message.mentions.users.first())
        if(!usuarios) {
          return message.reply("Mencione alguem").then(m => m.delete({ timeout: 5000 }))
        };

        const mensagem = args.slice(1).join(' ')
        if(!mensagem) {
          return message.reply("Escreva uma mensagem").then(m => m.delete({ timeout: 5000 }))
        };

         const hora = `${moment(message.createdAt).format('[Hoje às] HH:mm')}`
         
         message.channel.startTyping();

          let fonte3 = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
          let fonte = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
          let mask = await jimp.read("https://cdn.glitch.com/1d240323-0ebf-4fea-9cd7-6957397cac48%2Fmascara2.png?v=1588980748050");
          let fundo = await jimp.read("https://media.discordapp.net/attachments/708355149206388836/712535962063994931/Screenshot_3.png");
      
        jimp.read(usuarios.user.displayAvatarURL().replace(".webp", ".png?size=2048")).then(avatar => {
              avatar.resize(63, 63);
              mask.resize(63, 63);
              avatar.mask(mask);
              fundo.print(fonte, 100, 28, `${usuarios.user.username}`)
              fundo.print(fonte3, 100, 48, `${mensagem}`);
              fundo.composite(avatar, 20, 22).write("fakediscord.png");
              message.channel.send(``, {files: ["fakediscord.png"] });
          message.channel.stopTyping(true);
            })
    }
}