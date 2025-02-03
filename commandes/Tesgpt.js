const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ nomCom: "gpt", reaction: "🌐", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    // Vérifier si l'utilisateur a fourni une question
    if (!arg || arg.length === 0) {
      return repondre("Veuillez poser une question.");
    }

    // Regrouper les arguments en une seule chaîne séparée par des espaces
    const question = arg.join(" ");

    // Construire l'URL de la requête à l'API avec la nouvelle URL
    const apiUrl = `https://api.giftedtech.my.id/api/ai/gpt?apikey=gifted&q=${encodeURIComponent(question)}`;

    // Effectuer la requête à l'API
    const response = await axios.get(apiUrl);

    // Extraire les données de la réponse de l'API
    const { data } = response;

    // Vérifier si la réponse de l'API contient un résultat
    if (data && data.result) {
      // Renvoyer la réponse de l'API à l'utilisateur
      repondre(data.result);
    } else {
      // Si la réponse de l'API ne contient pas de résultat, renvoyer un message d'erreur
      repondre("Erreur lors de la génération de la réponse. Veuillez réessayer.");
    }
  } catch (error) {
    // Gérer les erreurs éventuelles lors de l'appel à l'API
    console.error("Erreur:", error.message || "Une erreur s'est produite");
    repondre("Oups, une erreur est survenue lors du traitement de votre demande. Veuillez réessayer plus tard.");
  }
});
