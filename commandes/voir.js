const { zokou } = require("../framework/zokou");

// Définition de la commande 'vv'
zokou({
    nomCom: 'voir',
    categorie: "Général",
    reaction: '🤲🏿'
}, async (dest, zk, commandeOptions) => {
    const { ms, msgRepondu, repondre } = commandeOptions;

    // Vérifie si un message a été mentionné
    if (!msgRepondu) {
        return repondre("*Veuillez mentionner un message envoyé en vue unique*.");
    }

    // Vérifie si le message est un message à vue unique
    if (msgRepondu.viewOnceMessageV2 || msgRepondu.viewOnceMessageV2Extension) {
        let message = msgRepondu.viewOnceMessageV2Extension ?? msgRepondu.viewOnceMessageV2;

        // Gestion des messages image
        if (message.message.imageMessage) {
            const imageUrl = await zk.downloadAndSaveMediaMessage(message.message.imageMessage);
            const imageCaption = message.message.imageMessage.caption;

            await zk.sendMessage(dest, {
                image: { url: imageUrl },
                caption: imageCaption
            }, { quoted: ms });

        // Gestion des messages vidéo
        } else if (message.message.videoMessage) {
            const videoUrl = await zk.downloadAndSaveMediaMessage(message.message.videoMessage);
            const videoCaption = message.message.videoMessage.caption;

            await zk.sendMessage(dest, {
                video: { url: videoUrl },
                caption: videoCaption
            }, { quoted: ms });

        // Gestion des messages audio
        } else if (message.message.audioMessage) {
            const audioUrl = await zk.downloadAndSaveMediaMessage(message.message.audioMessage);

            await zk.sendMessage(dest, {
                audio: { url: audioUrl },
                mimetype: 'audio/mp4'
            }, {
                quoted: ms,
                ptt: false
            });
        } else {
            return repondre("Ce type de message n'est pas pris en charge.");
        }
    } else {
        return repondre("Le message que vous avez mentionné n'est pas un message à vue unique.");
    }
});
