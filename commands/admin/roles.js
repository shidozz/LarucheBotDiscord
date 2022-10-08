
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

const selectMenu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('roles-menu')
            .setPlaceholder('Choisir un rôle dans la liste')
            .setMinValues(1)
            .setMaxValues(4)
            .addOptions([
                {
                    label: '👨‍💻',
                    description: 'Choisis Dev',
                    value: '1006399572106559550'
                },
                {
                    label: '🦾',
                    description: 'Choisis Modeleur 3D',
                    value: '1006401116021465271'
                },
                {
                    label: '🐱‍🐉',
                    description: 'Choisis Historien',
                    value: '1006401921390739457'
                },
                {
                    label: '🎶',
                    description: 'Choisis Sound Designer',
                    value: '1006402657818263703'
                }
            ])
         
    )

    const rolesEmbed = new MessageEmbed()
    .setColor("BLURPLE")
    .setDescription('Choisis ton rôle')
    .setTimestamp()

module.exports = {
    name: 'roles',
    category: 'admin',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: true,
    usage: 'roles',
    examples: ['roles'],
    description: 'roles',
    async run(client, message, args) {
        rolesEmbed
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL(), url: "https://music.shidozz.tk/"})
            .setFooter({text:client.user.username, iconURL: client.user.displayAvatarURL()})
        await message.channel.send({ embeds: [rolesEmbed], components: [selectMenu] })
    },
    async runInteraction(client, interaction) {
        rolesEmbed
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL(), url: "https://music.shidozz.tk/"})
            .setFooter({text:client.user.username, iconURL: client.user.displayAvatarURL()})
        await interaction.reply({ embeds: [rolesEmbed], components: [selectMenu] })
    },
};