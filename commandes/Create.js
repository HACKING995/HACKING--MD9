const axios = require('axios');
const fs = require('fs');
const path = require('path');

zokou({
  nomCom: "git", 
  categorie: "Mods", 
  reaction: "📂" 
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre, prefixe } = commandeOptions;

  
  if (!arg[0]) {
    await repondre(`Usage : ${prefixe}gitclone [URL du dépôt GitHub]`);
    return;
  }

  const repoUrl = arg[0];
  const regex = /github\.com\/([\w-]+\/[\w-]+)/;
  const match = repoUrl.match(regex);

  
  if (!match) {
    await repondre("URL de dépôt GitHub invalide. Assurez-vous qu'elle est au format : https://github.com/utilisateur/repo");
    return;
  }

  const repoPath = match[1];
  const zipUrl = `https://api.github.com/repos/${repoPath}/zipball`;

  try {
    
    const response = await axios.get(zipUrl, { responseType: 'stream' });
    const filePath = path.join(__dirname, `${repoPath.replace('/', '_')}.zip`); 
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', async () => {
      
      await zk.sendMessage(
        origineMessage, 
        { 
          document: { url: filePath }, 
          fileName: `${repoPath.replace('/', '_')}.zip` 
        }, 
        { quoted: commandeOptions.ms }
      );
 
      fs.unlinkSync(filePath);
    });

    writer.on('error', async () => {
      await repondre("Erreur lors de la création du fichier ZIP.");
    });
  } catch (error) {
    console.error(error);
    await repondre("Erreur lors du clonage du dépôt GitHub. Assurez-vous que l'URL est valide et que le dépôt est accessible.");
  }
});

/*const axios = require('axios');
const fs = require('fs');
const path = require('path');

zokou({
  nomCom: "gitclone", // Nom de la commande
  categorie: "Développement", // Catégorie pour le menu
  reaction: "📂" // Réaction associée
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre, prefixe } = commandeOptions;

  // Vérifiez si une URL est fournie
  if (!arg[0]) {
    await repondre(`Usage : ${prefixe}gitclone [URL du dépôt GitHub]`);
    return;
  }

  const repoUrl = arg[0];
  const regex = /github\.com\/([\w-]+\/[\w-]+)/;
  const match = repoUrl.match(regex);

  // Vérifiez si l'URL correspond au format attendu
  if (!match) {
    await repondre("URL de dépôt GitHub invalide. Assurez-vous qu'elle est au format : https://github.com/utilisateur/repo");
    return;
  }

  const repoPath = match[1];
  const zipUrl = `https://api.github.com/repos/${repoPath}/zipball`;

  try {
    // Téléchargement du fichier ZIP
    const response = await axios.get(zipUrl, { responseType: 'stream' });
    const filePath = path.join(__dirname, `${repoPath.replace('/', '_')}.zip`); // Remplacez les "/" par "_" pour le nom du fichier
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', async () => {
      // Envoi du fichier via WhatsApp
      await zk.sendMessage(
        origineMessage, 
        { 
          document: { url: filePath }, 
          fileName: `${repoPath.replace('/', '_')}.zip` 
        }, 
        { quoted: commandeOptions.ms }
      );

      // Supprimez le fichier après l'envoi pour éviter d'encombrer le serveur
      fs.unlinkSync(filePath);
    });

    writer.on('error', async () => {
      await repondre("Erreur lors de la création du fichier ZIP.");
    });
  } catch (error) {
    console.error(error);
    await repondre("Erreur lors du clonage du dépôt GitHub. Assurez-vous que l'URL est valide et que le dépôt est accessible.");
  }
});
/*
