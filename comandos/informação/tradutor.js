module.exports = {
  name: "traduzir",
  description: "use para traduzir uma mensagem",
  aliases: ["t", "tradutor"],
  run: async (client, message, args, database) => {

  const translate = require('@vitalets/google-translate-api');
  const { MessageEmbed } = require('discord.js');
  let langs = {
    "auto": "Automatico",
    "ar": "Arabe",
    "nl": "Holandes",
    "eng": "Inglês",
    "en": "Inglês",
    "fr": "Frances",
    "de": "Alemão",
    "el": "Grego",
    "it": "Italiano",
    "ja": "Japones",
    "jw": "Javanes",
    "kn": "Kannada",
    "ko": "Coreano",
    "pt": "Português",
    "ro": "Romano",
    "ru": "Russo",
    "es": "Espanhol"
}
 
  if (!args[0]) {
    let embed = new MessageEmbed()
    .setColor('#206694')
    .setTitle(`Me parece que você não sabe usar esse comando`)
    .setDescription(`\`\`\`
Vou te ajudar, é bem simples vá para a proxima pagina.\`\`\``)
    .setFooter('reaja com o emoji abaixo')
    message.channel.send({ embed }).then(async msg => {
      await msg.react('▶️')
      const avançarfilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;
      const avançarrfilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
      const finalfilter = (reaction, user) => reaction.emoji.name === '⏭️' && user.id === message.author.id;
      const apagarfilter = (reaction, user) => reaction.emoji.id === '707833140953219134' && user.id === message.author.id;

      const avançar = msg.createReactionCollector(avançarfilter)
      const avançarr = msg.createReactionCollector(avançarrfilter)
      const final = msg.createReactionCollector(finalfilter)
      const apagar = msg.createReactionCollector(apagarfilter, { timeout: 900000 })

      avançar.on('collect', r => {
        r.users.remove(message.author.id);
        embed = new MessageEmbed()
        .setColor('#206694')
        .setTitle(`Definindo a linguagem`)
        .setDescription(`\`\`\`
Primeiro:

defina a linguagem para qual eu devo traduzir a mensagem 
Depois escreva a linguagem em qual a mensagem foi escrita.

Se você não souber tudo bem, você pode definir como "auto" 
assim eu poderei pesquisar a linguagem em meu banco de dados.\`\`\``)
        .setFooter(`vá para a proxima pagina para ver minha lista de linguagem`)
        msg.edit(embed);
        msg.reactions.removeAll()
        msg.react('⏩') 
      })

      avançarr.on('collect', r2 => {
        r2.users.remove(message.author.id);
        embed = new MessageEmbed()
        .setColor('#206694')
        .setTitle(`Linguagens do meu banco de dados`)
        .setDescription(`\`\`\`
Segundo:

Escolha uma das minhas linguagens para definir na mensagem

auto  =   Automatic
ar    =   Arabe
nl    =   Holandes
en    =   Inglês
fr    =   Frances
de    =   Alemão
el    =   Grego
it    =   Italiano
ja    =   Japones
jw    =   Javanes
kn    =   Kannada
ko    =   Coreano
pt    =   Portugues
ro    =   Romano
ru    =   Russo
es    =   Espanhol\`\`\``)
        .setFooter(`Vá para a proxima pagina`)
        msg.edit(embed);
        msg.reactions.removeAll()
        msg.react('⏭️') 
      })

      final.on('collect', r3 => {
        r3.users.remove(message.author.id);
        embed = new MessageEmbed()
        .setColor('#206694')
        .setTitle(`Ultimo exemplo`)
        .setDescription(`\`\`\`
.traduzir "como não sei a linguagem 
vou definir como 'auto' e vou traduzir
para o português então vou definir 'pt'
por ultimo vou colocar a mensagem 'Hello World'"

Fica assim:

.traduzir auto pt Hello World\`\`\``)
        .setFooter(`E isso é tudo, espero ter ajudado`, client.user.displayAvatarURL())
        msg.edit(embed);
        msg.reactions.removeAll()
        msg.react(':lixeira:707833140953219134') 
      })

      apagar.on('collect', r => {
        msg.delete()
        return message.channel.send({embed: {
        color: 3447003,
        description: `✅ **|** Você acaba de apagar essa mensagem`
        }}).then(msg => msg.delete({ timeout: 5000 }))
      }) 
    })
  }

    let msg = args.slice(2).join(' ');
    translate(msg, { from: args[0], to: args[1] }).then(res => {
    let embed = new MessageEmbed()
      .setTitle(`Google Tradutor`)
      .setColor('#206694')
      .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png')
      .setDescription(`Texto traduzido de: ` + "`" + `${langs[args[0]]}` + "`" + " para " + "`" + `${langs[args[1]]}` + "`")
      .setFooter(`Tradução feita por: ${message.author.tag}`, message.author.avatarURL)
      .addField('Texto original:', msg)
      .addField(`Texto traduzido:`, res.text)   
      .setTimestamp()
    
      message.channel.send(embed)
      .catch(err => {
      console.log(err)
      message.channel.send('Desculpe mas essa lingua não existe.')
      })
    })
  }
}