const { zokou } = require("../framework/zokou");

// Définition de la commande 'vv'
zokou({
    nomCom: 'voir',
    categorie: "Général",
    reaction: '👀'
}, async (dest, zk, commandeOptions) => {
    const { ms, msgRepondu, repondre } = commandeOptions;

    // Vérifie si un message a été mentionné
    if (!msgRepondu) {
        return repondre("*Veuillez mentionner un message envoyé en vue unique*.");
    }

    // Recherche du message à vue unique
    let viewOnceKey = Object.keys(msgRepondu).find(key => key.startsWith("viewOnceMessage"));
    let vueUniqueMessage = msgRepondu;

    if (viewOnceKey) {
        vueUniqueMessage = msgRepondu[viewOnceKey].message;
    }

    // Vérification du type de message
    if (vueUniqueMessage) {
        if (
            (vueUniqueMessage.imageMessage && vueUniqueMessage.imageMessage.viewOnce !== true) ||
            (vueUniqueMessage.videoMessage && vueUniqueMessage.videoMessage.viewOnce !== true) ||
            (vueUniqueMessage.audioMessage && vueUniqueMessage.audioMessage.viewOnce !== true)
        ) {
            return repondre("Ce message n'est pas un message en vue unique.");
        }
    }

    try {
        let media;
        let options = { quoted: ms };

        // Gestion des messages image
        if (vueUniqueMessage.imageMessage) {
            media = await zk.downloadAndSaveMediaMessage(vueUniqueMessage.imageMessage);
            await zk.sendMessage(dest, {
                image: { url: media },
                caption: vueUniqueMessage.imageMessage.caption || ""
            }, options);

        // Gestion des messages vidéo
        } else if (vueUniqueMessage.videoMessage) {
            media = await zk.downloadAndSaveMediaMessage(vueUniqueMessage.videoMessage);
            await zk.sendMessage(dest, {
                video: { url: media },
                caption: vueUniqueMessage.videoMessage.caption || ""
            }, options);

        // Gestion des messages audio
        } else if (vueUniqueMessage.audioMessage) {
            media = await zk.downloadAndSaveMediaMessage(vueUniqueMessage.audioMessage);
            await zk.sendMessage(dest, {
                audio: { url: media },
                mimetype: "audio/mp4"
            }, {
                quoted: ms,
                ptt: false
            });

        } else {
            return repondre("Ce type de message en vue unique n'est pas pris en charge.");
        }
    } catch (_error) {
        console.error("❌ Erreur lors de l'envoi du message en vue unique :", _error.message || _error);
        return repondre("Une erreur est survenue lors du traitement du message.");
    }
});
