const { zokou } = require("../framework/zokou");
const BaseUrl = 'https://api.giftedtech.my.id';
const giftedapikey = '_0x5aff35,_0x1876r';

// Commande pour télécharger des vidéos Instagram
zokou({
  nomCom: "insta",
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
    const apiUrl = `${BaseUrl}/api/download/instadlv3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
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
  nomCom: "twitter",
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
    const apiUrl = `${BaseUrl}/api/download/twitter?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    // Log de la réponse de l'API pour débogage
    console.log('Réponse de l\'API Twitter :', apiResult);

    if (apiResult.status === 200 && apiResult.success) {
      if (apiResult.result && apiResult.result.downloads && apiResult.result.downloads.length > 0) {
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
    } else {
      repondre('Échec du téléchargement de la vidéo. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});
