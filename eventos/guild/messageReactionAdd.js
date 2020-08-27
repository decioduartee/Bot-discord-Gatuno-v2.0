module.exports = async (reaction, user) => {

let message = reaction.message, emoji = reaction.emoji;
  
  if(user.bot) return;

  if (emoji.name == '📩') {
    message.guild.members.fetch(user.id).then(x => {
        reaction.users.remove(user)
    });
  }
}