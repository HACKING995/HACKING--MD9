const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");

zokou({
  nomCom: "spload",
  categorie: "FAMOUS-MUSIQUE",
  reaction: "🎧",
  desc: "Télécharge une musique à partir d'un lien Spotify",
  alias: ["spdl"]
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage } = commandeOptions;

  if (!arg[0] || arg.join('').trim() == '' || !arg.join('').trim().match(/https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/g)) return repondre('Veuillez fournir un lien de musique Spotify valide');

  const url = arg[0];

  try {
    const response = await axios.get(`https://api.cafirexos.com/api/spotifyinfo?url=${url}`);
    const { data } = response;

    if (data.resultado.length === 0) return repondre('Aucune musique trouvée pour ce lien');

    const result = data.resultado[0];
    const message = '🎶 *Cher, en quel format voudriez-vous que je vous envoi la chanson ?* :\n1️⃣ => 🎧 *Audio*\n2️⃣ => 📄 *Document*\n\nRépondez au message par le chiffre de votre choix';

    const sentMessage = await zk.sendMessage(origineMessage, { text: message }, { quoted: ms });

    zk.awaitForMessage({
      sender: auteurMessage,
      chatJid: origineMessage,
      timeout: 60000,
      filter: msg => (msg.message?.extendedTextMessage?.text?.toLowerCase().trim() == '1' || msg.message?.conversation?.toLowerCase().trim() == '2') && msg.message?.contextInfo?.stanzaId == sentMessage.key.id
    }).then(async reply => {
      zk.sendMessage(origineMessage, { text: 'Réception 5/5, téléchargement en cours' }, { quoted: reply });

      try {
        const downloadResponse = await axios.get(`https://api.cafirexos.com/api/spotifydl?url=${url}`, { responseType: 'arraybuffer' });
        fs.writeFileSync('./song.mp3', Buffer.from(downloadResponse.data));

        if (reply.message?.conversation?.trim() == '1' || reply.message?.extendedTextMessage?.text.trim() == '1') {
          await zk.sendMessage(origineMessage, {
            audio: { url: './song.mp3' },
            mimetype: 'audio/mpeg',
            headerType: 3,
            contextInfo: {
              externalAdReply: {
                title: result.title,
                body: 'By FAMOUS-TECH🇭🇹💫',
                renderLargerThumbnail: true,
                thumbnailUrl: result.thumbnail,
                mediaUrl: result.url,
                mediaType: 1
              }
            }
          });
        } else {
          await zk.sendMessage(origineMessage, {
            document: { url: './song.mp3' },
            mimetype: 'audio/mpeg',
            fileName: result.title + '.mp3',
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                title: result.title,
                body: 'BY FAMOUS-TECH🇭🇹💫',
                renderLargerThumbnail: true,
                thumbnailUrl: result.thumbnail,
                mediaUrl: result.url,
                mediaType: 1
              }
            }
          });
        }
      } catch (error) {
        repondre('Erreur lors du téléchargement');
        console.log(error);
      } finally {
        fs.unlinkSync('./spotifysave.mp3');
        repondre('*Téléchargement terminé.\nMerci pour votre patience*');
        repondre('*Cette commande a été développée par FAMOUS-TECH un développeur Haïtien*')
      }
    }).catch(error => {
      if (error.message == 'Timeout') {
        try {
          console.log('Timeout');
          zk.sendMessage(origineMessage, { text: '*Demande annulée, vous avez pris trop de temps avant de répondre*', edit: sentMessage.key });
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
    console.log('Erreur avec la commande spotifysave :', error);
  }
});
