module.exports = async (message) => {

    const db = require(`quick.db`);
    const { MessageEmbed } = require("discord.js")
    const firebase = require('firebase')
    const database = firebase.database()

    const afk = new db.table("AFKs"), mentioned = await message.mentions.members.first();
    if (mentioned) {
    let status = await afk.get(mentioned.id);

        if (status) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`<:certo:736447597102760007> **| MODO AFK ATIVADO** \n\n ${mentioned.user} Está em modo **AFK**\n\n**Lembrete**:\n\`\`\`fix\n${status}\`\`\``)
                .setThumbnail(mentioned.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
                .setTimestamp()
                .setFooter(`Atenciosamente ${message.client.user.username}`, message.client.user.displayAvatarURL());
            message.channel.send(embed).then(i => i.delete({ timeout: 50000 }));
        }
    }
  
//_____________________________comando de anti invites___________________

    let blockinvite = await database.ref(`Servidores/${message.guild.id}/Defesa/Blockinvite`).once('value')
    blockinvite = blockinvite.val()

    if(blockinvite === "on") {
      let Link = ["discord.gg", "discord.com/invite", "discordapp.com/invite"];

      if (Link.some(word => message.content.toLowerCase().includes(word))) {
        await message.delete();
        let embed = new MessageEmbed()
          .setColor("#2f3136")
          .setDescription("**Por favor respeite as regas**! não mande convites neste servidor")
        return message.channel.send(embed).then(m => m.delete({timeout: 10000}))
      }
    }
}