const { zokou } = require("../framework/zokou");
const { exec } = require("child_process");

zokou({
  nomCom: "nmap",
  categorie: "FAMOUS-TECH🇭🇹 HACKS",
  reaction: "🔍",
  desc: "Scan a domain using Nmap",
  alias: ["scan"]
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    return repondre("Veuillez fournir un domaine à scanner.");
  }

  const domain = arg[0];

  zk.sendMessage(origineMessage, { text: "*POWERED BY FAMOUS-TECH AN HAITIAN Devloper🇭🇹.*" });

  exec(`nmap ${domain}`, (error, stdout, stderr) => {
    if (error) {
      return repondre(`Erreur lors de l'exécution de Nmap: ${error.message}`);
    }
    if (stderr) {
      return repondre(`Erreur: ${stderr}`);
    }
    repondre(`Résultat du scan Nmap pour ${domain}:\n\`\`\`\n${stdout}\n\`\`\``);
  });
});
