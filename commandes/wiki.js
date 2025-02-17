"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
const wikipedia = require('wikipedia');

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
        const page = await wikipedia.page(query);
        const summary = await page.summary();
        
        return {
            title: summary.title,
            desc: summary.extract,
        };
    } catch (error) {
        console.error(error.message);
        return null; // Retourner null en cas d'erreur
    }
}

console.log("Commande Wikipedia prête !");
