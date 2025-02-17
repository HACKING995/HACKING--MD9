const { zokou } = require("../framework/zokou");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

zokou({
  nomCom: "capture",
  categorie: "FAMOUS-TECH🇭🇹",
  reaction: "📸",
  desc: "Faire le screenshot du site voulu",
  alias: ["ss"]
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    return repondre("Veuillez fournir une URL pour prendre une capture d'écran.");
  }

  const url = arg[0];

  zk.sendMessage(origineMessage, { text: "*_COMMANDE DEVELOPPÉ Par FAMOUS-TECH, un développeur HAÏTIEN🇭🇹_*" });

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshotPath = path.join(__dirname, "screenshot.png");
    await page.screenshot({ path: screenshotPath });
    await browser.close();

    zk.sendMessage(origineMessage, {
     image: fs.createReadStream(screenshotPath) 
caption: `*BY HACKING-MD*`,
      
    });

    fs.unlinkSync(screenshotPath); // Supprime le fichier de capture d'écran après l'avoir envoyé
  } catch (error) {
    repondre(`Erreur lors de la capture d'écran pour ${url}: ${error.message}`);
  }
});
