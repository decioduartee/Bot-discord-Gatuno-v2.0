module.exports = {
  name: "dado",
  category: "diversão",
  accessableby: "everyones",
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");

    let numero = Math.floor(Math.random() * 10) + 1;

    let embed = new MessageEmbed()
    .setColor("#2f3136")
    .setImage("https://cdn.discordapp.com/attachments/719751166296195103/733908619162157056/desconhecido.gif")
    message.channel.send(embed).then(msg => {
      
      setTimeout(function() {
        let embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`**O DADO CAIU EM • ${numero}**`)
        msg.edit(embed);
      }, 2000);
    });

  }
};