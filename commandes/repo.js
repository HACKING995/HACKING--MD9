const { zokou } = require("../framework/zokou");
const { fbdl, ttdl, ytdl } = require("../framework/dl");
const ytsr = require('@distube/ytsr');
const axios = require('axios');

// Fonction pour envoyer des fichiers média (audio/vidéo)
async function sendMedia(origineMessage, zk, url, format, type) {
    try {
        const downloadLink = await ytdl(url, format);
        if (!downloadLink) {
            throw new Error("Le lien de téléchargement est introuvable.");
        }

        const media = await axios.get(downloadLink, {
            responseType: "arraybuffer",
            headers: {
                "User-Agent": "GoogleBot",
            },
        });

        const message = {
            [type]: Buffer.from(media.data),
            mimetype: format === "ogg" ? "audio/mpeg" : "video/mp4",
            caption: `\`\`\`Powered By HACKING-MD\`\`\``,
        };

        return await zk.sendMessage(origineMessage, message); // Utilisation de origineMessage directement
    } catch (error) {
        console.error("Erreur lors de l'envoi du média:", error.message);
        throw error;
    }
}

// Commande pour télécharger une chanson depuis YouTube
zokou({
    nomCom: "song",
    categorie: "Téléchargement",
    reaction: "🎵",
    desc: "Télécharge une chanson depuis YouTube avec un terme de recherche",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    if (!arg.length) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez spécifier un titre de chanson ou un lien YouTube.",
        });
    }

    const query = arg.join(" ");
    await zk.sendMessage(origineMessage, { text: "Veuillez patienter, je recherche..." });

    try {
        const searchResults = await ytsr(query, { limit: 1 });
        if (searchResults.items.length === 0) {
            return await zk.sendMessage(origineMessage, { text: "Aucun résultat trouvé." });
        }

        const song = searchResults.items[0];
        const videoInfo = {
            url: song.url,
            title: song.name,
            views: song.views,
            duration: song.duration,
            thumbnail: song.thumbnail,
        };

        const caption = `╭─── 〔 HACKING-MD PLAYLIST 〕 ──⬣\n⬡ Titre: ${videoInfo.title}\n⬡ URL: ${videoInfo.url}\n⬡ Vues: ${videoInfo.views}\n⬡ Durée: ${videoInfo.duration}\n╰───────────────────⬣`;

        await zk.sendMessage(origineMessage, { image: { url: videoInfo.thumbnail }, caption });
        await sendMedia(origineMessage, zk, videoInfo.url, "ogg", "audio");
    } catch (error) {
        console.error("Erreur lors du téléchargement de la chanson:", error.message);
        await zk.sendMessage(origineMessage, { text: "Erreur lors du téléchargement." });
    }
});

// Commande pour télécharger une chanson via YouTube
zokou({
    nomCom: "play",
    categorie: "Téléchargement",
    reaction: "🎵",
    desc: "Télécharge une chanson depuis YouTube avec un terme de recherche",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    if (!arg.length) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez spécifier un titre de chanson ou un lien YouTube.",
        });
    }

    const query = arg.join(" ");
    await zk.sendMessage(origineMessage, { text: "Veuillez patienter, je recherche..." });

    try {
        const searchResults = await ytsr(query, { limit: 1 });
        if (searchResults.items.length === 0) {
            return await zk.sendMessage(origineMessage, { text: "Aucun résultat trouvé." });
        }

        const song = searchResults.items[0];
        const videoInfo = {
            url: song.url,
            title: song.name,
            views: song.views,
            duration: song.duration,
            thumbnail: song.thumbnail,
        };

        const caption = `╭─── 〔 HACKING-MD PLAYLIST 〕 ──⬣\n⬡ Titre: ${videoInfo.title}\n⬡ URL: ${videoInfo.url}\n⬡ Vues: ${videoInfo.views}\n⬡ Durée: ${videoInfo.duration}\n╰───────────────────⬣`;

        await zk.sendMessage(origineMessage, { image: { url: videoInfo.thumbnail }, caption });
        await sendMedia(origineMessage, zk, videoInfo.url, "ogg", "audio");
    } catch (error) {
        console.error("Erreur lors du téléchargement de la chanson:", error.message);
        await zk.sendMessage(origineMessage, { text: "Erreur lors du téléchargement." });
    }
});

// Commande pour télécharger une vidéo via YouTube
zokou({
    nomCom: "video",
    categorie: "Téléchargement",
    reaction: "🎥",
    desc: "Télécharge une vidéo depuis YouTube avec un terme de recherche",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    if (!arg.length) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez spécifier un titre de vidéo ou un lien YouTube.",
        });
    }

    const query = arg.join(" ");
    await zk.sendMessage(origineMessage, { text: "Veuillez patienter, je recherche..." });

    try {
        const searchResults = await ytsr(query, { limit: 1 });
        if (searchResults.items.length === 0) {
            return await zk.sendMessage(origineMessage, { text: "Aucun résultat trouvé." });
        }

        const video = searchResults.items[0];
        const videoInfo = {
            url: video.url,
            title: video.name,
            views: video.views,
            duration: video.duration,
            thumbnail: video.thumbnail,
        };

        const caption = `╭─── 〔 HACKING-MD VIDEO 〕 ──⬣\n⬡ Titre: ${videoInfo.title}\n⬡ URL: ${videoInfo.url}\n⬡ Vues: ${videoInfo.views}\n⬡ Durée: ${videoInfo.duration}\n╰───────────────────⬣`;

        await zk.sendMessage(origineMessage, { image: { url: videoInfo.thumbnail }, caption });
        await sendMedia(origineMessage, zk, video.url, "480", "video");
    } catch (error) {
        console.error("Erreur lors du téléchargement de la vidéo:", error.message);
        await zk.sendMessage(origineMessage, { text: "Erreur lors du téléchargement." });
    }
});

// Commande pour télécharger une vidéo Facebook
zokou({
    nomCom: "fabdl",
    categorie: "Téléchargement",
    reaction: "📥",
    desc: "Télécharge une vidéo depuis Facebook en HD",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    const videoLink = arg.join(" ");
    if (!videoLink) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez fournir un lien vidéo Facebook, par exemple : fabdl https://www.facebook.com/video-link",
        });
    }

    try {
        const videoDownloadLink = await fbdl(videoLink);
        const response = await axios.get(videoDownloadLink, { responseType: "arraybuffer" });
        const videoBuffer = Buffer.from(response.data);

        return await zk.sendMessage(origineMessage, { video: videoBuffer, caption: `\`\`\`Powered By Zokou\`\`\`` });
    } catch (error) {
        console.error("Erreur:", error.message);
        await zk.sendMessage(origineMessage, { text: `Erreur: ${error.message}` });
    }
});

// Commande pour télécharger une vidéo TikTok
zokou({
    nomCom: "tikdl2",
    categorie: "Téléchargement",
    reaction: "📥",
    desc: "Télécharge une vidéo depuis TikTok",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    const videoLink = arg.join(" ");
    if (!videoLink) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez fournir un lien vidéo TikTok, par exemple : tikdl2 https://vm.tiktok.com/ZMkr2TbuQ/",
        });
    }

    try {
        const downloadLinks = await ttdl(videoLink);
        const video = await axios.get(downloadLinks.result.nowatermark, {
            responseType: "arraybuffer",
            headers: {
                "Accept": "application/octet-stream",
                "Content-Type": "application/octet-stream",
                "User-Agent": "GoogleBot",
            },
        });

        return await zk.sendMessage(origineMessage, { video: Buffer.from(video.data), caption: `\`\`\`Powered By HACKING-MD\`\`\`` });
    } catch (error) {
        console.error("Erreur:", error.message);
        await zk.sendMessage(origineMessage, { text: `Erreur: ${error.message}` });
    }
});

// Commande pour télécharger une chanson via un lien YouTube
zokou({
    nomCom: "ytmp3",
    categorie: "Téléchargement",
    reaction: "🎵",
    desc: "Télécharge une chanson depuis un lien YouTube",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    if (!arg.length) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez spécifier un lien YouTube.",
        });
    }

    const url = arg.join(" ");
    await zk.sendMessage(origineMessage, { text: "Veuillez patienter, je télécharge..." });

    try {
        await sendMedia(origineMessage, zk, url, "ogg", "audio");
    } catch (error) {
        console.error("Erreur lors du téléchargement de la chanson:", error.message);
        await zk.sendMessage(origineMessage, { text: "Erreur lors du téléchargement." });
    }
});

// Commande pour télécharger une vidéo via un lien YouTube
zokou({
    nomCom: "ytmp4",
    categorie: "Téléchargement",
    reaction: "🎥",
    desc: "Télécharge une vidéo depuis un lien YouTube",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    if (!arg.length) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez spécifier un lien YouTube.",
        });
    }

    const url = arg.join(" ");
    await zk.sendMessage(origineMessage, { text: "Veuillez patienter, je télécharge..." });

    try {
        await sendMedia(origineMessage, zk, url, "480", "video");
    } catch (error) {
        console.error("Erreur lors du téléchargement de la vidéo:", error.message);
        await zk.sendMessage(origineMessage, { text: "Erreur lors du téléchargement." });
    }
});

// Commande pour récupérer les informations des vidéos via une recherche YouTube
zokou({
    nomCom: "yts",
    categorie: "Recherche",
    reaction: "🔍",
    desc: "Récupère les informations de vidéos YouTube selon un terme de recherche",
}, async (origineMessage, zk, commandeOptions) => {
    const { arg } = commandeOptions;

    if (!arg.length) {
        return await zk.sendMessage(origineMessage, {
            text: "Veuillez spécifier un terme de recherche.",
        });
    }

    const query = arg.join(" ");
    await zk.sendMessage(origineMessage, { text: "Veuillez patienter, je recherche..." });

    try {
        const searchResults = await ytsr(query, { limit: 15 }); // Limite à 15 résultats
        if (searchResults.items.length === 0) {
            return await zk.sendMessage(origineMessage, { text: "Aucun résultat trouvé." });
        }

        let responseMessage = "Voici les résultats de votre recherche :\n\n";
        searchResults.items.forEach((item, index) => {
            responseMessage += `**${index + 1}. HACKING-MD ${item.name}**\n`;
            responseMessage += `➡️ URL: ${item.url}\n`;
            responseMessage += `➡️ Vues: ${item.views}\n`;
            responseMessage += `➡️ Durée: ${item.duration}\n\n`;
        });

        return await zk.sendMessage(origineMessage, { text: responseMessage });
    } catch (error) {
        console.error("Erreur lors de la recherche:", error.message);
        await zk.sendMessage(origineMessage, { text: "Erreur lors de la recherche des vidéos." });
    }
});
