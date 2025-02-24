const { zokou, cmd } = require("../framework/zokou"); // Adapté pour Zokou
const config = require("../set");
const prefixe = config.PREFIXE;

zokou(
    {
        nomCom: "aide",
        categorie: "Général",
        desc: "Affiche la liste des commandes avec leurs descriptions ou les détails d'une commande spécifique.",
        alias: ["desc", "help"],
    },
    async (origineMessage, zk, commandeOptions) => {
        try {
            const { arg } = commandeOptions;
            const commandes = cmd; // Récupération des commandes

            if (arg.length) {
                const recherche = arg[0].toLowerCase();
                const commandeTrouvee = commandes.find(
                    (c) =>
                        c.nomCom.toLowerCase() === recherche ||
                        c.alias.some((alias) => alias.toLowerCase() === recherche)
                );

                if (commandeTrouvee) {
                    const message = `📜 *Détails de la commande :*\n\n` +
                        `Nom : *${commandeTrouvee.nomCom}*\n` +
                        `Alias : [${commandeTrouvee.alias.join(", ")}]\n` +
                        `Description : ${commandeTrouvee.desc}`;
                    return await zk.sendMessage(origineMessage, { text: message });
                } else {
                    return await zk.sendMessage(origineMessage, {
                        text: `❌ Commande ou alias "${recherche}" introuvable. Vérifiez et réessayez.`,
                    });
                }
            }

            let descriptionMsg = "📜 *Liste des commandes disponibles :*\n\n";
            commandes.forEach((cmd) => {
                descriptionMsg += `Nom : *${cmd.nomCom}*\nAlias : [${cmd.alias.join(", ")}]\nDescription : ${cmd.desc}\n\n`;
            });

            await zk.sendMessage(origineMessage, { text: descriptionMsg });
        } catch (error) {
            console.error("Erreur lors de l'affichage des descriptions :", error.message || error);
            await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors de l'affichage des descriptions." });
        }
    }
);
