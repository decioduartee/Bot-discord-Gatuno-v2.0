module.exports = {
    name: "lock",
    description: "bloquia o chat do canal",
    aliases: ['bloqueia', 'bloquear'],
    category: "moderador",
    userPerm: ["MANAGE_MESSAGES"],
    botPerm: ["MANAGE_MESSAGES"],
    run: async (message, [channel = message.channel]) => {
        const type = channel.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT';
        await channel.overwritePermissions(channel.guild.defaultRole, { [type]: false });
        if (message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES') === false) return true;
        return message.send('Este canal está bloqueado.');
    }
}