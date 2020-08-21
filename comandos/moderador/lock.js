module.exports = {
    name: "lock",
    description: "bloquia o chat do canal",
    aliases: ['bloqueia', 'bloquear'],
    category: "moderador",
    userPerm: ["MANAGE_MESSAGES"],
    botPerm: ["MANAGE_MESSAGES"],
    run: async (msg, [channel = msg.channel]) => {
        const type = channel.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT';
        await channel.overwritePermissions(channel.guild.defaultRole, { [type]: false });
        if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') === false) return true;
        return msg.send('Este canal está bloqueado.');
    }
}