const axios = require('axios');

zokou({
  nomCom: "gitstalk",
  categorie: "Coders",
  reaction: "👤"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Usage : votre prefixe + gitstalk [nom d'utilisateur GitHub]");
    return;
  }

  const username = arg[0];

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const user = response.data;

    if (!user) {
      repondre(`L'utilisateur "${username}" n'a pas été trouvé.`);
      return;
    }

    repondre(`*Nom:* ${user.name || "Inconnu"}\n*Bio:* ${user.bio || "Aucune bio"}\n*Repos:* ${user.public_repos}\n*Followers:* ${user.followers}\n*Following:* ${user.following}\n*Profil:* ${user.html_url}`);
  } catch (error) {
    repondre("Erreur lors de la récupération des informations de l'utilisateur GitHub.");
  }
});
