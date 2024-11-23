const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "url2",
  categorie: "Conversion",
  reaction: "🌐",
  desc: "Téléverse une image, vidéo ou sticker vers Catbox et obtient l'URL.",
  alias: ["up"]
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, msgRepondu } = commandeOptions;

  // Vérifiez si le message contient une pièce jointe (image, vidéo, sticker)
  const attachment = msgRepondu.attachments[0];

  if (!attachment) {
    return repondre("Veuillez fournir une image, vidéo ou sticker.");
  }

  const fileUrl = attachment.url;

  try {
    const response = await axios.post("https://catbox.moe/user/api.php", {
      fileToUpload: fileUrl,
      reqtype: "urlupload"
    });

    const uploadedImageUrl = response.data;
    repondre(`Voici l'URL de votre fichier téléversé : ${uploadedImageUrl}`);
  } catch (error) {
    console.error("Erreur lors du téléversement du fichier :", error);
    repondre("Échec du téléversement du fichier. Veuillez réessayer.");
  }
});
