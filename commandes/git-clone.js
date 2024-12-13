const axios = require('axios');
const fs = require('fs');
const path = require('path');

zokou({
  nomCom: "gitclone",
  categorie: "Développement",
  reaction: "📂"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Usage : /gitclone [URL du dépôt GitHub]");
    return;
  }

  const repoUrl = arg[0];
  const regex = /github\.com\/([\w-]+\/[\w-]+)/;
  const match = repoUrl.match(regex);

  if (!match) {
    repondre("URL de dépôt GitHub invalide.");
    return;
  }

  const repoPath = match[1];
  const zipUrl = `https://api.github.com/repos/${repoPath}/zipball`;

  try {
    const response = await axios.get(zipUrl, { responseType: 'stream' });
    const filePath = path.join(__dirname, `${repoPath}.zip`);
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
      zk.sendMessage(origineMessage, { document: { url: filePath }, fileName: `${repoPath}.zip` }, { quoted: commandeOptions.ms });
    });

    writer.on('error', () => {
      repondre("Erreur lors de la création du fichier ZIP.");
    });
  } catch (error) {
    repondre("Erreur lors du clonage du dépôt GitHub.");
  }
});
