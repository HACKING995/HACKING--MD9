const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");

zokou({
  nomCom: "spotifysearch",
  categorie: "FAMOUS-DOWNLOADER🇭🇹",
  reaction: "🎵",
  desc: "Recherche une musique sur Spotify et la télécharge",
  alias: ["sps"]
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, arg, ms, auteurMessage } = commandeOptions;

  if (!arg[0] || arg.join('').trim() == '') return repondre('Veuillez entrer un nom de musique');

  const query = arg.join(' ').trim();

  try {
    const response = await axios.get(`https://api.cafirexos.com/api/spotifyinfo?text=${encodeURI(query)}`);
    const { data } = response;

    if (data.resultado.length === 0) return repondre('Aucune musique trouvée');

    const result = data.resultado[0];
    const message = `📅 *Date* : ${result.year}\n🎤 *Artiste* : ${result.artist}\n🎵 *Titre* : ${result.title}\n💿 *Album* : ${result.album}\n🎶 *Genre* : ${result.genre}\n🔗 *Lien* : ${result.url}\n\nRépondez au message par *oui* (sans le préfixe) si vous voulez la télécharger`;

    const sentMessage = await zk.sendMessage(origineMessage, {
      image: { url: result.thumbnail },
      caption: message
    }, { quoted: ms });

    zk.awaitForMessage({
      sender: auteurMessage,
      chatJid: origineMessage,
      timeout: 60000,
      filter: msg => msg.message?.contextInfo?.stanzaId == sentMessage.key.id && msg.message?.extendedTextMessage?.text?.trim() == 'oui'
    }).then(async reply => {
      zk.sendMessage(origineMessage, { text: '🙃 *Cher, en quel format souhaitez-vous que je vous envoie la chanson ?* :\n1️⃣ => 🎧 *Audio*\n2️⃣ => 📄 *Document*\n\nRépondez au message par le chiffre de votre choix' }, { quoted: reply });

      try {
        const downloadResponse = await axios.get(`https://api.cafirexos.com/api/spotifydl?url=${result.url}`, { responseType: 'arraybuffer' });
        fs.writeFileSync('./spotifysearch.mp3', Buffer.from(downloadResponse.data));
        await zk.sendMessage(origineMessage, { audio: { url: './spotifysearch.mp3' }, mimetype: 'audio/mpeg' });
        fs.unlinkSync('./spotifysearch.mp3');
      } catch (error) {
        repondre('Erreur lors du téléchargement');
        console.log(error);
      }
    }).catch(error => {
      if (error.message == 'Timeout') {
        try {
          console.log('Timeout');
          zk.sendMessage(origineMessage, { text: '```Requête annulée```', edit: sentMessage.key });
        } catch (err) {
          console.log(err);
        }
      } else {
        repondre('Aucune réponse du serveur');
        console.log(error);
      }
    });
  } catch (error) {
    repondre('Erreur lors de la requête');
    console.log('Erreur avec la commande spotifysearch :', error);
  }
});
