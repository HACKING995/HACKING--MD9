const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ nomCom: "gpt5", reaction: "🌐", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Veuillez poser une question.");
    }

    
    const question = arg.join(" ");

    
    const apiUrl = `https://api.giftedtech.my.id/api/ai/gpt?apikey=gifted&q=${encodeURIComponent(question)}`;

    // Effectuer la requête à l'API
    const response = await axios.get(apiUrl);


    const { data } = response;

    
    if (data && data.result) {
      
      repondre(data.result);
    } else {
      repondre("Erreur lors de la génération de la réponse. Veuillez réessayer.");
    }
  } catch (error) {
    
    console.error("Erreur:", error.message || "Une erreur s'est produite");
    repondre("Oups, une erreur est survenue lors du traitement de votre demande. Veuillez réessayer plus tard.");
  }
});

// cette  commande  est  une  idée  à  Thomas  TECH  pour  un test  de début  de la nouvelle  apikey donc  soyez  travailler 
