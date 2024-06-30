const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction");
const s = require('../set');
const axios = require('axios');

const userRequests = new Map();

function canMakeRequest(userId, isGroup) {
  if (!isGroup) {
    return true;
  }

  const today = new Date().toISOString().split('T')[0];
  if (!userRequests.has(userId)) {
    userRequests.set(userId, { date: today, count: 0 });
  }

  const userData = userRequests.get(userId);
  if (userData.date !== today) {
    userRequests.set(userId, { date: today, count: 0 });
    return true;
  }

  return userData.count < 5;
}

function incrementRequestCount(userId) {
  const userData = userRequests.get(userId);
  userRequests.set(userId, { ...userData, count: userData.count + 1 });
}

zokou({ nomCom: "bot", reaction: "ðŸ“±", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  const userId = ms.sender;
  const isGroup = ms.isGroup;

  if (!canMakeRequest(userId, isGroup)) {
    return repondre("Vous avez atteint votre limite de 5 requÃªtes pour aujourd'hui.");
  }

  if (!arg || !arg[0]) {
    return repondre("oui je vous Ã©coute.");
  }

  try {
    const message = await traduire(arg.join(' '), { to: 'fr' });
    console.log(message);

    const response = await fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=${userId}&msg=${message}`);
    const data = await response.json();
    const botResponse = data.cnt;
    console.log(botResponse);

    const translatedResponse = await traduire(botResponse, { to: 'fr' });
    repondre(translatedResponse);

    incrementRequestCount(userId);
  } catch (error) {
    console.error('Erreur lors de la requÃªte Ã  BrainShop :', error);
    repondre('Erreur lors de la requÃªte Ã  BrainShop');
  }
});

zokou({ nomCom: "dalle", reaction: "ðŸ“±", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const userId = ms.sender;
  const isGroup = ms.isGroup;

  if (!canMakeRequest(userId, isGroup)) {
    return repondre("Vous avez atteint votre limite de 5 requÃªtes pour aujourd'hui.");
  }

  if (!arg || arg.length === 0) {
    return repondre("Veuillez entrer les informations nÃ©cessaires pour gÃ©nÃ©rer l'image.");
  }

  try {
    const image = arg.join(' ');
    const response = await axios.get(`https://api.maher-zubair.tech/ai/photoleap?q=${image}`);
    const data = response.data;
    let caption = '*PropulsÃ© par HACKING-MD*';

    if (data.status && data.result) {
      const imageUrl = data.result;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
      incrementRequestCount(userId);
    } else {
      repondre("Erreur lors de la gÃ©nÃ©ration de l'image");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "gpt", reaction: "ðŸ“±", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const userId = ms.sender;
  const isGroup = ms.isGroup;

  if (!canMakeRequest(userId, isGroup)) {
    return repondre("Vous avez atteint votre limite de 5 requÃªtes pour aujourd'hui.");
  }

  if (!arg || arg.length === 0) {
    return repondre("Veuillez poser une question.");
  }

  try {
    const question = arg.join(' ');
    const response = await axios.get(`https://api.maher-zubair.tech/ai/chatgpt4?q=${question}`);
    const data = response.data;

    if (data) {
      repondre(data.result);
      incrementRequestCount(userId);
    } else {
      repondre("Erreur lors de la gÃ©nÃ©ration de la rÃ©ponse");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "chat", reaction: "ðŸ“±", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  const userId = ms.sender;
  const isGroup = ms.isGroup;

  if (!canMakeRequest(userId, isGroup)) {
    return repondre("Vous avez atteint votre limite de 5 requÃªtes pour aujourd'hui.");
  }

  if (!arg || !arg[0]) {
    return repondre("oui je vous Ã©coute.");
  }

  try {
    const message = await traduire(arg.join(' '), { to: 'fr' });
    console.log(message);

    const response = await fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=${userId}&msg=${message}`);
    const data = await response.json();
    const botResponse = data.cnt;
    console.log(botResponse);

    const translatedResponse = await traduire(botResponse, { to: 'fr' });
    repondre(translatedResponse);

    incrementRequestCount(userId);
  } catch (error) {
    console.error('Erreur lors de la requÃªte Ã  BrainShop :', error);
    repondre('Erreur lors de la requÃªte Ã  BrainShop');
  }
});

zokou({ nomCom: "calcul", reaction: "ðŸ˜‚", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const userId = ms.sender;
  const isGroup = ms.isGroup;

  if (!canMakeRequest(userId, isGroup)) {
    return repondre("Vous avez atteint votre limite de 5 requÃªtes pour aujourd'hui.");
  }

  if (!arg || arg.length === 0) {
    return repondre("Please insert maths calculations like 1000*2.");
  }

  try {
    const cal = arg.join(' ');
    const response = await fetch(`https://api.maher-zubair.tech/ai/mathssolve?q=${cal}`);
    const data = await response.json();
    await repondre(data.result);
    console.log(data.completion);
    incrementRequestCount(userId);
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
/*zokou({ nomCom: "gpt", reaction: "Ã°Å¸â€œÂ¡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez poser une question.`);
    } else {
      const question = arg.join(' ');
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${s.GPT}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: "You" }, { role: "user", content: question }],
        }),
      });

      const data = await response.json();
      console.log("GPT REPONSE : ", data); 
      if (!data.choices || data.choices.length === 0) {
        repondre("Votre API est invalide, veuillez insÃƒÂ©rer une nouvelle."); 
      } else {
        return repondre(data.choices[0].message.content);
      }
    } 
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "dalle", reaction: "Ã°Å¸â€œÂ¡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez entrer les informations nÃƒÂ©cessaires pour gÃƒÂ©nÃƒÂ©rer l'image.`);
    } else {
      // Regrouper les arguments en une seule chaÃƒÂ®ne sÃƒÂ©parÃƒÂ©e par un espace
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
        zk.sendMessage(dest, { image: { url: data.data[0].url }, caption: '*PropulsÃƒÂ© par ZOKOU-MD*'}, { quoted: ms });
      } else {
        repondre("Erreur lors de la gÃƒÂ©nÃƒÂ©ration de l'image");
      }
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
*/
