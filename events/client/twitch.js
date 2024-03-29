const Logger = require('../../utils/Logger');
const {MessageEmbed, Client, Message} = require('discord.js');
const config = require("../../config.json")
const {Axios, default: axios} = require('axios');
const channels = config.twitch.streamers;
let data = {streamers: []}
let oldData = {streamers: []}
let turn = 0

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        let IntID;
        if (!IntID){
            IntID = setInterval(twitch(client), 1000);
        }

    },

};
/**
 * 
 * @param {Client} _client 
 * @returns 
 */
function twitch(_client) {
    
    const channelD = _client.channels.cache.get(`906644718589444116`);
    let n = 0;
    channels.forEach(async channelName => {
        await axios.get("https://api.twitch.tv/helix/users?login=" + channelName, {headers:{"Authorization": config.twitch.token,"Client-Id": "w6cp33v89t3d1en98ygrd8kx53krwn"}}).then(async rsp => {
            
            
            await axios.get("https://api.twitch.tv/helix/streams?user_id=" + rsp.data.data[0].id, {headers: {"Authorization": config.twitch.token, "Client-Id": "w6cp33v89t3d1en98ygrd8kx53krwn"}}).then(response => {
                if(turn != 0){
                    oldData.streamers.push(data.streamers[n]) 
                }else{
                    response.data.data[0] ? oldData.streamers.push({name: channelName, isOnLive: response.data.data[0]["type"].toLowerCase() === "live" ? true : false, id: n, idT: rsp.data.data[0].id}) : oldData.streamers.push({name: channelName, isOnLive: false, id: n, idT: rsp.data.data[0].id})
                }
                data.streamers = [];
                response.data.data[0] ? data.streamers.push({name: channelName, isOnLive: response.data.data[0]["type"].toLowerCase() === "live" ? true : false, id: n, idT: rsp.data.data[0].id}) : data.streamers.push({name: channelName, isOnLive: false, id: n, idT: rsp.data.data[0].id})
                
                //Logger.info(JSON.stringify(rsp.data.data[0]))
                if(response.data.data[0] && turn == 0){
                    
    		        let emd = new MessageEmbed()
                        .setAuthor({name: _client.user.username, iconURL: _client.user.displayAvatarURL(), url: "https://twitch.tv/" + response.data.data[0]["user_login"]})
                        .addFields({name: "Nom du Jeu:", value: `${response.data.data[0]["game_name"]}`, inline: false}, {name: "Nombre de Viewers:", value: `${response.data.data[0]["viewer_count"]}`, inline: false}, {name: "Nombre de Vues Total sur la chaine:", value: `${rsp.data.data[0]["view_count"]}`, inline: false})
                        .setThumbnail(rsp.data.data[0]["profile_image_url"])
                        .setImage(response.data.data[0]["thumbnail_url"].replace("{height}", "600").replace("{width}", "800"))
                        .setColor('PURPLE')
                        .setTitle(response.data.data[0]["title"])
                        .setFooter({text:response.data.data[0]["user_name"], iconURL: rsp.data.data[0]["profile_image_url"]})
                        .setTimestamp()
                    channelD.send({content: `<@&1028429099380772915>`, embeds: [emd]})
                }else if(response.data.data[0] && oldData.streamers[n].isOnLive !== data.streamers[n].isOnLive){
                                        
    		        let emd = new MessageEmbed()
                        .setAuthor({name: _client.user.username, iconURL: _client.user.displayAvatarURL(), url: "https://twitch.tv/" + response.data.data[0]["user_login"]})
                        .addFields({name: "Nom du Jeu:", value: `${response.data.data[0]["game_name"]}`, inline: false}, {name: "Nombre de Viewers:", value: `${response.data.data[0]["viewer_count"]}`, inline: false}, {name: "Nombre de Vues Total sur la chaine:", value: `${rsp.data.data[0]["view_count"]}`, inline: false})
                        .setThumbnail(rsp.data.data[0]["profile_image_url"])
                        .setImage(response.data.data[0]["thumbnail_url"].replace("{height}", "600").replace("{width}", "800"))
                        .setColor('PURPLE')
                        .setTitle(response.data.data[0]["title"])
                        .setFooter({text:response.data.data[0]["user_name"], iconURL: rsp.data.data[0]["profile_image_url"]})
                        .setTimestamp()
                    channelD.send({content: `<@&1028429099380772915>`, embeds: [emd]})
                }
                n++;
            })
        })
    })
    return ;
}