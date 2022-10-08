const { Client, Interaction } = require("discord.js");

const ownerId = ['466673362748440579', '502530117520850956', '800141232536813609', '707700435179405362', '584392201119989770', '560370055355826177'];


module.exports = {
    name: "interactionCreate",
    once: false,
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(client, interaction) {
        let guildSettings = await client.getGuild(interaction.guild);

        if (!guildSettings) {
            await client.createGuild(interaction.guild);
            guildSettings = await client.getGuild(interaction.guild);
            return interaction.reply('le bot a mis à jour la base de données pour votre serveur, retapez la commande!');
        }

        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply('Cette commande n\'existe pas!');

            if (cmd.ownerOnly) {
                if (!ownerId.find(interaction.user.id)) return interaction.reply({ content: 'La seul personne pouvant taper cette commande est l\'owner du bot', ephemeral: true});
            }

            if (!interaction.member.permissions.has([cmd.permissions]) && !ownerId.find(interaction.user.id)) return interaction.reply({ content: `Vous n\'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour taper cette commande!`, ephemeral: true });


            cmd.runInteraction(client, interaction, guildSettings);
        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply('Ce bouton n\'existe pas!');
            btn.runInteraction(client, interaction, guildSettings );
        }else if (interaction.isSelectMenu()) {
            const selectMenu = client.selects.get(interaction.customId);
            if (!selectMenu) return interaction.reply('Ce menu n\'existe pas!');
            selectMenu.runInteraction(client, interaction, guildSettings);
        }else if(interaction.isModalSubmit()){
            const modals = client.modals.get(interaction.customId);
            if (!modals) return interaction.reply('Ce modals n\'existe pas!');
            modals.runInteraction(client, interaction, guildSettings);
        }
    },
};