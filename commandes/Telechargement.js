const { ovlcmd } = require("../framework/ovlcmd");
const { fbdl, ttdl, igdl, twitterdl, ytdl } = require("../framework/dl");
const ytsr = require('@distube/ytsr');
const axios = require('axios');

async function sendMedia(ms_org, ovl, url, format, type) {
  try {
    const downloadLink = await ytdl(url, format);
    if (!downloadLink) {
      throw new Error("Le lien de téléchargement est introuvable.");
    }

    // Téléchargement des données du fichier
    const media = await axios.get(downloadLink, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "GoogleBot",
      },
    });

    const message = {
      [type]: Buffer.from(media.data),
      mimetype: format === "ogg" ? "audio/mpeg" : "video/mp4",
      caption: `\`\`\`Powered By OVL-MD\`\`\``
    };

    return await ovl.sendMessage(ms_org, message);
  } catch (error) {
    console.error("Erreur lors de l'envoi du média:", error.message);
    throw error;
  }
}


ovlcmd(
    {
        nom_cmd: "song",
        classe: "Telechargement",
        react: "🎵",
        desc: "Télécharge une chanson depuis YouTube avec un terme de recherche",
        alias: ["play"],
    },
    async (ms_org, ovl, cmd_options) => {
        const { arg, ms } = cmd_options;
        if (!arg.length) {
            return await ovl.sendMessage(ms_org, {
                text: "Veuillez spécifier un titre de chanson ou un lien YouTube.",
            });
        }

        const query = arg.join(" ");
        try {
            const searchResults = await ytsr(query, { limit: 1 });
            if (searchResults.items.length === 0) {
                return await ovl.sendMessage(ms_org, { text: "Aucun résultat trouvé." });
            }

            const song = searchResults.items[0];
            const videoInfo = {
                url: song.url,
                title: song.name,
                views: song.views,
                duration: song.duration,
                thumbnail: song.thumbnail,
            };

            const caption = `╭─── 〔 OVL-MD SONG 〕 ──⬣\n⬡ Titre: ${videoInfo.title}\n⬡ URL: ${videoInfo.url}\n⬡ Vues: ${videoInfo.views}\n⬡ Durée: ${videoInfo.duration}\n╰───────────────────⬣`;

            await ovl.sendMessage(ms_org, { image: { url: videoInfo.thumbnail }, caption });

            await sendMedia(ms_org, ovl, videoInfo.url, "ogg", "audio");
        } catch (error) {
            console.error("Erreur Song Downloader:", error.message);
            await ovl.sendMessage(ms_org, { text: "Erreur lors du téléchargement." });
        }
    }
);
// Commande 1: Recherche et téléchargement de vidéo depuis YouTube
ovlcmd(
    {
        nom_cmd: "video",
        classe: "Telechargement",
        react: "🎥",
        desc: "Télécharge une vidéo depuis YouTube avec un terme de recherche",
    },
    async (ms_org, ovl, cmd_options) => {
        const { repondre, arg, ms } = cmd_options;

        if (!arg.length) {
            return await ovl.sendMessage(ms_org, {
                text: "Veuillez spécifier un titre de vidéo ou un lien YouTube.",
            });
        }

        const query = arg.join(" ");
        try {
            const searchResults = await ytsr(query, { limit: 1 });
            if (searchResults.items.length === 0) {
                return await ovl.sendMessage(ms_org, { text: "Aucun résultat trouvé pour cette recherche." });
            }

            const video = searchResults.items[0];
            const videoInfo = {
                url: video.url,
                title: video.name,
                views: video.views,
                duration: video.duration,
                thumbnail: video.thumbnail,
            };

            const caption = `╭─── 〔 OVL-MD VIDEO 〕 ──⬣\n⬡ Titre: ${videoInfo.title}\n⬡ URL: ${videoInfo.url}\n⬡ Vues: ${videoInfo.views}\n⬡ Durée: ${videoInfo.duration}\n╰───────────────────⬣`;

            await ovl.sendMessage(ms_org, {
                image: { url: videoInfo.thumbnail },
                caption: caption,
            });
            await sendMedia(ms_org, ovl, video.url, "480", "video");
        } catch (error) {
            await ovl.sendMessage(ms_org, {
                text: "Une erreur est survenue lors du traitement de votre commande.",
            });
        }
    }
);

// Commande pour télécharger l'audio
ovlcmd(
  {
    nom_cmd: "yta",
    classe: "Telechargement",
    react: "🎧",
    desc: "Télécharger de l'audio depuis YouTube à l\'aide d'un lien",
    alias: ["ytmp3"],
  },
  async (ms_org, ovl, cmd_options) => {
    const { arg } = cmd_options;
    const videoLink = arg.join(" ");
    if (!videoLink) {
      return ovl.sendMessage(ms_org, {
        text: "Veuillez fournir un lien vidéo YouTube, par exemple : yta https://www.youtube.com/watch?v=abcd1234",
      });
    }

    try {
      await sendMedia(ms_org, ovl, videoLink, "ogg", "audio");
    } catch (error) {
      ovl.sendMessage(ms_org, { text: `Erreur: ${error.message}` });
    }
  }
);

// Commande pour télécharger la vidéo
ovlcmd(
  {
    nom_cmd: "ytv",
    classe: "Telechargement",
    react: "🎬",
    desc: "Télécharger une vidéo depuis YouTube à l\'aide d'un lien ",
    alias: ["ytmp4"],
  },
  async (ms_org, ovl, cmd_options) => {
    const { arg } = cmd_options;
    const videoLink = arg.join(" ");
    if (!videoLink) {
      return ovl.sendMessage(ms_org, {
        text: "Veuillez fournir un lien vidéo YouTube, par exemple : ytv https://www.youtube.com/watch?v=abcd1234",
      });
    }

    try {
      await sendMedia(ms_org, ovl, videoLink, "480", "video");
    } catch (error) {
      ovl.sendMessage(ms_org, { text: `Erreur: ${error.message}` });
    }
  }
);

ovlcmd(
  {
    nom_cmd: "fbdl",
    classe: "Telechargement",
    react: "📥",
    desc: "Télécharger ou envoyer directement une vidéo depuis Facebook en HD"
  },
  async (ms_org, ovl, cmd_options) => {
    const { arg } = cmd_options;
    const videoLink = arg.join(" ");
    
    if (!videoLink) {
      return ovl.sendMessage(ms_org, { text: "Veuillez fournir un lien vidéo, par exemple : fbdl https://www.facebook.com/video-link" });
    }

    try {
      const videoDownloadLink = await fbdl(videoLink);
      const response = await axios.get(videoDownloadLink, { responseType: 'arraybuffer' });
      const videoBuffer = Buffer.from(response.data);

      return ovl.sendMessage(ms_org, { video: videoBuffer, caption: `\`\`\`Powered By OVL-MD\`\`\`` });

    } catch (error) {
      ovl.sendMessage(ms_org, { text: `Erreur: ${error.message}` });
      console.error('Error:', error);
      return ovl.sendMessage(ms_org, { text: `Erreur: ${error.message}` });
    }
  }
);

ovlcmd(
  {
    nom_cmd: "ttdl",
    classe: "Telechargement",
    react: "📥",
    desc: "Télécharger ou envoyer directement une vidéo depuis TikTok"
  },
  async (ms_org, ovl, cmd_options) => {
    const { arg } = cmd_options;
    const videoLink = arg.join(" ");
    
    if (!videoLink) {
      return ovl.sendMessage(ms_org, { text: "Veuillez fournir un lien vidéo TikTok, par exemple : ttdl https://vm.tiktok.com/ZMkr2TbuQ/" });
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

      return ovl.sendMessage(ms_org, { video: Buffer.from(video.data), caption: `\`\`\`Powered By OVL-MD\`\`\`` });

    } catch (error) {
      ovl.sendMessage(ms_org, { text: `Erreur: ${error}` });
      console.error('Error:', error);
    }
  }
);

ovlcmd(
  {
    nom_cmd: "igdl",
    classe: "Telechargement",
    react: "📥",
    desc: "Télécharger ou envoyer directement une vidéo depuis Instagram",
  },
  async (ms_org, ovl, cmd_options) => {
    const { arg } = cmd_options;
    const videoLink = arg.join(" ");

    if (!videoLink) {
      return ovl.sendMessage(ms_org, {
        text: "Veuillez fournir un lien vidéo Instagram, par exemple : igdl https://www.instagram.com/reel/DDxRhkxPyNc/",
      });
    }
    try {
      const downloadLinks = await igdl(videoLink);
      const video = await axios.get(downloadLinks.result.video, {
        responseType: "arraybuffer",
        headers: {
          "Accept": "application/octet-stream",
          "Content-Type": "application/octet-stream",
          "User-Agent": "GoogleBot",
        },
      });
	    
      return ovl.sendMessage(ms_org, {
        video: Buffer.from(video.data),
        caption: `\`\`\`Powered By OVL-MD\`\`\``
      });
    } catch (error) {
      ovl.sendMessage(ms_org, { text: `Erreur: ${error.message}` });
      console.error("Error:", error);
    }
  }
);

ovlcmd(
  {
    nom_cmd: "twitterdl",
    classe: "Telechargement",
    react: "📥",
    desc: "Télécharger ou envoyer directement une vidéo depuis Twitter",
  },
  async (ms_org, ovl, cmd_options) => {
    const { arg } = cmd_options;
    const videoLink = arg.join(" ");

    if (!videoLink) {
      return ovl.sendMessage(ms_org, {
        text: "Veuillez fournir un lien vidéo Twitter, par exemple : twitterdl https://twitter.com/username/status/1234567890",
      });
    }

    try {
      const downloadLinks = await twitterdl(videoLink);

      const video = await axios.get(downloadLinks.result.video, {
        responseType: "arraybuffer",
        headers: {
          "Accept": "application/octet-stream",
          "Content-Type": "application/octet-stream",
          "User-Agent": "GoogleBot",
        },
      });

      return ovl.sendMessage(ms_org, {
        video: Buffer.from(video.data),
        caption: `\`\`\`Powered By OVL-MD\`\`\``
      });
    } catch (error) {
      ovl.sendMessage(ms_org, { text: `Erreur: ${error.message}` });
      console.error("Error:", error);
    }
  }
);
