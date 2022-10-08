const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'servicequit',
    category: 'presence',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'service',
    examples: ['service @rems join'],
    description: 'Prise de service',
    options: [
        {
            name: "user",
            description: "employé",
            type: 'USER',
        }
    ],

    async runInteraction(member, interaction) {
        const user = interaction.options.getMember('user')
        const depart = interaction.options.getString('depart')

        const Quit = new MessageEmbed()
            .setTitle('\````Fin de poste```\`')
            .setColor('RED')
            .setDescription(`${user} a fini son service`)
            .setTimestamp()

        if (!user) return interaction.reply({
            content: 'veuillez saisir un nom valable (ex: @name)',
            ephemeral: true
        })

        if ({ depart }) return interaction.reply({ embeds: [Quit] });
    }
};