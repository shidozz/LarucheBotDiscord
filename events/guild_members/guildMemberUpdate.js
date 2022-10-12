const dayjs = require("dayjs");
const { MessageEmbed, Client, GuildMember, Formatters} = require("discord.js");

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
        //const nowTimestampR = Formatters.time(dayjs(Date.now()), Formatters.TimestampStyles.RelativeTime);
        //const nowTimestampF = Formatters.time(dayjs(Date.now()), Formatters.TimestampStyles.LongDateTime);
        const nowTimestampF = `<t:${Date.now()}:F>`
        const nowTimestampR = `<t:${Date.now()}:R>`
        const fetchGuild = client.guilds.cache.get(newMember.guild)
        console.log(nowTimestampF)
        if(newMember.roles.cache !== oldMember.roles.cache && newMember.roles.cache.length > oldMember.roles.cache.length){
	    let oldRoles = oldMember.roles;
            const embed = new MessageEmbed()
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setColor("GREEN")
            .setTitle(`Les roles de ${newMember.user.tag} ont été modifié !`)
            .setThumbnail(newMember.user.displayAvatarURL())
            .addFields(
                {name: "֍ Id:", value: `${newMember}`, inline: false},
                {name: "֍ Roles:", value: `${newMember.roles.cache.map(role => role).filter((role) => {if(!oldRoles.cache.has(role.id) && role.id !== member.guild.id) return true}).join(', ')}`, inline: false},
                {name: "֍ Ajouté le:", value: `${nowTimestampF} (${nowTimestampR})`, inline: false},
            )
            .setTimestamp()
            .setFooter({text:newMember.user.username, iconURL: newMember.user.displayAvatarURL()})
    
            const logChannel = client.channels.cache.get("906644703523536896");
            //logChannel -> Channel (textchannel)
            logChannel.send({ embeds: [embed] });
        } else if(newMember.roles.cache !== oldMember.roles.cache && newMember.roles.cache.length < oldMember.roles.cache.length){

	    let oldRoles = oldMember.roles;
	    let newRoles = newMember.roles;
            const embed = new MessageEmbed()
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setColor("GREEN")
            .setTitle(`Les roles de ${newMember.user.tag} ont été modifié !`)
            .setThumbnail(newMember.user.displayAvatarURL())
            .addFields(
                {name: "֍ Id:", value: `${newMember}`, inline: false},
                {name: "֍ Roles:", value: `${oldRoles.cache.map(role => role).filter((role) => {if(!newRoles.cache.has(role.id) && role.id !== member.guild.id) return true}).join(', ')}`, inline: false},
                {name: "֍ Retiré le:", value: `${nowTimestampF} (${nowTimestampR})`, inline: false},
            )
            .setTimestamp()
            .setFooter({text:newMember.user.username, iconURL: newMember.user.displayAvatarURL()})
    
            const logChannel = client.channels.cache.get("906644703523536896");
            //logChannel -> Channel (textchannel)
            logChannel.send({ embeds: [embed] });
	}
        
        
    }
};