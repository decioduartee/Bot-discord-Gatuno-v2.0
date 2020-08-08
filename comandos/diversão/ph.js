const Discord = require("discord.js");

module.exports = {
        name: "ph",
        category: 'diversão',
        accessableby: "everyones",
    run: async (client, message, args) => {
      
        message.delete()
        let user = message.mentions.members.first() || message.author;
        let text = args.join(" ");

        if(user){
            text = args.slice(1).join(" ");
        } else {
            user = message.author;
        }

        if(!text){
            return message.channel.send("**Mencione alguem e Escreva uma mensagem**");
        }

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${user.user.username}&image=${user.user.displayAvatarURL({ format: "png", size: 512 })}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
            message.channel.send(attachment);
        } catch(e){
            console.log(e)
        }
    }
};