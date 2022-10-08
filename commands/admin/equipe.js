
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('role-dev-button')
            .setLabel('👨‍💻 Dev 👩‍💻')
            .setStyle('PRIMARY')
            .setEmoji('👨‍💻'),
        new MessageButton()
            .setCustomId('role-3d-button')
            .setLabel('🦾 Modeleur 3D 💪')
            .setStyle('PRIMARY')
            .setEmoji('🦾'),
        new MessageButton()
            .setCustomId('role-hist-button')
            .setLabel('Historiens')
            .setStyle('PRIMARY')
            .setEmoji('🦅'),
        new MessageButton()
            .setCustomId('role-sound-button')
            .setLabel('🎶 Sound Designer 🎶')
            .setStyle('PRIMARY')
            .setEmoji('🎶')
    )

const maisonEmbed = new MessageEmbed()
    .setTitle('Bienvenue sur ShiDev!')
    .setDescription(`Ici tu trouveras différentes équipes dans lequel tu pourras évolué !`)
    


module.exports = {
    name: 'equipe',
    category: 'admin',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'equipe',
    examples: ['Actionner le bouton de votre équipe'],
    description: 'Choississez votre équipe',
    async run(client, message, args) {
        maisonEmbed.setAuthor({name: client.user.username,iconURL: client.user.avatarURL({size: 300, dynamic: true, format: 'webp'}),url: "https://music.shidozz.tk/"})
        .setFooter({text:client.user.username, iconURL: client.user.displayAvatarURL()})
        await message.channel.send({ embeds: [maisonEmbed], components: [buttons] })
    },
    async runInteraction(client, interaction) {
        maisonEmbed.setAuthor({name: client.user.username,iconURL: client.user.avatarURL({size: 300, dynamic: true, format: 'webp'}),url: "https://music.shidozz.tk/"})
        .setFooter({text:client.user.username, iconURL: client.user.displayAvatarURL()})
        await interaction.reply({ embeds: [maisonEmbed], components: [buttons] })
    },
};