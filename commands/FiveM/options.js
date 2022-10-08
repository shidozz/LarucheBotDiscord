const {FivemServer,IdentifierType} = require("full-fivem-api")


module.exports = {
    name: 'fivem',
    category: 'fivem',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: false,
    usage: 'fivem [key] <channel>',
    examples: ['config', 'config ticket ', 'config ticket_direction'],
    description: 'Configurer les données de la base de données',
    options: [
        {
            name: 'key',
            description: 'Choisir une clé a modifier ou afficher',
            type: 'STRING',
            required: false,
            choices: [
                {
                    name: 'logs_general',
                    value: 'logs_general'
                },
                {
                    name: 'logs_connexion',
                    value: 'logs_connexion'
                }
            ]
        },
        {
            name: 'value',
            description: 'Choisir la nouvelle valeur pour votre clé',
            type: 'CHANNEL'
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getChannel('value');
	
        const server = new FivemServer("IP");
    	const status =  await server.fetch();
    	if(status.online){
        	// if (status.online === false) these fields would be null
        	console.log(server.maxClients);
        	await server.fetchPlayers();
        	console.log(server.players);
        	console.log(server.getUserByName("NAME"))
        	console.log(server.getUserByIdentifier(IdentifierType.discord,"DISCORD-ID"))
    	}
    }
};