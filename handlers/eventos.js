const { readdirSync } = require("fs")

module.exports = (client) => {
    console.log(`[COMANDOS] Carregando...`);
    const load = dirs => {    
        const eventos = readdirSync(`./eventos/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of eventos) {
            const evt = require(`../eventos/${dirs}/${file}`);
            let eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
          };
        };

        ["client", "guild", "logs"].forEach(x => load(x))

        console.log(`[COMANDOS] Caregado`)
};