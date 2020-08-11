const { MessageEmbed } = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
    name: "anime",
    aliases: ["animesearch"], 
    category: "utility",
    description: "Get info about an anime",
    run: async (client, message, args) => {

    const search = args.splice(0).join(' ');
    if(!search) {
      const embed = new MessageEmbed()
        .setColor('#2f3136')
        .setDescription("<:errado:736447664329326613> **| ERRO AO PESQUISAR ANIME** \n\n • **Informações:** \n • **Mensagem:** Me informe um nome para a pesquisa")
        .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
      message.channel.send(embed)
    }

    malScraper.getInfoFromName(search)
        .then((data) => {
        const malEmbed = new MessageEmbed()
            .setDescription(`Resultado da pesquisa: [**${search}**](${data.url})`)
            .setThumbnail(data.picture)
            .setColor('#2f3136')
            .addField("**• Informações**", [
                `• **Titulo em ingles:** ${data.englishTitle}`,
                `• **Titulo em japones:** ${data.japaneseTitle}`,
                `• **Tipo:** ${data.type}`,
                `• **Episodios:** ${data.episodes}`,
                `• **Avaliação:** ${data.rating}`,
                `• **Transmitido em:** ${data.aired}`,
                `• **Pontuação:** ${data.score}`,
                `• **Estatísticas de pontuação:** ${data.scoreStats}`,
            ])
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())

        message.channel.send(malEmbed);

        })
    }
};