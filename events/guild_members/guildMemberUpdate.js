const { MessageEmbed, Client, GuildMember, Role } = require("discord.js");

module.exports = {
    name: "guildMemberUpdate",
    once: false,
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} oldMember 
     * @param {GuildMember} newMember 
     */
    async execute(client, oldMember, newMember) {


        const fetchGuild = client.guilds.cache.get(newMember.guild)

        if(newMember.roles.cache !== oldMember.roles.cache){
            const embed = new MessageEmbed()
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setColor("GREEN")
            .setTitle(`Les roles de ${newMember.user.tag} ont été modifié !`)
            .setThumbnail(newMember.user.displayAvatarURL())
            .addFields(
                {name: "֍ Id:", value: `${newMember}`, inline: false},
                {name: "֍ Roles:", value: `${newMember.roles.cache.map(role => role).filter(role => role.id !== newMember.guild.id).join(', ')}`, inline: false},
                {name: "֍ Créé le:", value: `<t:${parseInt(newMember.user.createdTimestamp / 1000)}:f> (<t:${parseInt(newMember.user.createdTimestamp / 1000)}:R>)`, inline: false},
                {name: "֍ Rejoint le:", value: `<t:${parseInt(newMember.joinedTimestamp / 1000)}:f> (<t:${parseInt(newMember.joinedTimestamp / 1000)}:R>)`, inline: false},
            )
            .setTimestamp()
            .setFooter({text:newMember.user.username, iconURL: newMember.user.displayAvatarURL()})
    
            const logChannel = client.channels.cache.find(chann => chann.name === 'logs-roles');
            //logChannel -> Channel (textchannel)
            logChannel.send({ embeds: [embed] });
        }
        
        
    }
};