module.exports = {
  name: "fakebot",
  description: "use esse comando para fazer um bom fake de um membro.",
  category: "ulteis",
  usage: ".fakebot <mencione um membro>",
  aliases: ["fakemembro", "fakeb"],
  run: async(client, message, args) => {
    const { MessageEmbed } = require("discord.js");
    const db = require('quick.db');

        if (!message.member.hasPermission("MANAGE_WEBHOOKS")){
            const embed = new MessageEmbed()
            .setColor("#e74c3c")
            .setDescription(`:error: **| ERRO**\nVocê não tem a permissão \`MANAGE_WEBHOOKS\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }

        if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")){
            const embed = new MessageEmbed()
            .setColor("#e74c3c")
            .setDescription(`:error: **| ERRO**\nEu não tenho a permissão \`MANAGE_WEBHOOKS\``)
            .setFooter(`Atenciosamente, ${client.user.username}`, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(embed)
        return;
        }
    
  message.delete()
  
  const user = message.mentions.users.first()
  
  if(!user) return message.reply("mencione um membro")
  
  const menssagem = args.slice(1).join(" ")
  
  if(!menssagem) return message.reply("me forneça uma memsagem")

    message.channel.createWebhook(`${user.username}`, {
	avatar: `${user.displayAvatarURL()}`,
}).then(w => w.send(menssagem)).catch(console.error);
    
/*message.channel.createWebhook(user.username).then(w => {
    w.send(menssagem);
    w.delete();
  })*/
 }
}