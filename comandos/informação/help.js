const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "help",
    description: "use para obter ajuda dos comandos",
    category: "informação",
    usage: "ajuda | help | comandos",
    aliases: ["ajuda","comandos"],
    run: async(client, message, args) => {
        message.delete({ timeout: 5000})

        const embed1 = new MessageEmbed()
        .setColor('#2f3136')
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`<:enviado:742152771951656962> **|** Enviei minha lista de comandos no seu privado!`)
        message.channel.send(embed1).then(msg => msg.delete({ timeout: 50000 })).catch(() => { 
          const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription("<:errado:736447664329326613> **| ERRO AO ENVIAR:** habilite as mensagens diretas de membros do Servidor")
          message.channel.send(embed)
        })

        const embed2 = new MessageEmbed()
            .setColor('#2f3136')
            .setTitle('CENTRAL DE AJUDA!')
            .setThumbnail('https://cdn.discordapp.com/attachments/705905702648152144/706315531153833994/gatuno_ajuda.png')
            .setDescription(`Para ter acesso a lista de comandos, reaja com algum emoji e receba as informações necessárias.\n\n🔨 \`Moderação\`\n🔧 \`Uteís\`\n🎧 \`Música\`\n👾 \`Diversão\`\n\nMeu site: [\`www.bot-gatuno.com.br\`](https://web-gatuno.glitch.me/#Inicio)`)
            .setFooter(`Total de comando [ ${client.comandos.size} ]`)
        message.author.send(embed2).then(msg => {
            msg.react('🔨')
            msg.react('🔧')
            msg.react('🎧')
            msg.react('👾')
            msg.react('🔙')
            const modfilter = (reaction, user) => reaction.emoji.name === ('🔨') && user.id === message.author.id;
            const uteisfilter = (reaction, user) => reaction.emoji.name === ('🔧') && user.id === message.author.id;
            const musicafilter = (reaction, user) => reaction.emoji.name === ('🎧') && user.id === message.author.id;
            const divfilter = (reaction, user) => reaction.emoji.name === ('👾') && user.id === message.author.id;
            const iniciofilter = (reaction, user) => reaction.emoji.name === '🔙' && user.id === message.author.id;
            
            const mod = msg.createReactionCollector(modfilter);
            const util = msg.createReactionCollector(uteisfilter);
            const musica = msg.createReactionCollector(musicafilter);
            const div = msg.createReactionCollector(divfilter);
            const inicio = msg.createReactionCollector(iniciofilter);

            mod.on('collect', r => {
                const embed3 = new MessageEmbed()
                .setColor('#2f3136')
                .setTitle('COMANDOS DE MODERAÇÃO')
                .addField(`**.addemoji**`, 'adicione um emoji ao seu servidor')
                .addField(`**.addrole**`, 'adicione um cargo em um membro')
                .addField(`**.removerole**`, 'remove um cargo de um membro')
                .addField(`**.ban**`, 'bane um membro')
                .addField(`**.unban**`, 'desbane um membro')
                .addField(`**.kick**`, 'kicka um membro do servidor')
                .addField(`**.mute**`, 'mute um mebro')
                .addField(`**.unmute**`, 'desmuta um membro')
                .addField(`**.falar**`, `faça o bot falar alguma coisa no servidor | variação: embed | texto`)
                .addField(`**.clear**`, 'limpe mensagens no chat | max: 100 mensagens')
                .addField(`**.setnick**`, 'alatere o apelido de um mebro')
                .addField(`**.new**`, 'mande uma noticia em um canal')
                .addField(`**.warn**`, 'de uma advertencia em um membro')
                .addField(`**.setcargomute**`, 'defina um cargo de mutado')
                .addField(`**.setlogs**`, 'sete o canal de logs do servidor')
                .addField(`**.setpuni**`, 'sete o canal de punições do servidor')
                .addField(`**.autorole**`, 'sete o um cargo pra quando um membro entrar no servidor')
                .addField(`**.bemvindo**`, 'sete o canal de bem vindo do servidor')
                .addField(`**.saida**`, 'sete o canal de saida do servidor')
                .addField(`**.criarcanal**`, 'Usado para criar um canal no servidor')
                .addField(`**.removercanal**`, 'Usado para remover um canal no servidor')
              msg.edit(embed3)
            })

            util.on('collect', r => {
                const embed4 = new MessageEmbed()
                .setColor('#2f3136')
                .setTitle('COMANDOS ÚTEIS')
                .addField('**.afk**', 'Use esse comando para ficar AFK')
                .addField('**.bug**', 'Informe um bug diretamente para meu desenvolvedor')
                .addField('**.perfil**', 'Veja como esta seu perfil no servidor ║ pode ser alterado e ver perfil de outros membros')
                .addField('**.setcolor**', 'Sete uma cor para seu perfil')
                .addField('**.setimagem**', 'Sete uma imagem/gif no seu perfil')
                .addField('**.sobremim**', 'Defina sua bio no perfil')
                .addField('**.avatar**', 'Use para ver o seu avatar ou o avatar de outros membros')
                .addField('**.invite**', 'Veja quantas pessoas você convidou para o servidor ║ @mencionavel')
                .addField('**.emojis**', 'Veja quantos emojis tem o servidor tem')
                .addField('**.level**', 'Em qual level você esta ║ @mencionavel')
                .addField('**.ping**', 'Veja o ping do Gatuno')
                .addField('**.gatuno**', 'Veja mais algumas informações sobre mim')
                .addField('**.servericon**', 'Veja o icone do servidor')
                .addField('**.serverinfo**', 'veja informações do servidor')
                .addField('**.userinfor**', 'veja suas informações no servidor ║ @mencionavel')
                .addField('**.spotify**', 'Use esse comando para ver o que o membro esta ouvindo')
                .addField('**.tradutor**', 'faz a tradução no discord')
                .addField('**.youtube**', 'Faça um pesquisa de um canal no Youtube')
              msg.edit(embed4)
            })
          
            musica.on('collect', r => {
              const embed5 = new MessageEmbed()
              .setColor('#2f3136')
              .setTitle('COMANDOS DE MÚSICA')
              .addField('**.play**', 'Use para tocar uma música. ║ Variação: ".play url da música" ● ".play nome da música"')
              .addField('**.pause**', 'Use para pausar a música que está tocando.')
              .addField('**.pularpara**', 'Use para pular para um música especifica da fila ║ Variação: ".skipto numero de uma musica na fila"')
              .addField('**.continuar**', 'Use para continuar a tocar a música que estava tocando.')
              .addField('**.remover**', 'Use para remover uma música da fila. ║ Variação: ".remover numero de uma música da fila"')
              .addField('**.fila**', 'Use para ver a fila de música.')
              .addField('**.repetir**', 'Use para repetir as músicas que estava tocando.')
              .addField('**.volume**', 'Use para alterar o volume da música. ║ Variação: ".volume 50" ● "Apenas para Djs do servidor."')
              .addField('**.pesquisar**', 'Use para pesquisar uma música.')
              .addField('**.playlist**', 'Use para tocar uma playlist. ║ Variação: ".pesquisar url da playlist" ● ".pesquisar nome da playlist"')
              .addField('**.nowplaying**', 'Use para ver a música que está tocando.')
              .addField('**.aleatorio**', 'Use para tocar música aleatoriamente.')
              .addField('**.sair**', 'Use para o bot parar de tocar música e sair do canal de voz.')            
            msg.edit(embed5)
          })

          div.on('collect', r => {
              const embed6 = new MessageEmbed()
              .setColor('#2f3136')
              .setTitle('COMANDOS DE DIVERSÂO')
              .addField('**.abraçar**', 'Use para abraçar um membro.')
              .addField('**.clyde**', 'Use para fazer a bot clyde falar alguma coisa.')
              .addField('**.ph**', 'Use para fazer uma pegadinha +18 com um membro.')
              .addField('**.fakediscord**', 'Faça um fake de mensagem de um membro no discord.')
              .addField('**.policia**', 'Chame a policia para um membro.')
              .addField('**.primeiraspalavras**', 'Faça um bebê falar suas primeiras palavras.')
              .addField('**.slap**', 'De um tapa em um membro')
              .addField('**.kiss**', 'De um beijo em um membro')              
            msg.edit(embed6)
          })
          
          inicio.on('collect', r => {
            msg.edit(embed2)
          })
          
      })
    }
}

