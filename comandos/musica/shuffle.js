module.exports = {
    name: "shuffle",
    aliase: ["m"],
    description: "faz com que o bot misture as musicas da fila",
    aliases: ["s", "pular"],
    run: async (client, message, args) => {
      
    const queue = message.client.queue.get(message.guild.id);
    const { MessageEmbed } = require("discord.js");
    const { prefix } = require("../../config.json");
      
    const { channel } = message.member.voice;
    if (!channel) {
      const embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(`<:Erro:733785842438635571> **| ERRO NO MODO ALEATÓRIO** \n\n • Por favor entre em um canal de voz para ver a fila`)
          .setFooter(`${message.client.user.username}: Lembrando que aliases desse comando é "${prefix}sf"`, message.client.user.displayAvatarURL());
        message.channel.send(embed)
      return;
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`<:Erro:733785842438635571> **| ERRO NO MODO ALEATÓRIO** \n\n • Não há nada na fila`)
      return message.channel.send(embed);
    }

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
      const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription("<:aleatorio:734819416440832070> **| Fila Misturada: \n\n • Para ver as músicas misturadas veja a fila ")
      .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL());
    queue.textChannel.send(embed).catch(console.error);
  }
}