const axios = require('axios');

zokou({
  nomCom: "npmstalk",
  categorie: "Coders",
  reaction: "📦"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Usage : /npmstalk [nom du package]");
    return;
  }

  const packageName = arg[0];

  try {
    const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
    const data = response.data;

    if (!data) {
      repondre(`Le package "${packageName}" n'a pas été trouvé.`);
      return;
    }

    const latestVersion = data['dist-tags'].latest;
    const description = data.description || "Aucune description disponible.";
    const author = data.author ? data.author.name : "Inconnu";

    repondre(`*Package:* ${packageName}\n*Description:* ${description}\n*Version:* ${latestVersion}\n*Auteur:* ${author}`);
  } catch (error) {
    repondre("Erreur lors de la récupération des informations du package NPM.");
  }
});
