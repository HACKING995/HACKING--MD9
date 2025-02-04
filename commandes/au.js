"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
const axios = require('axios');
const cheerio = require('cheerio');

zokou({
  nomCom: "wiki",
  reaction: "📚",
  categorie: "Recherche"
}, async (dest, zk, commandeOptions) => {
    const { arg, repondre } = commandeOptions;

    if (!arg[0]) {
        repondre(`Veuillez fournir une requête de recherche, par exemple : ${global.prefix}wiki Chat`);
        return;
    }

    repondre("Veuillez patienter, je traite votre demande...");

    const giftedWiki = await giftedWikipedia(arg.join(" "));
    if (giftedWiki) {
        let giftedCap = `*${giftedWiki.title}*\n\n"${giftedWiki.desc}"`;

        let giftedButtons = [
            [
                { buttonId: 'wa_channel', buttonText: { displayText: 'WaChannel' }, type: 1 }
            ]
        ];

        await zk.sendMessage(dest, {
            text: giftedCap,
            buttons: giftedButtons,
            headerType: 1
        });
    } else {
        repondre("Désolé, je n'ai pas pu trouver d'informations sur ce sujet.");
    }
});

async function giftedWikipedia(query) {
    try {
        const q = query.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_');
        
        const { data } = await axios.get(`https://en.m.wikipedia.org/wiki/${q}`);
        const $ = cheerio.load(data);
        
        const result = {
            title: $('h1[id="firstHeading"]').text().trim(),
            desc: $('.mf-section-0 p').text().trim().replace(/\[.*?\]/g, '')
        };
        return result;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return null; // Retourner null en cas d'erreur
    }
}

console.log("Commande Wikipedia prête !");
