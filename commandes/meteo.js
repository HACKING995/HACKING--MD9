const { zokou } = require("../framework/zokou");
const axios = require("axios");
/* Je ne suis pas l’auteur se cette commande c’est le travail d’une IA */
zokou({
  nomCom: "meteo",
  categorie: "FAMOUS-TECH🇭🇹",
  reaction: "🌤️",
  desc: "Donne la météo actuelle pour une ville.",
  alias: ["weather"]
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    return zk.sendMessage(origineMessage, { text: "Veuillez spécifier une ville." });
  }

  const ville = arg[0];

  try {
    // Utiliser une API de géocodage pour obtenir les coordonnées de la ville
    const geocodingResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${ville}`);
    const location = geocodingResponse.data.results[0];

    if (!location) {
      return zk.sendMessage(origineMessage, { text: "Ville non trouvée. Veuillez réessayer avec un nom de ville valide." });
    }

    const latitude = location.latitude;
    const longitude = location.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

    const response = await axios.get(url);
    const data = response.data;
    const temperature = data.current_weather.temperature;
    const windSpeed = data.current_weather.windspeed;
    const weatherCode = data.current_weather.weathercode;
    const weatherDescription = getWeatherDescription(weatherCode);
    const weatherInfo = `Météo à ${ville}:\nTempérature: ${temperature}°C\nVitesse du vent: ${windSpeed} m/s\nDescription: ${weatherDescription}`;
    zk.sendMessage(origineMessage, { text: weatherInfo });
  } catch (error) {
    zk.sendMessage(origineMessage, { text: "Désolé, je n'ai pas pu récupérer la météo pour cette ville." });
  }
});

function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    0: "Ciel dégagé",
    1: "Principalement clair",
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine légère",
    53: "Bruine modérée",
    55: "Bruine dense",
    56: "Bruine verglaçante légère",
    57: "Bruine verglaçante dense",
    61: "Pluie légère",
    63: "Pluie modérée",
    65: "Pluie forte",
    66: "Pluie verglaçante légère",
    67: "Pluie verglaçante forte",
    71: "Chute de neige légère",
    73: "Chute de neige modérée",
    75: "Chute de neige forte",
    77: "Grains de neige",
    80: "Averses de pluie légères",
    81: "Averses de pluie modérées",
    82: "Averses de pluie violentes",
    85: "Averses de neige légères",
    86: "Averses de neige fortes",
    95: "Orage léger ou modéré",
    96: "Orage avec grêle légère",
    99: "Orage avec grêle forte"
  };

  return weatherDescriptions[weatherCode] || "Conditions météorologiques inconnues";
}
