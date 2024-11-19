const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "url2",
  categorie: "FAMOUS-TECH",
  reaction: "🌐",
  desc: "Téléverse une image vers Catbox et obtient l'URL",
  alias: ["up"]
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    return repondre("Veuillez fournir une URL d'image.");
  }

  const imageUrl = arg[0];

  try {
    const response = await axios.post("https://catbox.moe/user/api.php", {
      fileToUpload: imageUrl,
      reqtype: "urlupload"
    });

    const uploadedImageUrl = response.data;
    repondre(`Voici l'URL de votre image téléversée : ${uploadedImageUrl}`);
  } catch (error) {
    console.error("Erreur lors du téléversement de l'image :", error);
    repondre("Échec du téléversement de l'image. Veuillez réessayer.");
  }
});
