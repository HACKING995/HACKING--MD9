"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
const axios = require('axios'); // Assurez-vous d'importer axios

zokou({
  nomCom: "chagpt",
  reaction: "🤖",
  categorie: "IA"
}, async (dest, zk, commandeOptions) => {
    const { arg, repondre } = commandeOptions;

    if (!arg[0]) {
        repondre(`Veuillez fournir du texte, par exemple : ${global.prefix}gpt Je veux de l'aide.`);
        return;
    }

    repondre("Veuillez patienter, je traite votre demande...");

    let giftedButtons = [
        [
            { buttonId: 'ai_web', buttonText: { displayText: 'Ai Web' }, type: 1 },
            { buttonId: 'wa_channel', buttonText: { displayText: 'WaChannel' }, type: 1 }
        ]
    ];

    try {
        const text = arg.join(" "); // Joindre les arguments pour former la question
        const aiResponse = await axios.get(`${global.giftedApi}/ai/gpt?apikey=${global.giftedKey}&q=${encodeURIComponent(text)}`);
        const giftedResponse = aiResponse.data.result;

        await zk.sendMessage(dest, {
            text: giftedResponse,
            buttons: giftedButtons,
            headerType: 1
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données AI :', error);
        await zk.sendMessage(dest, {
            text: 'Le service Chat Gpt est actuellement indisponible.',
            buttons: giftedButtons,
            headerType: 1
        });
    }
});

console.log("Commande GPT prête !");
