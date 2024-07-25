const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction");
const s = require('../set');
const axios = require('axios');
const fetch = require('node-fetch');
// Flash command
zokou({
  'nomCom': "alexa",
  'reaction': '📡',
  'categorie': 'AI'
}, async (message, client, options) => {
  const { repondre, ms, arg } = options;
  
  if (!arg || !arg[0]) {
    return repondre("YEES!\n _I'm listening to you._");
  }
  
  try {
    const userInput = arg.join(" ");
    const response = await fetch(`http://api.brainshop.ai/get?bid=181821&key=ltFzFIXrtj2SVMTX&uid=[uid]&msg=${userInput}`);
    const data = await response.json();
    await repondre(data.cnt);
  } catch {
    repondre("Something went wrong...");
  }
});

// Dalle command
zokou({
  'nomCom': 'dalle2',
  'reaction': '📡',
  'categorie': 'AI'
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please enter the necessary information to generate the image.");
    }
    
    const prompt = arg.join(" ");
    const imageUrl = `https://cute-tan-gorilla-yoke.cyclic.app/imagine?text=${prompt}`;
    
    client.sendMessage(message, {
      'image': { 'url': imageUrl },
      'caption': "*powered by FLASH-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error('Error:', error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request");
  }
});

// GPT command
zokou({
  'nomCom': 'gpt3.5',
  'reaction': '📡',
  'categorie': 'AI'
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  if (!arg || arg.length === 0) {
    return repondre("Please ask a question.");
  }
  
  const prompt = arg.join(" ");
  const response = await fetch(`https://api.maher-zubair.tech/ai/chatgpt3?q=${prompt}`);
  const data = await response.json();
  await repondre(data.result);
  console.log(data.completion);
});

// Gemini command
zokou({
  'nomCom': "gemini",
  'reaction': '🤗',
  'categorie': 'AI'
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  if (!arg || arg.length === 0) {
    return repondre("Hello, I'm *FLASH-MD*, an AI developed by France King.\n\nWhat help can I offer you today?");
  }
  
  const prompt = arg.join(" ");
  const response = await fetch(`https://api.maher-zubair.tech/ai/chatgpt3?q=${prompt}`);
  const data = await response.json();
  await repondre(data.result);
  console.log(data.completion);
});

// Calculator command
zokou({
  'nomCom': 'calcul2',
  'reaction': '🔢',
  'categorie': 'General'
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  if (!arg || arg.length === 0) {
    return repondre("Please insert math calculations like 100000+2024.\n\nNOTE: Use \"(/)\" for division and \"(*)\" for multiplication or letter x");
  }
  
  const calculation = arg.join(" ");
  const response = await fetch(`https://api.maher-zubair.tech/ai/mathssolve?q=${calculation}`);
  const data = await response.json();
  await repondre(data.result);
  console.log(data.completion);
});

// GPT-4 command
zokou({
  'nomCom': "gpt4",
  'reaction': '📡',
  'categorie': 'AI'
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please ask a question.");
    }
    
    const prompt = arg.join(" ");
    const response = await axios.get(`https://api.maher-zubair.tech/ai/chatgpt4?q=${prompt}`);
    const data = response.data;
    
    if (data) {
      repondre(data.data);
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error('Error:', error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});

// Best Wallpaper command
zokou({
  'nomCom': "best-wallp",
  'reaction': '🙌',
  'categorie': "Thomas"
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  const response = await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc");
  const data = await response.json();
  const imageUrl = data.urls.regular;
  
  let imageMessage = {
    'image': { 'url': imageUrl },
    'caption': "*POWERED BY FLASH-MD*"
  };
  
  return await client.sendMessage(message, imageMessage, { 'quoted': ms });
});

// Random Image command
zokou({
  'nomCom': "random",
  'reaction': '🥂',
  'categorie': "Thomas"
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  const response = await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc");
  const data = await response.json();
  const imageUrl = data.urls.regular;
  
  let imageMessage = {
    'image': { 'url': imageUrl },
    'caption': "*POWERED BY FLASH-MD*"
  };
  
  return await client.sendMessage(message, imageMessage, { 'quoted': ms });
});

// Nature Image command
zokou({
  'nomCom': "nature",
  'reaction': '🦗',
  'categorie': "Thomas"
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  const response = await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc");
  const data = await response.json();
  const imageUrl = data.urls.regular;
  
  let imageMessage = {
    'image': { 'url': imageUrl },
    'caption': "*POWERED BY FLASH-MD*"
  };
  
  return await client.sendMessage(message, imageMessage, { 'quoted': ms });
});

// Time command
zokou({
  'nomCom': 'time',
  'reaction': '⌚',
  'categorie': "General"
}, async (message, client, options) => {
  const { repondre, arg, ms } = options;
  
  try {
    if (!arg || arg.length === 0) {
      return repondre("Enter the name of the country you want to know its time and date");
    }
    
    const country = arg.join(" ");
    const response = await fetch(`https://levanter.onrender.com/time?code=${country}`);
    const data = await response.json();
    const time = data.result[0].time;
    await repondre(time);
  } catch (error) {
    repondre("That country name is incorrect!");
  }
});
```
