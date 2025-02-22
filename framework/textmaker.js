const cheerio = require("cheerio");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const FormData = require("form-data");
const cookie = require("cookie");

const textmaker = async (url, texts, radioOption = '') => {
  texts = texts.split(";");

  // Initial GET request to retrieve token and server data
  const initialResponse = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "GoogleBot",
    },
  });

  const initialHtml = await initialResponse.text();
  const initialCookies = initialResponse.headers
    .get("set-cookie")
    .split(",")
    .map(cookie.parse)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const sessionCookies = Object.entries({
    __cfduid: initialCookies.__cfduid,
    PHPSESSID: initialCookies.PHPSESSID,
  })
    .map(([key, value]) => cookie.serialize(key, value))
    .join("; ");

  const $ = cheerio.load(initialHtml);
  const token = $("input[name=\"token\"]").attr("value");
  const buildServer = $("input[name=\"build_server\"]").attr("value");
  const buildServerId = $("input[name=\"build_server_id\"]").attr("value");

  // Récupérer les options pour radio0[radio]
  const radioOptions = $("input[name^='radio0[radio]']")
    .map((i, el) => $(el).val())
    .get();

  // Choisir une option aléatoire si `radioOption` n'est pas fourni
  if (radioOptions.length > 0 && !radioOption) {
    const randomIndex = Math.floor(Math.random() * radioOptions.length);
    radioOption = radioOptions[randomIndex];
    console.log(`Option radio sélectionnée aléatoirement : ${radioOption}`);
  }

  // Préparer la requête POST avec les données du formulaire
  const formData = new FormData();
  texts.forEach(text => formData.append("text[]", text.trim()));
  formData.append("submit", "Go");
  if (radioOption) {
    formData.append("radio0[radio]", radioOption);
  }
  formData.append("token", token);
  formData.append("build_server", buildServer);
  formData.append("build_server_id", buildServerId);

  // Envoyer la requête POST
  const postResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      "Cookie": sessionCookies,
      ...formData.getHeaders(),
    },
    body: formData.getBuffer(),
  });

  const postHtml = await postResponse.text();
  const postResult = cheerio.load(postHtml);

  const resultValue = url.includes("en.ephoto360.com")
    ? postResult("input[name=\"form_value_input\"]").attr("value")
    : postResult("#form_value").first().text();

  if (!resultValue) {
    return { status: false };
  }

  const resultData = JSON.parse(resultValue);

  // Préparer la requête finale pour créer l'image
  const finalFormData = new FormData();
  finalFormData.append("id", resultData.id);
  resultData.text.forEach(text => finalFormData.append("text[]", text));
  finalFormData.append("token", resultData.token);
  finalFormData.append("build_server", resultData.build_server);
  finalFormData.append("build_server_id", resultData.build_server_id);
  if (resultData.radio0) {
    finalFormData.append("radio0[radio]", resultData.radio0.radio);
  }

  const finalResponse = await fetch(`${url.split('/').slice(0, 3).join('/')}/effect/create-image`, {
    method: "POST",
    headers: {
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      "Cookie": sessionCookies,
      ...finalFormData.getHeaders(),
    },
    body: finalFormData.getBuffer(),
  });

  const finalResult = await finalResponse.json();

  if (!finalResult.image) {
    throw new Error(`textmaker: Erreur lors de la génération de l'image`);
  }
  return {
    status: finalResult.success,
    url: `${buildServer}${finalResult.image}`,
  };
};

module.exports = textmaker;
