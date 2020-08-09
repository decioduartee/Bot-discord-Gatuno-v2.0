module.exports = client => {
  let avatar = [
    "https://cdn.discordapp.com/attachments/705905702648152144/713065839418540112/GatunoO.png",
    "https://cdn.discordapp.com/attachments/705905702648152144/713224539202650242/GatunoHeroi.png",
    "https://cdn.discordapp.com/attachments/705905702648152144/712796771394256906/278d529ca51f3fa868bc4c9f1b806324.png"
  ];
  function avattar() {
    let statuss = avatar[Math.floor(Math.random() * avatar.length)];
    client.user.setAvatar(statuss);
  }
  avattar();
  setInterval(() => avattar(), 900500);

  console.log(`Logado com ${client.user.username}!`);

  let tabela = [

    { name: `${client.guilds.cache.size.toLocaleString()} servidores em meus dados`, type: "PLAYING"},
    { name: `amor para ${client.users.cache.size.toLocaleString()} usúarios`, type: "STREAMING", url: "https://www.twitch.tv/spaykxd"},
    { name: `musica em ${client.channels.cache.size.toLocaleString()} canais`, type: "LISTENING" },
    { name: `meu prefix | .`, type: "LISTENING" },
    { name: `bolas de lã 🏐`, type: "PLAYING" },
    { name: `.ajuda 🐱📃`, type: "LISTENING" },
    { name: `.play 🎧🎶`, type: "LISTENING" }
    
  ];
  
  function st() {
    let status = tabela[Math.floor(Math.random() * tabela.length)];
    client.user.setActivity(status);
  }
  st();
  setInterval(() => st(), 10000);

  client.user.setPresence({ activity: { name: `Transformando seu servidor em um lugar melhor :3` }, status: 'idle' })
};
