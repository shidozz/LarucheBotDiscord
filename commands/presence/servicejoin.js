const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'servicejoin',
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
        const arrive = interaction.options.getString('arrive')

        const Join = new MessageEmbed()
        .setTitle('\````Prise de poste```\`')
            .setColor("#21ff81")
            .setDescription(`${user} a pris son service`)
            .setTimestamp()

        if (!user) return interaction.reply({
            content:'veuillez saisir un nom valable (ex: @name)',
             ephemeral: true})

        if ({ arrive }) return interaction.reply({ embeds: [Join] });
    }
};