const { zokou } = require("../framework/zokou");
const { fbdl, ttdl, igdl, twitterdl, ytdl } = require("../framework/dl");
const ytsr = require('@distube/ytsr');
const axios = require('axios');

// Fonction pour envoyer des fichiers média (audio/vidéo)
async function sendMedia(dest, zk, url, format, type) {
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
            caption: `\`\`\`Powered By HACKING-MD `\`\``,
        };

        return await zk.sendMessage(dest.id, message);
    } catch (error) {
        console.error("Erreur lors de l'envoi du média:", error.message);
        throw error;
    }
}

// Commande pour télécharger une chanson via YouTube
zokou(
    {
        nomCom: "song",
        categorie: "Telechargement",
        reaction: "🎵",
        desc: "Télécharge une chanson depuis YouTube avec un terme de recherche",
        alias: ["play"],
    },
    async (dest, zk, commandeOptions) => {
        const { arg } = commandeOptions;
        if (!arg.length) {
            return await zk.sendMessage(dest.id, {
                text: "Veuillez spécifier un titre de chanson ou un lien YouTube.",
            });
        }

        const query = arg.join(" ");
        try {
            const searchResults = await ytsr(query, { limit: 1 });
            if (searchResults.items.length === 0) {
                return await zk.sendMessage(dest.id, { text: "Aucun résultat trouvé." });
            }

            const song = searchResults.items[0];
            const videoInfo = {
                url: song.url,
                title: song.name,
                views: song.views,
                duration: song.duration,
                thumbnail: song.thumbnail,
            };

            const caption = `╭─── 〔 HACKING-MD SONG 〕 ──⬣\n⬡ Titre: ${videoInfo.title}\n⬡ URL: ${videoInfo.url}\n⬡ Vues: ${videoInfo.views}\n⬡ Durée: ${videoInfo.duration}\n╰───────────────────⬣`;

            await zk.sendMessage(dest.id, { image: { url: videoInfo.thumbnail }, caption });

            await sendMedia(dest, zk, videoInfo.url, "ogg", "audio");
        } catch (error) {
            console.error("Erreur Song Downloader:", error.message);
            await zk.sendMessage(dest.id, { text: "Erreur lors du téléchargement." });
        }
    }
);

// Commande pour télécharger une vidéo via YouTube
zokou(
    {
        nomCom: "video",
        categorie: "Telechargement",
        reaction: "🎥",
        desc: "Télécharge une vidéo depuis YouTube avec un terme de recherche",
    },
    async (dest, zk, commandeOptions) => {
        const { arg } = commandeOptions;

        if (!arg.length) {
            return await zk.sendMessage(dest.id, {
                text: "Veuillez spécifier un titre de vidéo ou un lien YouTube.",
            });
        }

        const query = arg.join(" ");
        try {
            const searchResults = await ytsr(query, { limit: 1 });
            if (searchResults.items.length === 0) {
                return await zk.sendMessage(dest.id, { text: "Aucun résultat trouvé pour cette recherche." });
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

            await zk.sendMessage(dest.id, {
                image: { url: videoInfo.thumbnail },
                caption: caption,
            });
            await sendMedia(dest, zk, video.url, "480", "video");
        } catch (error) {
            await zk.sendMessage(dest.id, {
                text: "Une erreur est survenue lors du traitement de votre commande.",
            });
        }
    }
);

// Commande pour télécharger une vidéo Facebook
zokou(
    {
        nomCom: "fabdl",
        categorie: "Telechargement",
        reaction: "📥",
        desc: "Télécharge une vidéo depuis Facebook en HD",
    },
    async (dest, zk, commandeOptions) => {
        const { arg } = commandeOptions;

        const videoLink = arg.join(" ");
        if (!videoLink) {
            return zk.sendMessage(dest.id, {
                text: "Veuillez fournir un lien vidéo Facebook, par exemple : fbdl https://www.facebook.com/video-link",
            });
        }

        try {
            const videoDownloadLink = await fbdl(videoLink);
            const response = await axios.get(videoDownloadLink, { responseType: "arraybuffer" });
            const videoBuffer = Buffer.from(response.data);

            return zk.sendMessage(dest.id, { video: videoBuffer, caption: `\`\`\`Powered By Zokou\`\`\`` });
        } catch (error) {
            zk.sendMessage(dest.id, { text: `Erreur: ${error.message}` });
            console.error("Erreur:", error);
        }
    }
);

// Commande pour télécharger une vidéo TikTok
zokou(
    {
        nomCom: "tikdl2",
        categorie: "Telechargement",
        reaction: "📥",
        desc: "Télécharge une vidéo depuis TikTok",
    },
    async (dest, zk, commandeOptions) => {
        const { arg } = commandeOptions;

        const videoLink = arg.join(" ");
        if (!videoLink) {
            return zk.sendMessage(dest.id, {
                text: "Veuillez fournir un lien vidéo TikTok, par exemple : ttdl https://vm.tiktok.com/ZMkr2TbuQ/",
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

            return zk.sendMessage(dest.id, { video: Buffer.from(video.data), caption: `\`\`\`Powered By HACKING-MD \`\`\`` });
        } catch (error) {
            zk.sendMessage(dest.id, { text: `Erreur: ${error.message}` });
            console.error("Erreur:", error);
        }
    }
);
