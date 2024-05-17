const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
//var fs =require("fs-extra")

zokou({nomCom: "play", 
categorie: "Recherche",
reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Veuillez entrer un terme de recherche s'il vous plaît.");
    return;
  }

  try {
    let topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       let infoMess = {
  image: { url: videos[0].thumbnail },
  caption: `╭━━⊱𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗⊱━━╮
*Song Name:* ${videos[0].title}

*Uploaded:* ${videos[0].ago}

*Author:* ${videos[0].author.name}

*URL:* ${videos[0].url}

Views: ${videos[0].views}

*Choose format :*
1. MP3
2. MP4
_*En cours de téléchargement...*_\n\n`
       }

       zk.sendMessage(origineMessage, infoMess, { quoted: ms });

       // Obtenir le flux audio de la vidéo
       const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

       // Nom du fichier local pour sauvegarder le fichier audio
       const filename = 'audio.mp3';

       // Écrire le flux audio dans un fichier local
       const fileStream = fs.createWriteStream(filename);
       audioStream.pipe(fileStream);

       fileStream.on('finish', () => {
         // Envoi du fichier audio en utilisant l'URL du fichier local
         zk.sendMessage(origineMessage, { audio: { url: "audio.mp3" }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
         console.log("Envoi du fichier audio terminé !");
       });

       fileStream.on('error', (error) => {
         console.error('Erreur lors de l\'écriture du fichier audio :', error);
         repondre('Une erreur est survenue lors de l\'écriture du fichier audio.');
       });
       
       zk.waitForMessage(origineMessage, async (message) => {
         const choix = message.body.toLowerCase();
         if (choix === '1' || choix === 'mp3') {
           // Envoi du fichier audio MP3
           zk.sendMessage(origineMessage, { audio: { url: "audio.mp3" }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
         } else if (choix === '2' || choix === 'mp4') {
           // Envoi de la vidéo MP4
           zk.sendMessage(origineMessage, { video: { url: urlElement }, mimetype: 'video/mp4' }, { quoted: ms });
         } else {
           // Choix invalide
           repondre("Choix invalide. Veuillez sélectionner soit '1' (MP3) ou '2' (MP4).");
         }
       });
    } else {
      repondre('Aucune vidéo trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});

  

zokou({
  nomCom: "video",
  categorie: "Recherche",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Veillez entrer un terme de recherche s'il vous plaît");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
  image: { url: Element.thumbnail },
  caption: `╭━━⊱𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗⊱━━╮
*Video Name:* ${Element.title}
*Uploaded:* ${Element.ago}
*Author:* ${Element.author.name}
*URL:* ${Element.url}

*Choose format:*
1. MP3
2. MP4

_*Downloading...*_`
};

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Obtenir les informations de la vidéo à partir du lien YouTube
      const videoInfo = await ytdl.getInfo(Element.url);
      // Format vidéo avec la meilleure qualité disponible
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Télécharger la vidéo
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Nom du fichier local pour sauvegarder la vidéo
      const filename = 'video.mp4';

      // Écrire le flux vidéo dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier vidéo en utilisant l'URL du fichier local
        zk.sendMessage(origineMessage, { video: { url :"./video.mp4"} , caption: "*Hacking-Md", gifPlayback: false }, { quoted: ms });
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'écriture du fichier vidéo :', error);
        repondre('Une erreur est survenue lors de l\'écriture du fichier vidéo.');
      });
    } else {
      repondre('Aucune vidéo trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});
