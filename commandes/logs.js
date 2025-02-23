const { zokou } = require("../framework/zokou");
const textmaker = require("../framework/textmaker");

function addTextproCommand(nomCom, text_pro_url, type) {
    zokou(
        {
            nomCom: nomCom,
            categorie: "Logo",
            reaction: "✨",
            desc: "Effet de texte avec Ephoto360"
        },
        async (origineMessage, zk, { arg, ms }) => {
            const query = arg.join(' ');

            if (!query) {
                return await zk.sendMessage(
                    origineMessage,
                    { text: "Vous devez fournir un texte." },
                    { quoted: ms }
                );
            }

            try {
                let logo_url;

                switch (type) {
                    case 1:
                        // Type 1: Un seul mot ou texte
                        if (query.includes(';')) {
                            return await zk.sendMessage(
                                origineMessage,
                                { text: "Veuillez fournir du texte sans point-virgule (;) pour cette commande." },
                                { quoted: ms }
                            );
                        }
                        logo_url = await textmaker(text_pro_url, query);
                        break;

                    case 2:
                        // Type 2: Deux mots ou plus séparés par des point-virgules (;)
                        const textParts = query.split(';');
                        if (textParts.length < 2) {
                            return await zk.sendMessage(
                                origineMessage,
                                { text: "Veuillez fournir exactement deux textes séparés par un point-virgule (;), par exemple : THOMAS;TECH." },
                                { quoted: ms }
                            );
                        }
                        logo_url = await textmaker(text_pro_url, query);
                        break;

                    default:
                        throw new Error(`Type ${type} non supporté.`);
                }

                // Envoyer l'image générée
                await zk.sendMessage(
                    origineMessage,
                    {
                        image: { url: logo_url.url },
                        caption: "\`\`\`Powered By HACKING-MD \`\`\`"
                    },
                    { quoted: ms }
                );
            } catch (error) {
                console.error(`Erreur avec la commande ${nomCom}:`, error.message || error);
                await zk.sendMessage(
                    origineMessage,
                    { text: `Une erreur est survenue lors de la génération du logo : ${error.message}` },
                    { quoted: ms }
                );
            }
        }
    );
}

// Ajout des commandes
addTextproCommand("dragonball", "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html", 1);
addTextproCommand("deadpool1", "https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html", 2);
addTextproCommand("blackpink", "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html", 1);
addTextproCommand("neon", "https://en.ephoto360.com/blue-neon-text-effect-117.html", 1);
addTextproCommand("football", "https://en.ephoto360.com/paul-scholes-shirt-foot-ball-335.html", 2);
addTextproCommand("steel", "https://en.ephoto360.com/heated-steel-lettering-effect-65.html", 2);
addTextproCommand("paint", "https://en.ephoto360.com/paint-splatter-text-effect-72.html", 1);
addTextproCommand("thunder", "https://en.ephoto360.com/thunder-text-effect-online-97.html", 1);
addTextproCommand("thor", "https://en.ephoto360.com/create-thor-logo-style-text-effects-online-for-free-796.html", 1);
addTextproCommand("graffiti1", "https://en.ephoto360.com/cute-girl-painting-graffiti-text-effect-667.html", 2);
addTextproCommand("gold", "https://en.ephoto360.com/modern-gold-5-215.html", 1);
addTextproCommand("neon2", "https://en.ephoto360.com/create-light-effects-green-neon-online-429.html", 1);
addTextproCommand("effacer", "https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html", 1);
addTextproCommand("galaxy", "https://en.ephoto360.com/text-light-galaxy-effectt-345.html", 1);
addTextproCommand("vintage", "https://en.ephoto360.com/write-text-on-vintage-television-online-670.html", 1);
addTextproCommand("gold1", "https://en.ephoto360.com/gold-text-effect-158.html", 1);
addTextproCommand("graffiti2", "https://en.ephoto360.com/graffiti-text-5-180.html", 1);
addTextproCommand("hacker", "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", 1);
addTextproCommand("rain", "https://en.ephoto360.com/foggy-rainy-text-effect-75.html", 1);
addTextproCommand("typography", "https://en.ephoto360.com/create-online-typography-art-effects-with-multiple-layers-811.html", 1);
addTextproCommand("gold3", "https://en.ephoto360.com/glossy-chrome-text-effect-online-424.html", 1);
addTextproCommand("wood", "https://en.ephoto360.com/create-3d-wood-text-effects-online-free-705.html", 2);
addTextproCommand("captain_america", "https://en.ephoto360.com/create-a-cinematic-captain-america-text-effect-online-715.html", 2);
addTextproCommand("cubic", "https://en.ephoto360.com/3d-cubic-text-effect-online-88.html", 1);
addTextproCommand("green_effect", "https://en.ephoto360.com/create-unique-word-green-light-63.html", 1);
addTextproCommand("naruto", "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html", 1);
addTextproCommand("sand", "https://en.ephoto360.com/realistic-3d-sand-text-effect-online-580.html", 1);
addTextproCommand("plasma", "https://en.ephoto360.com/plasma-text-effects-online-71.html", 1);
addTextproCommand("avengers", "https://en.ephoto360.com/create-logo-3d-style-avengers-online-427.html", 2);
addTextproCommand("underwater", "https://en.ephoto360.com/3d-underwater-text-effect-online-682.html", 1);
addTextproCommand("glass", "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html", 1);
addTextproCommand("graffiti3", "https://en.ephoto360.com/cover-graffiti-181.html", 1);
addTextproCommand("summery", "https://en.ephoto360.com/create-a-summery-sand-writing-text-effect-577.html", 1);
addTextproCommand("gold4", "https://en.ephoto360.com/modern-gold-silver-210.html", 1);
addTextproCommand("cloud", "https://en.ephoto360.com/cloud-text-effect-139.html", 1);
addTextproCommand("metal", "https://en.ephoto360.com/metal-text-effect-online-110.html", 1);
addTextproCommand("watercolor", "https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html", 1);
addTextproCommand("sci_fi", "https://en.ephoto360.com/create-a-awesome-logo-sci-fi-effects-492.html", 2);
addTextproCommand("gold5", "https://en.ephoto360.com/free-glitter-text-effect-maker-online-656.html", 2);
addTextproCommand("blackpink2", "https://en.ephoto360.com/create-blackpink-s-born-pink-album-logo-online-779.html", 2);
addTextproCommand("cloud2", "https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html", 1);
addTextproCommand("neon3", "https://en.ephoto360.com/neon-text-effect-171.html", 1);
addTextproCommand("space", "https://en.ephoto360.com/latest-space-3d-text-effect-online-559.html", 2);
addTextproCommand("boobs", "https://en.ephoto360.com/music-equalizer-text-effect-259.html", 1);
addTextproCommand("blackpink3", "https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html", 1);
addTextproCommand("onepiece", "https://en.ephoto360.com/create-one-piece-facebook-cover-online-553.html", 1);
addTextproCommand("dragonball2", "https://en.ephoto360.com/free-online-dragon-ball-facebook-cover-photos-maker-443.html", 1);
addTextproCommand("football2", "https://en.ephoto360.com/text-on-shirt-club-real-madrid-267.html", 2);
addTextproCommand("football3", "https://en.ephoto360.com/create-football-shirt-messi-barca-online-268.html", 1);
addTextproCommand("futuris", "https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html", 1);
