module.exports ={
  name: "criar",
  description: "use para criar um canal am um categoria específica",
  run: async(client, message, args) => {
    
  var server = message.guild;
    
  if(!args[0]) {
    return message.reply("Por favor me informe uma categoria que desaja criar o canal");
  }
    
  if(!args[1]) {
    return message.reply("Me informe Um nome para o canal");
  }
    
  let category = server.channels.cache.find(c => c.name == `${args[0]}` && c.type == "category"),
  channel = server.channels.cache.find(c => c.name == `${args[1]}` && c.type == "text");

  if (category && channel) channel.setParent(category.id);
  else console.error(`Um dos canais está ausente:\nCategory: ${!!category}\nChannel: ${!!channel}`)
    
    server.channels.create(`${args[1]}`)
  .then(channel => {
    let category = server.channels.cache.find(c => c.name == `${args[0]}` && c.type == "category");

    if (!category) throw new Error("Essa categoria não existe");
    channel.setParent(category.id);
  }).catch(console.error);
  }
}