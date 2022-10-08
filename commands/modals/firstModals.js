const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals'); // Import all
const {Client, Interaction} = require('discord.js')

module.exports = {
    name: 'first',
    category: 'modals',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'modals',
    examples: ['modals'],
    description: 'modals',
   
    async runInteraction(client, interaction) {
        const comp2 = new SelectMenuComponent().setCustomId("sexe-input").addOptions({label: "Homme", value: "Homme", default: true, emoji: "🧔", description: "Femme"}, {label: "Femme", value: "Femme", default: false, emoji: "👩", description: "Femme"}).setDisabled(false);
        
        const modal = new Modal() // We create a Modal
	        .setCustomId('modal-customid')
	        .setTitle('Modal')
            .addComponents(new TextInputComponent().setLabel("Nom").setCustomId("nom-input").setStyle('SHORT').setPlaceholder("Musk").setRequired(true),new TextInputComponent().setLabel("Prénom").setCustomId("prenom-input").setStyle('SHORT').setPlaceholder("Elon").setRequired(true)/*, comp2*/);
        await showModal(modal,{client: client, interaction: interaction})
    },
};