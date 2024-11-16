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
                caption: "ig image downloader powered by *HACKIN-MD*"
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
    nomCom: "tiktok2",
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



zokou({
  'nomCom': "xvid",
  'categorie': "Download",
  'aliases': ["xxx", "porn", "xxxnx"]
}, async (dest, zk, commandeOptions) => {
  const {
    ms,
    repondre,
    arg
  } = commandeOptions;

  let inputLink = arg.join(" ");
  
  const linkMap = {
    'xvid': "https://example.com/xvid",
    'porn': "https://example.com/porn",
    'xxxnx': "https://example.com/xxxnx"
  };

  if (linkMap[inputLink]) {
    inputLink = linkMap[inputLink];
  }

  if (!arg[0]) {
    repondre("Please insert an *X Video Link* for *FLASH-MD* to download");
    return;
  }

  try {
    const response = await fetch('https://api.prabath-md.tech/api/xvdl?url=' + encodeURIComponent(inputLink));
    const data = await response.json();

    if (data && data.data && data.data.download) {
      const downloadLink = data.data.download;
      await zk.sendMessage(dest, {
        'video': {
          'url': downloadLink
        },
        'caption': "Here is your 18+ Video.\n_╰►DOWNLOADED BY_ *FLASH-MD*",
        'gifPlayback': false
      }, {
        'quoted': ms
      });
    } else {
      repondre("No downloadable link found for the provided URL.");
    }
  } catch (error) {
    repondre("I am unable to download your media.\n" + error.message);
  }
});



zokou({
  'nomCom': 'twitter2',
  'aliases': ['xdl'],
  'categorie': 'Download',
  'reaction': '🐦'
}, async (dest, zk, commandeOptions) => {
  const {
    repondre,
    ms,
    arg
  } = commandeOptions;

  const twitterUrl = extractUrlFromMessage(arg);
  
  if (!twitterUrl) {
    return repondre("Please provide a valid Twitter URL.");
  }

  try {
    const response = await fetch("https://api.guruapi.tech/xdown?url=" + encodeURIComponent(twitterUrl));
    const data = await response.json();

    if (!data || !data.media || data.media.length === 0) {
      return repondre("No media found or invalid response from API.");
    }

    for (const mediaItem of data.media) {
      const mediaType = mediaItem.type;
      const mediaUrl = mediaItem.url;
      const caption = mediaType === "video" 
        ? "_╰►VIDEO  DOWNLOADED BY_ *HACKIND-MD*" 
        : "_╰►IMAGE DOWNLOADED BY_ *HACKING-MD*";

      if (mediaType === "video") {
        await zk.sendMessage(dest, {
          'video': {
            'url': mediaUrl
          },
          'caption': caption
        }, {
          'quoted': ms
        });
      } else if (mediaType === "image") {
        await zk.sendMessage(dest, {
          'image': {
            'url': mediaUrl
          },
          'caption': caption
        }, {
          'quoted': ms
        });
      }
    }
  } catch (error) {
    console.error("Error occurred while retrieving data:", error);
    repondre("Error occurred while retrieving data: " + error.message);
  }
});

function extractUrlFromMessage(arg) {
  const message = Array.isArray(arg) ? arg.join(" ") : arg;
  const match = message.match(/https:\/\/(x|twitter)\.com\/[^\s]+/);
  return match ? match[0] : null;
}









zokou({
  'nomCom': "tiktok",
  'categorie': "Download",
  'aliases': ["tik", "tok", 'tikdl']
}, async (dest, zk, commandeOptions) => {
  const {
    ms,
    repondre,
    arg
  } = commandeOptions;

  const videoLink = arg.join(" ");
  
  if (!videoLink) {
    return repondre("Please insert a TikTok video link!");
  }

  try {
    const response = await fetch("https://api.prabath-md.tech/api/tiktokdl?url=" + encodeURIComponent(videoLink));
    const data = await response.json();
    
    if (!data.data || !data.data.no_wm) {
      return repondre("Failed to retrieve video. Please check the link and try again.");
    }

    await repondre("A moment, *FLASH-MD* is downloading that...");
    const videoUrl = data.data.no_wm;

    await zk.sendMessage(dest, {
      'video': {
        'url': videoUrl
      },
      'caption': "╰►𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐓𝐢𝐤𝐓𝐨𝐤 𝐕𝐢𝐝𝐞𝐨!\n𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐝 𝐛𝐲 *HACKING-𝐌𝐃*",
      'gifPlayback': false
    }, {
      'quoted': ms
    });
    
  } catch (error) {
    console.error(error);
    await repondre("An error occurred while processing the request. Please try again later.");
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
