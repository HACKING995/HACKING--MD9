const { zokou } = require("../framework/zokou");
const fbDownloader = require("@xaviabot/fb-downloader");
const fs = require('fs');
const { default: axios } = require("axios");

// Commande Instagram Download
zokou({
    nomCom: "igdl",
    categorie: "Téléchargement",
    desc: "Télécharger une vidéo ou une image Instagram"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let url = arg.join(" ");
    
    if (!arg[0]) {
        repondre("Veuillez insérer un lien video Instagram");
        return;
    }

    try {
        let response = await axios("http://api.maher-zubair.tech/download/instagram?url=" + url);
        try {
            // Tentative d'envoi en tant que vidéo
            await zk.sendMessage(dest, {
                video: { url: response.data.result[0].url },
                caption: "ig video downloader powered by *Zokou-Md*",
                gifPlayback: false
            }, { quoted: ms });
        } catch (error) {
            // Si échec, envoi en tant qu'image
            await zk.sendMessage(dest, {
                image: { url: response.data.result[0].url },
                caption: "ig image downloader powered by *Zokou-Md*"
            });
        }
    } catch (error) {
        repondre("Erreur survenue lors du téléchargement \n " + error);
    }
});

// Commande Facebook Download HD
zokou({
    nomCom: "fbdl",
    categorie: "Téléchargement",
    reaction: "📽️",
    desc: "Télécharger une vidéo ou une image Facebook en HD"
}, async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;

    if (!arg[0]) {
        repondre("Veuillez fournir une URL vidéo publique de Facebook à télécharger !");
        return;
    }

    const url = arg.join(" ");
    try {
        fbDownloader(url).then(result => {
            let caption = `
                titre: ${result.title}
                Lien: ${result.url}
            `;
            
            zk.sendMessage(dest, {
                image: { url: result.thumbnail },
                caption: caption
            }, { quoted: ms });

            zk.sendMessage(dest, {
                video: { url: result.hd },
                caption: "Téléchargeur de vidéo Facebook, propulsé par *HACKING-MD*"
            }, { quoted: ms });
        }).catch(error => {
            console.log("Error:", error);
            repondre(error);
        });
    } catch (error) {
        console.error("Erreur lors du téléchargement de la vidéo :", error);
        repondre("Erreur lors du téléchargement de la vidéo.", error);
    }
});

// Commande TikTok Video
zokou({
    nomCom: "tiktok",
    categorie: "Téléchargement",
    reaction: '🎵',
    desc: "Télécharger une vidéo Tiktok",
    alias: ["ttv"]
}, async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;

    if (!arg[0]) {
        repondre(`Voici comment utiliser la commande:\n ${prefixe}tiktok lien_video_tiktok`);
        return;
    }

    const url = arg.join(" ");
    try {
        let response = await axios({
            url: `https://test-api-apms.onrender.com/api/tiktokv2?url=${url}&apikey=BrunoSobrino`,
            method: "GET",
            responseType: "arraybuffer"
        });

        fs.writeFileSync("./tiktokvideo.mp4", Buffer.from(response.data));
        await zk.sendMessage(dest, {
            video: { url: "./tiktokvideo.mp4" },
            caption: "Et voila!",
            gifPlayback: false
        });
        console.log("Done!");
    } catch (error) {
        repondre("Erreur lors du telechargement de la video");
        console.log(error);
    } finally {
        fs.unlinkSync("./tiktokvideo.mp4");
    }
});

// Commande Facebook Download (Basse qualité)
zokou({
    nomCom: "fbdl2",
    categorie: "Téléchargement",
    reaction: "📽️",
    desc: "Télécharger une vidéo ou une image Facebook en faible qualité"
}, async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;

    if (!arg[0]) {
        repondre("Veuillez fournir une URL vidéo publique de Facebook à télécharger !");
        return;
    }

    const url = arg.join(" ");
    try {
        fbDownloader(url).then(result => {
            let caption = `
                titre: ${result.title}
                Lien: ${result.url}
            `;
            
            zk.sendMessage(dest, {
                image: { url: result.thumbnail },
                caption: caption
            }, { quoted: ms });

            zk.sendMessage(dest, {
                video: { url: result.sd },
                caption: "Téléchargeur de vidéo Facebook, propulsé par *HACKIN-MD*"
            }, { quoted: ms });
        }).catch(error => {
            console.log("Error:", error);
            repondre(error);
        });
    } catch (error) {
        console.error("Erreur lors du téléchargement de la vidéo :", error);
        repondre("Erreur lors du téléchargement de la vidéo.", error);
    }
});
