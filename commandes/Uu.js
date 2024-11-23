const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "url4",
  categorie: "Conversion",
  reaction: "🌐",
  desc: "Téléverse une image, vidéo ou sticker vers Catbox et obtient l'URL",
  alias: ["up"]
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, repondre, nomAuteurMessage } = commandeOptions;

  // Vérifie si un message a été mentionné
  if (!msgRepondu) {
    return repondre("Veuillez mentionner une image, vidéo ou sticker.");
  }

  const mediaMessage = msgRepondu.viewOnceMessageV2 || msgRepondu.viewOnceMessageV2Extension || msgRepondu.message;
  
  let mediaUrl;

  // Vérifie le type de média et télécharge le bon type
  if (mediaMessage.imageMessage) {
    mediaUrl = await zk.downloadAndSaveMediaMessage(mediaMessage.imageMessage);
  } else if (mediaMessage.videoMessage) {
    mediaUrl = await zk.downloadAndSaveMediaMessage(mediaMessage.videoMessage);
  } else if (mediaMessage.stickerMessage) {
    mediaUrl = await zk.downloadAndSaveMediaMessage(mediaMessage.stickerMessage);
  } else {
    return repondre("Le message mentionné n'est pas une image, vidéo ou sticker valide.");
  }

  try {
    // Envoie le fichier vers Catbox
    const response = await axios.post("https://catbox.moe/user/api.php", {
      fileToUpload: mediaUrl,
      reqtype: "fileupload"
    });

    const uploadedImageUrl = response.data;
    repondre(`Voici l'URL de votre média téléversé : ${uploadedImageUrl}`);
  } catch (error) {
    console.error("Erreur lors du téléversement du média :", error);
    repondre("Échec du téléversement du média. Veuillez réessayer.");
  }
});
