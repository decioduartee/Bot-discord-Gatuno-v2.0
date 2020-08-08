const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config.json");

module.exports = {
    name: "loop",
    aliases: ["l"],
    description: "Use play <nome/url da musica> para tocar uma musica",
    run: async (client, message, args) => {
      
    let embed = new MessageEmbed()
    .setColor("#2f3136");

        const {channel } = message.member.voice;

        if (!channel) {
            embed.setDescription('<:error:715218174215323691> **| ERRO AO REPETIR** \n\n > • Por favor entre em um canal de voz')
            .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}l"`, message.client.user.displayAvatarURL());
            message.channel.send(embed).catch(console.error);
          return;
        }

    const serverQueue = message.client.queue.get(message.guild.id);

    if(!serverQueue) {
        embed.setDescription(`<:Erro:733785842438635571> **| ERRO AO REPETIR** \n\n > • não há música para repetir`)
      message.channel.send(embed)
    return;
    }
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop
    
    
    embed.setDescription(`${serverQueue.loop ? "<:loop:733925306427113572> **| LOOP ESTÁ:** \n\n • Ativado" : "<:Noloop:733925306112671745> **| LOOP ESTÁ:** \n\n • Desativado"}`)
    message.channel.send(embed)
    
  }
}