const { zokou } = require("../framework/zokou");
const axios = require("axios");

// Commande pour interagir avec ChatGPT
zokou({ nomCom: "gpt5", reaction: "🤔", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;

    try {
        // Vérifie si des arguments ont été fournis
        if (!arg || arg.length === 0) {
            return repondre("Veuillez poser une question.");
        }

        // Regrouper les arguments en une seule chaîne
        const question = arg.join(' ');

        // Appel à l'API ChatGPT avec la nouvelle URL
        const responseApi = await axios.get(`https://test-api-apms.onrender.com/api/chatgpt?text=${encodeURIComponent(question)}&name=Kaizoku&prompt=${encodeURIComponent("Tu seras une IA d'un bot WhatsApp tres puissant du nom HACKING-MD")}&apikey=BrunoSobrino`);

        const resultat = responseApi.data;
        if (resultat) {
            repondre(resultat.resultado);
        } else {
            repondre("Erreur lors de la génération de la réponse.");
        }
    } catch (error) {
        console.error('Erreur:', error.message || 'Une erreur s\'est produite');
        repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
    }
});
