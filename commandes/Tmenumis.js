const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Définir les constantes globales
const WEBSITE = "https://hacking-md.vercel.app";
const GITHUB_REPO = "https://github.com/HACKING995/HACKING--MD9";

zokou({ nomCom: "newt", categorie: "General" }, async (dest, zk, commandeOptions) => {
    
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic, args } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");
    const categories = {};

    // Configuration du mode public/privé
    const mode = (s.MODE).toLowerCase() === "oui" ? "public" : "privé";

    // Organisation des commandes par catégorie
    cm.map((com) => {
        if (!categories[com.categorie]) {
            categories[com.categorie] = [];
        }
        categories[com.categorie].push(com.nomCom);
    });

    // Configuration de l'heure et de la date
    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Vérifie si l'utilisateur a demandé une catégorie spécifique
    const selectedCategory = args && args[0] ? args[0].toLowerCase() : null;

    // Gestion d'un menu spécifique à une catégorie
    if (selectedCategory && categories[selectedCategory]) {
        const emoji = getCategoryEmoji(selectedCategory);

        let categoryContent = `
╔══❀ *MENU ${selectedCategory.toUpperCase()}* ❀═══⊱
║`;

        for (const cmd of categories[selectedCategory]) {
            categoryContent += `
╟➣ ${cmd}`;
        }

        categoryContent += `
║
╚══════════════════⊱

🔗 *Repo GitHub :* [Cliquez ici](${GITHUB_REPO})
`;

        const categoryMessageTemplate = {
            image: { url: mybotpic() },
            caption: `
╔══════《 ${s.BOT} 》══════⊱
╟❀ *INFORMATIONS DU BOT* ❀
╟➣ 👑 *Propriétaire* : ${s.NOM_OWNER}
╟➣ 🌟 *Utilisateur* : ${nomAuteurMessage}
╟➣ 📅 *Date* : ${date}
╟➣ ⏰ *Heure* : ${temps}
╟➣ ⚡ *Préfixe* : ${s.PREFIXE}
╟➣ 🌐 *Mode* : ${mode}
╟➣ 📊 *Commandes* : ${categories[selectedCategory].length}
╟➣ 💻 *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
╟➣ 🔧 *Système* : ${os.platform()}
╟➣ 🌐 *Site* : ${WEBSITE}
╚════════════════════⊱

${categoryContent}`,
            contextInfo: {
                externalAdReply: {
                    title: `HACKING-MD MENU - ${selectedCategory.toUpperCase()}`,
                    body: `Version ${s.VERSION || "LATEST"}`,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: mybotpic(),
                    sourceUrl: GITHUB_REPO
                }
            }
        };

        try {
            return await zk.sendMessage(dest, categoryMessageTemplate, { quoted: ms });
        } catch (error) {
            console.error("⚠️ Erreur menu:", error);
            return await repondre("❌ Une erreur est survenue lors de l'affichage de la catégorie.");
        }
    }

    // Menu principal si aucune catégorie spécifique n'est demandée
    const header = `
╔══════《 ${s.BOT} 》══════⊱
║
╟❀ *INFORMATIONS DU BOT* ❀
║
╟➣ 👑 *Propriétaire* : ${s.NOM_OWNER}
╟➣ 🌟 *Utilisateur* : ${nomAuteurMessage}
╟➣ 📅 *Date* : ${date}
╟➣ ⏰ *Heure* : ${temps}
╟➣ ⚡ *Préfixe* : ${s.PREFIXE}
╟➣ 🌐 *Mode* : ${mode}
╟➣ 📊 *Commandes* : ${cm.length}
╟➣ 💻 *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
╟➣ 🔧 *Système* : ${os.platform()}
╟➣ 🌐 *Site* : ${WEBSITE}
║
╟❀ *DÉVELOPPEURS* : THOMAS & Famous-Tech 
║
╚════════════════════⊱

${readmore}`;

    let menuContent = `
╔══❀ *MENU PRINCIPAL* ❀═══⊱
║`;

    // Trier les catégories par ordre alphabétique
    const sortedCategories = Object.keys(categories).sort();

    for (const categorie of sortedCategories) {
        const emoji = getCategoryEmoji(categorie);
        menuContent += `
║
╟══❑ ${emoji} *${categorie.toUpperCase()}* ❑══⊱`;

        for (const cmd of categories[categorie]) {
            menuContent += `
╟➣ ${cmd}`;
        }

        menuContent += `
║`;
    }

    menuContent += `
║
╚══════════════════⊱

🔗 *Repo GitHub :* [Cliquez ici](${GITHUB_REPO})

┏━━━━━━━━━━━━━━━━━┓
┃  ⭐ HACKING-MD ⭐  ┃
┃    VERSION ${s.VERSION || "LATEST"}   ┃
┃ By Thomas Tech & Famous-Tech ┃
┗━━━━━━━━━━━━━━━━━┛`;

    const messageTemplate = {
        image: { url: mybotpic() },
        caption: header + menuContent,
        contextInfo: {
            externalAdReply: {
                title: `HACKING-MD MENU`,
                body: `Version ${s.VERSION || "LATEST"}`,
                mediaType: 1,
                previewType: 0,
                renderLargerThumbnail: true,
                thumbnailUrl: mybotpic(),
                sourceUrl: GITHUB_REPO
            }
        }
    };

    try {
        await zk.sendMessage(dest, messageTemplate, { quoted: ms });
    } catch (error) {
        console.error("⚠️ Erreur menu:", error);
        await repondre("❌ Une erreur est survenue lors de l'affichage du menu.");
    }
});

// Fonction pour attribuer des émojis aux catégories
function getCategoryEmoji(category) {
    const emojis = {
        'general': '🎯',
        'owner': '👑',
        'groupe': '👥',
        'fun': '🎮',
        'jeux': '🎲',
        'téléchargement': '📥',
        'recherche': '🔍',
        'outils': '🛠️',
        'admin': '⚡',
        'anime': '🎭',
        'nsfw': '🔞',
        'musique': '🎵',
        'conversion': '🔄',
        'sticker': '🎨',
        'utilitaire': '🔧',
        'modération': '🛡️',
        'économie': '💰',
        'info': 'ℹ️',
        'divers': '📦',
        'éditeurs d’images': '🖼️',
        'download': '📥',
        'famous-tech': '🌟',
        'games': '🎮',
        'hentai': '🍑',
        'heroku': '🛠️',
        'ia': '🤖',
        'logo': '🖌️',
        'mods': '🔧'
    };

    return emojis[category.toLowerCase()] || '📱';
}
