const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
        name: "clyde",
        category: "diversão",
        description: "manda uma imagem da clyde falando algo",
        accessableby: "everyone",
    run: async (client, message, args) => {

        message.delete()
        let text = args.join(" ");

        if (!text) {
            return message.channel.send("Me informe um mensagem");
        }

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "clyde.png");
            message.channel.send(attachment);
        } catch (e) {
        }
    }
}