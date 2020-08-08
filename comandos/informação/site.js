module.exports = {
    name: "site",
    description: "use pra ver o site do bot",
    usage: "site",
    run: async (client, message, args) => {

        message.channel.send({embed: {
          color: "#2f3136",
          description: "ficou curioso e quer saber mais sobre mim ou até mesmo sobre meu desenvolvedor? acesse meu site, lá contem muitas informações..\n\n**Meu site**: [www.bot-gatuno.com.br](https://web-gatuno.glitch.me/#Inicio)"
        }})
    }
}