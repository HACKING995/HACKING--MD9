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

  // Check if nmap is installed
  exec("which nmap", (error, stdout, stderr) => {
    if (error || stderr) {
      // nmap is not installed, try to install it
      repondre("Nmap n'est pas installé. Tentative d'installation...");
      installNmap(domain, origineMessage, zk, commandeOptions);
    } else {
      // nmap is installed, proceed with the scan
      exec(`nmap ${domain}`, (error, stdout, stderr) => {
        if (error) {
          return repondre(`Erreur lors de l'exécution de Nmap: ${error.message}`);
        }
        if (stderr) {
          return repondre(`Erreur: ${stderr}`);
        }
        repondre(`Résultat du scan Nmap pour ${domain}:\n\`\`\`\n${stdout}\n\`\`\``);
      });
    }
  });
});

function installNmap(domain, origineMessage, zk, commandeOptions) {
  const { repondre } = commandeOptions;

  // Install nmap using apt-get (for Debian-based systems)
  exec("apt-get update && apt-get install -y nmap", (error, stdout, stderr) => {
    if (error) {
      return repondre(`Erreur lors de l'installation de Nmap: ${error.message}`);
    }
    if (stderr) {
      return repondre(`Erreur: ${stderr}`);
    }

    repondre("Nmap a été installé avec succès. Relancement du scan...");

    // Proceed with the scan after installation
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
  }
