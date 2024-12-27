const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "bugcrash",
  categorie: "bugmenu",
  reaction: '⚡'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, prefixe } = commandeOptions;

  try {
    const messages = [
      "```⚡ malware en cours d'injection ⚡```",
      "```🔐 connexion à l'appareil \n 0%```",
      "```♻️ transfert des photos \n █ 10%```",
      "```♻️ transfert réussi \n █ █ 20%```",
      "```♻️ transfert des vidéos \n █ █ █ 30%```",
      "```♻️ transfert réussi \n █ █ █ █ 40%```",
      "```♻️ transfert de l'audio \n █ █ █ █ █ 50%```",
      "```♻️ transfert réussi \n █ █ █ █ █ █ 60%```",
      "```♻️ transfert des fichiers cachés \n █ █ █ █ █ █ █ 70%```",
      "```♻️ transfert réussi \n █ █ █ █ █ █ █ █ 80%```",
      "```♻️ transfert des discussions WhatsApp \n █ █ █ █ █ █ █ █ █ 90%```",
      "```♻️ transfert réussi \n █ █ █ █ █ █ █ █ █ █ 100%```",
      "```📲 Système en cours de piratage... \n Connexion au serveur```",
      "```🔌 Appareil connecté avec succès... \n Réception des données...```",
      "```💡 Données piratées à 100% \n suppression de toutes les preuves...```",
      "```🔋 HACK TERMINÉ```",
      "```📤 ENVOI DES DOCUMENTS DU TÉLÉPHONE```"
    ];

    for (const message of messages) {
      try {
        await repondre(message);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Erreur lors de l'envoi du message de chargement :", error);
      }
    }

    const finalMessage = "```🗂️ TOUS LES FICHIERS TRANSFÉRÉS```";
    try {
      await repondre(finalMessage);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message principal :", error);
      return await repondre("_🙏 Une erreur est survenue lors de l'envoi du message principal 🤨_");
    }

    const countdown = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
    for (const number of countdown) {
      try {
        await repondre("```❇️ DONNÉES ENVOYÉES AVEC SUCCÈS, connexion déconnectée 📤```");
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Erreur lors du compte à rebours :", error);
      }
    }

    try {
      await repondre("😏 *SYSTÈME DE LA VICTIME DÉTRUIT!* 🤔");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message final :", error);
    }
  } catch (error) {
    console.error("Erreur critique dans le script de farce :", error);
    return await repondre("_😊 Une erreur critique est survenue pendant la farce 🤗_");
  }
});
