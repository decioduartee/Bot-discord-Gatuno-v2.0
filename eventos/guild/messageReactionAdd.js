module.exports = async (reaction, user) => {
    
    if(user.bot) return;
  
    if (reaction.emoji.name === '🎫') {
      reaction.message.guild.members.fetch(user.id).then(x => {
        reaction.users.remove(user)
      });
    }
}