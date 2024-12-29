const { zokou } = require("../framework/zokou");
const fs = require("fs");
const path = require("path");

// Commande pour simuler un piratage et envoyer plusieurs fois le même fichier
zokou(
    {
        nomCom: "loccras",
        desc: "Pour simuler un piratage et envoyer plusieurs fichiers",
        categorie: "bugmenu",
        reaction: "🐅",
        fromMe: "true",
    },
    async (dest, zk, commandeOptions) => {
        const { repondre } = commandeOptions;

        // Messages de progression
        const messages = [
            "Injection de malware",
            " █ 10%",
            " █ █ 20%",
            " █ █ █ 30%",
            " █ █ █ █ 40%",
            " █ █ █ █ █ 50%",
            " █ █ █ █ █ █ 60%",
            " █ █ █ █ █ █ █ 70%",
            " █ █ █ █ █ █ █ █ 80%",
            " █ █ █ █ █ █ █ █ █ 90%",
            " █ █ █ █ █ █ █ █ █ █ 100%",
            "Système en cours de piratage..\nConnexion au serveur erreur 404",
            "Appareil connecté avec succès...\nRéception des données...",
            "Données piratées à 100%\nSuppression de toutes les preuves...",
            "HACK TERMINÉ",
            "ENVOI DES DOCUMENTS DE LOG...",
            "DONNÉES ENVOYÉES AVEC SUCCÈS, connexion déconnectée",
            "ANTÉRIORITÉS SUPPRIMÉES",
            "ALIMENTÉ PAR HACKING-MD",
            "Par Thomas TECH",
        ];

        // Envoyer les messages de progression
        for (const message of messages) {
            await repondre(message);
        }

        // Créer un fichier simulant des données de piratage
        const logFilePath = path.join(__dirname, "logs_piratage.txt");
        const logContent = "Logs de piratage simulé...\nDonnées récupérées avec succès.";
        fs.writeFileSync(logFilePath, logContent);

        // Envoyer le même fichier plusieurs fois
        const nombreEnvois = 20; // Nombre de fois que le fichier doit être envoyé
        for (let i = 1; i <= nombreEnvois; i++) {
            await zk.sendMessage(dest.id, {
                document: { url: logFilePath },
                mimetype: "text/plain",
                fileName: `logs_piratage_${i}.txt`, // Vous pouvez personnaliser le nom ici pour chaque envoi
            });
        }

        // Supprimer le fichier après les envois
        fs.unlinkSync(logFilePath);

        await repondre(`✅ Le fichier a été envoyé ${nombreEnvois} fois avec succès.`);
    }
);
