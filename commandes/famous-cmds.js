const { zokou } = require("../framework/zokou");

const axios = require("axios");

const fs = require("fs");

const path = require("path");

// Utilitaires communs🤟

const utils = {

  validateInput: (input, pattern, errorMsg) => {

    if (!pattern.test(input)) {

      throw new Error(errorMsg);

    }

    return true;

  },

  

  randomFromArray: (arr) => arr[Math.floor(Math.random() * arr.length)],

  

  formatResponse: (title, content) => `🔰 *${title}*\n\n${content}`

};

// Calculatrice améliorée

zokou({

  nomCom: "calc",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "🧮",

  desc: "Calculatrice avancée avec historique.",

  alias: ["calcul"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {

    return repondre("❌ Veuillez entrer une expression mathématique.");

  }

  const expression = arg.join(" ");

  

  try {

    utils.validateInput(expression, /^[0-9+\-*/().\ ]+$/, "Expression non valide");

    

    const result = new Function(`return ${expression}`)();

    

    if (!isFinite(result)) {

      throw new Error("Résultat invalide (division par zéro ou nombre trop grand)");

    }

    const response = utils.formatResponse("Calculatrice", 

      `📝 Expression: ${expression}\n` +

      `🔢 Résultat: ${result}\n` +

      `ℹ️ Type: ${typeof result}`

    );

    repondre(response);

  } catch (error) {

    repondre(`❌ Erreur: ${error.message}`);

  }

});

// Dictionnaire amélioré

zokou({

  nomCom: "def",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "📖",

  desc: "Dictionnaire avancé avec exemples et synonymes.",

  alias: ["definition"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {

    return repondre("❌ Veuillez spécifier un mot à définir.");

  }

  const mot = arg[0];

  

  try {

    utils.validateInput(mot, /^[a-zA-ZÀ-ÿ-]+$/, "Mot invalide");

    

    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/fr/${mot}`);

    

    if (!response.data || response.data.length === 0) {

      throw new Error("Aucune définition trouvée");

    }

    const data = response.data[0];

    const definitions = data.meanings.map(meaning => ({

      type: meaning.partOfSpeech,

      def: meaning.definitions[0].definition,

      example: meaning.definitions[0].example,

      synonymes: meaning.synonyms?.slice(0, 3)

    }));

    const formattedResponse = utils.formatResponse("Dictionnaire",

      `📝 Mot: ${mot}\n\n` +

      definitions.map(def => 

        `🔤 Type: ${def.type}\n` +

        `📚 Définition: ${def.def}\n` +

        (def.example ? `💡 Exemple: ${def.example}\n` : '') +

        (def.synonymes?.length ? `🔄 Synonymes: ${def.synonymes.join(", ")}\n` : '')

      ).join("\n")

    );

    repondre(formattedResponse);

  } catch (error) {

    repondre(`❌ Erreur: ${error.message || "Service indisponible"}`);

  }

});

// Générateur de noms amélioré

zokou({

  nomCom: "namegen",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "👤",

  desc: "Génère des noms créatifs avec personnalisation.",

  alias: ["genname"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre } = commandeOptions;

  const categories = {

    fantasy: {

      prefixes: ["Aether", "Celestia", "Dragon", "Eldar", "Frost", "Galen", "Hyper", "Iron", "Jade", "Kael"],

      suffixes: ["heart", "soul", "blade", "spirit", "storm", "fire", "wind", "star", "light", "shadow"]

    },

    tech: {

      prefixes: ["Cyber", "Data", "Eon", "Flux", "Grid", "Helix", "Ion", "Jet", "Kiln", "Loop"],

      suffixes: ["tech", "tron", "byte", "flux", "grid", "sync", "link", "core", "node", "wave"]

    },

    nature: {

      prefixes: ["Aurora", "Brook", "Cloud", "Dew", "Echo", "Fern", "Gale", "Hazel", "Iris", "Jade"],

      suffixes: ["leaf", "river", "wood", "meadow", "valley", "grove", "field", "garden", "brook", "hill"]

    }

  };

  const category = arg[0]?.toLowerCase() || "fantasy";

  const count = Math.min(parseInt(arg[1]) || 1, 5);

  try {

    if (!categories[category]) {

      throw new Error(`Catégorie invalide. Choisissez parmi: ${Object.keys(categories).join(", ")}`);

    }

    const names = Array(count).fill(0).map(() => {

      const prefix = utils.randomFromArray(categories[category].prefixes);

      const suffix = utils.randomFromArray(categories[category].suffixes);

      return `${prefix}${suffix}`;

    });

    const response = utils.formatResponse("Générateur de Noms",

      `🎭 Catégorie: ${category}\n\n` +

      names.map((name, i) => `${i + 1}. ${name}`).join("\n")

    );

    repondre(response);

  } catch (error) {

    repondre(`❌ Erreur: ${error.message}`);

  }

});

// Commande Echo améliorée

zokou({

  nomCom: "echo",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "🔁",

  desc: "Répète un texte avec formatage personnalisé.",

  alias: ["repeat"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre } = commandeOptions;

  if (!arg[0] || !arg[1]) {

    return repondre("❌ Usage: .echo <nombre> <texte> [format?]");

  }

  try {

    const count = parseInt(arg[0]);

    const text = arg.slice(1).join(" ");

    const format = arg.includes("--format") ? arg[arg.indexOf("--format") + 1] : "normal";

    utils.validateInput(String(count), /^\d+$/, "Nombre invalide");

    if (count > 50) throw new Error("Maximum 50 répétitions");

    let formattedText;

    switch (format) {

      case "numbered":

        formattedText = Array(count).fill(text).map((t, i) => `${i + 1}. ${t}`).join("\n");

        break;

      case "bullet":

        formattedText = Array(count).fill(text).map(t => `• ${t}`).join("\n");

        break;

      case "spaced":

        formattedText = Array(count).fill(text).join("\n\n");

        break;

      default:

        formattedText = Array(count).fill(text).join("\n");

    }

    const response = utils.formatResponse("Echo",

      `🔄 Répétitions: ${count}\n` +

      `📝 Format: ${format}\n\n` +

      formattedText

    );

    repondre(response);

  } catch (error) {

    repondre(`❌ Erreur: ${error.message}`);

  }

});

// Générateur de CV amélioré

zokou({

  nomCom: "gencv",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "📄",

  desc: "Génère un CV professionnel personnalisé.",

  alias: ["genresume"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre, nomAuteurMessage } = commandeOptions;

  if (arg.length < 3) {

    return repondre("❌ Usage: .gencv <domaine> <années_exp> <compétences>");

  }

  try {

    const domain = arg[0];

    const experience = parseInt(arg[1]);

    const skills = arg.slice(2).join(" ").split(",").map(s => s.trim());

    utils.validateInput(domain, /^[a-zA-Z\s-]+$/, "Domaine invalide");

    if (experience < 0 || experience > 50) throw new Error("Années d'expérience invalides");

    const cvTemplate = {

      junior: {

        titles: ["Développeur Junior", "Analyste Junior", "Designer Junior"],

        companies: ["StartupTech", "InnovCorp", "TechFlow"],

        responsibilities: [

          "Développement de fonctionnalités",

          "Tests et debugging",

          "Documentation technique"

        ]

      },

      senior: {

        titles: ["Développeur Senior", "Architecte Solution", "Lead Developer"],

        companies: ["MegaTech", "GlobalSoft", "TechGiant"],

        responsibilities: [

          "Architecture de solutions",

          "Management d'équipe",

          "Optimisation des processus"

        ]

      }

    };

    const level = experience < 5 ? "junior" : "senior";

    const template = cvTemplate[level];

    const cv = utils.formatResponse("Curriculum Vitae",

      `👤 *${nomAuteurMessage}*\n` +

      `💼 ${utils.randomFromArray(template.titles)} en ${domain}\n\n` +

      `📚 Formation\n` +

      `• Master en ${domain}, Université Tech\n` +

      `• Certifications professionnelles\n\n` +

      `💡 Expérience (${experience} ans)\n` +

      template.companies.slice(0, 2).map(company => 

        `• ${company}\n  ${utils.randomFromArray(template.responsibilities)}`

      ).join("\n") + "\n\n" +

      `🔧 Compétences\n${skills.map(s => `• ${s}`).join("\n")}\n\n` +

      `📞 Contact\n• Email: professionnel@email.com\n• LinkedIn: linkedin.com/in/profile`

    );

    repondre(cv);

  } catch (error) {

    repondre(`❌ Erreur: ${error.message}`);

  }

});

// Générateur de noms d'entreprise amélioré

zokou({

  nomCom: "genbusiness_name",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "🏢",

  desc: "Génère des noms d'entreprise créatifs.",

  alias: ["genbizname"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {

    return repondre("❌ Veuillez spécifier un secteur d'activité.");

  }

  const sector = arg[0].toLowerCase();

  

  const businessNames = {

    tech: {

      prefixes: ["Quantum", "Cyber", "Digital", "Smart", "Tech", "Future", "Net", "Data", "Cloud", "AI"],

      suffixes: ["Labs", "Solutions", "Systems", "Tech", "Logic", "Sphere", "Hub", "Core", "Wave", "Mind"],

      formats: [

        (p, s) => `${p}${s}`,

        (p, s) => `${p}-${s}`,

        (p, s) => `${p}.io`,

        (p, s) => `${p}${s}.ai`

      ]

    },

    finance: {

      prefixes: ["Capital", "Wealth", "Asset", "Fund", "Trade", "Money", "Finance", "Credit", "Cash", "Bank"],

      suffixes: ["Plus", "Group", "Partners", "Global", "Trust", "Link", "Wise", "Worth", "Safe", "Pro"],

      formats: [

        (p, s) => `${p}${s}`,

        (p, s) => `${p} ${s}`,

        (p, s) => `${p}First`,

        (p, s) => `${p}360`

      ]

    },

    health: {

      prefixes: ["Vital", "Care", "Health", "Med", "Life", "Cure", "Well", "Bio", "Heal", "Safe"],

      suffixes: ["Care", "Health", "Life", "Plus", "Med", "Fix", "Aid", "Path", "Way", "Zone"],

      formats: [

        (p, s) => `${p}${s}`,

        (p, s) => `${p}-${s}`,

        (p, s) => `${p}4Life`,

        (p, s) => `${p}Express`

      ]

    }

  };

  try {

    if (!businessNames[sector]) {

      throw new Error(`Secteur non reconnu. Choisissez parmi: ${Object.keys(businessNames[sector]).join(", ")}`);

    }

    const { prefixes, suffixes, formats } = businessNames[sector];

    const names = Array(3).fill(0).map(() => {

      const prefix = utils.randomFromArray(prefixes);

      const suffix = utils.randomFromArray(suffixes);

      const format = utils.randomFromArray(formats);

      return format(prefix, suffix);

    });

    const response = utils.formatResponse("Générateur de Noms d'Entreprise",

      `🏢 Secteur: ${sector}\n\n` +

      names.map((name, i) => `${i + 1}. ${name}`).join("\n") + "\n\n" +

      `💡 Ces noms sont générés aléatoirement.\n` +

      `⚠️ Vérifiez la disponibilité avant utilisation.`

    );

    repondre(response);

  } catch (error) {

    repondre(`❌ Erreur: ${error.message}`);

  }

});

// Commande météo améliorée

zokou({

  nomCom: "meteo",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "🌤️",

  desc: "Fournit des informations météorologiques détaillées.",

  alias: ["weather"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {

    return repondre("❌ Veuillez spécifier une ville.");

  }

  const ville = arg.join(" ");

  try {

    // Géocodage

    const geocodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=1&language=fr`;

    const geocodeResponse = await axios.get(geocodeURL);

    if (!geocodeResponse.data.results?.length) {

      throw new Error(`Ville non trouvée: ${ville}`);

    }

    const { latitude, longitude, name, country } = geocodeResponse.data.results[0];

    // Récupération météo

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max`;

    const weatherResponse = await axios.get(weatherURL);

    const weather = weatherResponse.data;

    const response = utils.formatResponse("Météo",

      `📍 *${name}, ${country}*\n\n` +

      `🌡️ Température actuelle: ${weather.current_weather.temperature}°C\n` +

      `🌪️ Vent: ${weather.current_weather.windspeed} km/h\n` +

      `🌤️ Conditions: ${getWeatherDescription(weather.current_weather.weathercode)}\n\n` +

      `📊 Prévisions aujourd'hui:\n` +

      `• Max: ${weather.daily.temperature_2m_max[0]}°C\n` +

      `• Min: ${weather.daily.temperature_2m_min[0]}°C\n` +

      `• Probabilité de pluie: ${weather.daily.precipitation_probability_max[0]}%\n` +

      `• Vent max: ${weather.daily.windspeed_10m_max[0]} km/h\n\n` +

      `⏰ Mise à jour: ${new Date(weather.current_weather.time).toLocaleString()}`

    );

    repondre(response);

  } catch (error) {

    const errorMsg = error.response?.status ? handleWeatherAPIError(error) : error.message;

    repondre(`❌ Erreur: ${errorMsg}`);

  }

});

// Commande des messages d'amour améliorée

zokou({

  nomCom: "love_msg",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "❤️",

  desc: "Génère des messages d'amour personnalisés.",

  alias: ["lovemsg"]

}, async (origineMessage, zk, commandeOptions) => {

  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {

    return repondre("❌ Usage: .love_msg <genre> [style: poétique/simple/drôle]");

  }

  try {

    const genre = arg[0].toLowerCase();

    const style = arg[1]?.toLowerCase() || "simple";

    const messages = {

      fille: {

        poétique: [

          "Ton amour est comme un jardin de roses éternelles, chaque pétale conte notre histoire.",

          "Dans l'océan de mes pensées, tu es la plus belle des sirènes.",

          "Tes yeux sont les étoiles qui guident mon chemin dans la nuit."

        ],

        simple: [

          "Tu es la plus belle chose qui me soit arrivée.",

          "Chaque jour passé avec toi est un cadeau précieux.",

          "Tu illumines ma vie par ta simple présence."

        ],

        drôle: [

          "Si tu étais une pizza, tu serais ma préférée ! 🍕",

          "Es-tu un ange ? Car tu as fait chavirer mon cœur ! 😇",

          "Tu es comme le WiFi - je ne peux pas vivre sans toi ! 📶"

        ]

      },

      garçon: {

        poétique: [

          "Tu es le héros de mon histoire d'amour, le prince de mes rêves.",

          "Dans le livre de ma vie, tu es le plus beau chapitre.",

          "Ton amour est mon refuge, mon havre de paix."

        ],

        simple: [

          "Tu es l'homme de ma vie, mon roc, mon tout.",

          "Avec toi, chaque moment devient magique.",

          "Tu es mon bonheur quotidien."

        ],

        drôle: [

          "Tu es comme mon café du matin - impossible de commencer la journée sans toi ! ☕",

          "Es-tu Superman ? Car tu as des super-pouvoirs sur mon cœur ! 🦸‍♂️",

          "Si tu étais un jeu vidéo, tu serais mon préféré ! 🎮"

        ]

      }

    };

    if (!messages[genre]) {

      throw new Error("Genre non reconnu. Choisissez 'fille' ou 'garçon'");

    }

    if (!messages[genre][style]) {

      throw new Error("Style non reconnu. Choisissez 'poétique', 'simple' ou 'drôle'");

    }

    const selectedMessages = messages[genre][style];

    const message = utils.randomFromArray(selectedMessages);

    const response = utils.formatResponse("Message d'Amour",

      `💝 Genre: ${genre}\n` +

      `✨ Style: ${style}\n\n` +

      `${message}`

    );

    repondre(response);

  } catch (error) {

    repondre(`❌ Erreur: ${error.message}`);

  }

});

// Commande d'auteur améliorée

zokou({

  nomCom: "famous-tech",

  categorie: "FAMOUS-TECH-PLUGINS🇭🇹",

  reaction: "💫",

  desc: "Informations sur l'auteur et le projet.",

  alias: ["ft"]

}, async (origineMessage, zk, commandeOptions) => {

  const { repondre } = commandeOptions;

  const response = utils.formatResponse("Famous Tech",

    `👨‍💻 *Créateur*\n` +

    `• Nom: Famous Tech\n` +

    `• Rôle: Collaborateur externe\n\n` +

    `📱 *Contact*\n` +

    `• WhatsApp: +50943782508\n` +

    `• Email: famoustechht@gmail.com\n\n` +

    `🌐 *Sites Web*\n` +

    `• Mon groupe: https://famous-tech-group.vercel.app\n` +

    `• Blog: https://famous-tech-blog.vercel.app\n\n` +

    `📦 *Projet*\n` +

    `• Nom de catégorie: FAMOUS-TECH-PLUGINS\n` +

    `• Version: 2.0.0\n` +

    `• Licence: MIT\n\n` +

    `💡 *Support*\n` +

    `Pour toute question ou suggestion, n'hésitez pas à me contacter !`

  );

  repondre(response);

});

// Fonctions utilitaires supplémentaires

function handleWeatherAPIError(error) {

  const errorCodes = {

    400: "Requête invalide. Vérifiez les coordonnées.",

    401: "Erreur d'authentification API.",

    403: "Accès refusé à l'API.",

    404: "Données météo non trouvées.",

    429: "Trop de requêtes. Réessayez plus tard.",

    500: "Erreur serveur de l'API météo.",

    502: "API météo temporairement indisponible.",

    503: "Service météo indisponible.",

    504: "Délai d'attente dépassé."

  };

  return errorCodes[error.response.status] || `Erreur inattendue: ${error.response.status}`;

}

function getWeatherDescription(code) {
  const descriptions = {
    0: "☀️ Ciel dégagé",
    1: "🌤️ Peu nuageux",
    2: "⛅ Partiellement nuageux",
    3: "☁️ Nuageux",
    45: "🌫️ Brouillard",
    48: "🌫️ Brouillard givrant",
    51: "🌧️ Bruine légère",
    53: "🌧️ Bruine modérée",
    55: "🌧️ Bruine dense",
    56: "🌧️ Bruine verglaçante",
    57: "🌧️ Bruine verglaçante dense",
    61: "🌧️ Pluie légère",
    63: "🌧️ Pluie modérée",
    65: "🌧️ Pluie forte",
    66: "🌧️ Pluie verglaçante",
    67: "🌧️ Pluie verglaçante forte",
    71: "🌨️ Neige légère",
    73: "🌨️ Neige modérée",
    75: "🌨️ Neige forte",
    77: "❄️ Grains de neige",
    80: "🌦️ Averses légères",
    81: "🌦️ Averses modérées",
    82: "🌦️ Averses violentes",
    85: "🌨️ Averses de neige",
    86: "🌨️ Fortes averses de neige",
    95: "⛈️ Orage",
    96: "⛈️ Orage avec grêle",
    99: "⛈️ Orage violent avec grêle"
  };
  
  return descriptions[code] || "Conditions inconnues";
}
        
