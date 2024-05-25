const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const s = require('../set');
const axios = require('axios');
//const fetch = require('node-fetch');






zokou({nomCom:"bot",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("oui je vous ecoute.")}
    //var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'fr' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Erreur lors de la traduction en français :', error);
      repondre('Erreur lors de la traduction en français');
    });
})
.catch(error => {
  console.error('Erreur lors de la requête à BrainShop :', error);
  repondre('Erreur lors de la requête à BrainShop');
});

  }catch(e){ repondre("oupsaa une erreur : "+e)}
    
  
  });  
  


zokou({ nomCom: "dalle", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez entrer les informations nécessaires pour générer l'image.`);
    }

    // Regrouper les arguments en une seule chaîne séparée par "-"
    const image = arg.join(' ');
    const response = await axios.get(`https://api.maher-zubair.tech/ai/photoleap?q=${image}`);
    
    const data = response.data;
    let caption = '*Propulsé par HACKING-MD*';
    
    if (data.status && data.result) {
      // Utiliser les données retournées par le service
      const imageUrl = data.result;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
    } else {
      repondre("Erreur lors de la génération de l'image");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "calcul", reaction: "😂", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre(`Veuillez insérer des calculs mathématiques comme 1000*2.`);
  }

  // Regrouper les arguments en une seule chaîne séparée par "-"
  const cal = arg.join(' ');
  try {
    const response = await axios.get(`https://api.maher-zubair.tech/ai/mathssolve?q=${cal}`);
    const data = response.data;
    await repondre(data.result);
    console.log(data.completion);
  } catch (error) {
    console.error('Error requesting mathssolve API:', error);
    repondre('Error during calculation.');
  }
});




zokou({ nomCom: "gpt", reaction: "🌏", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre(`Veuillez poser une question.`);
  }

  // Regrouper les arguments en une seule chaîne séparée par "-"
  const question = arg.join(' ');
  const response = await fetch(`https://api.maher-zubair.tech/ai/chatgptv4?q=${question}`);
  const data = await response.json();

  if (!data.result) {
    return repondre(`Désolé, je n'ai pas pu trouver de réponse à votre question.`);
  }

  await repondre(data.result);
  console.log(data.completion);
});

zokou({ nomCom: "thomas", reaction: "🌏", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre(`Veuillez poser une question.`);
  }

  // Regrouper les arguments en une seule chaîne séparée par "-"
  const question = arg.join(' ');
  const response = await fetch(`https://api.maher-zubair.tech/ai/chatgptv4?q=${question}`);
  const data = await response.json();

  await repondre(data.result);
  console.log(data.completion);
});


/*zokou({ nomCom: "dalle", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez entrer les informations nécessaires pour générer l'image.`);
    } else {
      // Regrouper les arguments en une seule chaîne séparée par un espace
      const image = arg.join(' ');
      const imageSize = '256x256';
      const apiUrl = 'https://api.openai.com/v1/images/generations';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${s.GPT}`
        },
        body: JSON.stringify({
          model: 'image-alpha-001',
          prompt: image,
          size: imageSize,
          response_format: 'url'
        })
      });

      const data = await response.json();
    
      if (data && data.data && data.data.length > 0 && data.data[0].url) {
        zk.sendMessage(dest, { image: { url: data.data[0].url }, caption: '*Propulsé par HACKING-MD*'}, { quoted: ms });
      } else {
        repondre("Erreur lors de la génération de l'image");
      }
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
*/
