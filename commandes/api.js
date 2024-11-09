const { zokou } = require("../framework/zokou");
const { downloadInstagram, downloadTwitter } = require("gifted-dls");
const BaseUrl = 'https://api.giftedtech.my.id';
const giftedapikey = '_0x5aff35,_0x1876r';

// Commande pour télécharger des vidéos Instagram
zokou({
  nomCom: "insta2",
  categorie: "Téléchargement",
  reaction: "📸"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien IG s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiResult = await downloadInstagram(videoUrl, giftedapikey, { baseUrl: BaseUrl });

    if (apiResult.success && apiResult.result.length > 0) {
      const { url } = apiResult.result[0];

      await zk.sendMessage(origineMessage, {
        video: { url: url },
        mimetype: 'video/mp4'
      }, { quoted: ms });

      repondre('Téléchargement réussi Thomas...');
    } else {
      repondre('Échec du téléchargement de l\'video. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de l\'video.');
  }
});

// Commande pour télécharger des vidéos Twitter
zokou({
  nomCom: "twitter2",
  categorie: "Téléchargement",
  reaction: "🐦"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien Twitter s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiResult = await downloadTwitter(videoUrl, giftedapikey, { baseUrl: BaseUrl });

    // Log de la réponse de l'API pour débogage
    console.log('Réponse de l\'API Twitter :', apiResult);

    if (apiResult.success && apiResult.result.downloads && apiResult.result.downloads.length > 0) {
      const downloads = apiResult.result.downloads;
      const { url } = downloads[0]; // Prendre le premier lien disponible

      await zk.sendMessage(origineMessage, {
        video: { url: url },
        mimetype: 'video/mp4'
      }, { quoted: ms });

      repondre('Téléchargement réussi avec Twitter Thomas...');
    } else {
      repondre('Aucun téléchargement disponible. Veuillez vérifier le lien et réessayer.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});
