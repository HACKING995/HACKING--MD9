const { zokou } = require("../framework/zokou");
const axios = require("axios");

// Commande GPT
zokou(
    {
        nomCom: "gpt",
        categorie: "IA",
        reaction: "💬",
        desc: "Utilise GPT-4 pour répondre à des questions",
    },
    async (dest, zk, commandeOptions) => {
        const { arg, ms } = commandeOptions;

        if (!arg.length) {
            return zk.sendMessage(dest.id, { text: "Veuillez entrer un texte ou une question." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/gpt";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                prompt: "Répondre à l'utilisateur.",
                model: "GPT-4",
                markdown: false,
            });

            const id = result.data.id;
            let response = null;
            let data = true;

            while (data) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(id)}`);
                response = response.data;

                switch (response.status) {
                    case "pending":
                        data = true;
                        break;
                    case "error":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors du traitement de la requête." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return zk.sendMessage(dest.id, { text: response.gpt || "Aucune réponse générée." }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur GPT :", error);
            return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

// Commande DALL-E
zokou(
    {
        nomCom: "dalle",
        categorie: "IA",
        reaction: "🎨",
        desc: "Génère des images avec DALLE-E.",
    },
    async (dest, zk, commandeOptions) => {
        const { arg, ms } = commandeOptions;

        if (!arg.length) {
            return zk.sendMessage(dest.id, { text: "Veuillez entrer une description pour générer une image." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/image/complements";

        try {
            const result = await axios.post(apiUrl, {
                prompt: prompt,
                model: "dalle2",
            });

            const id = result.data.id;
            let response = null;
            let data = true;

            while (data) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/image/complements/${encodeURIComponent(id)}`);
                response = response.data;

                switch (response.status) {
                    case "pending":
                        data = true;
                        break;
                    case "error":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors de la génération de l'image." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return zk.sendMessage(dest.id, { image: { url: response.images[0] }, caption: `\`\`\`Powered By Zokou\`\`\`` }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur DALL-E :", error);
            return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

// Commande Bing
zokou(
    {
        nomCom: "bing",
        categorie: "IA",
        reaction: "🔎",
        desc: "Utilise Bing pour répondre aux questions.",
    },
    async (dest, zk, commandeOptions) => {
        const { arg, ms } = commandeOptions;

        if (!arg.length) {
            return zk.sendMessage(dest.id, { text: "Veuillez entrer un texte ou une question." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                conversation_style: "Balanced",
                markdown: false,
                stream: false,
                model: "Bing",
            });

            const id = result.data.id;
            let response = null;
            let data = true;

            while (data) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(id)}`);
                response = response.data;

                switch (response.status) {
                    case "pending":
                        data = true;
                        break;
                    case "error":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors du traitement de la requête." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return zk.sendMessage(dest.id, { text: response.message || "Aucune réponse générée." }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur Bing :", error);
            return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

// Commande Gemini-Pro
zokou(
    {
        nomCom: "gemini2",
        categorie: "IA",
        reaction: "🪐",
        desc: "Utilise Gemini-Pro pour répondre aux questions.",
    },
    async (dest, zk, commandeOptions) => {
        const { arg, ms } = commandeOptions;

        if (!arg.length) {
            return zk.sendMessage(dest.id, { text: "Veuillez entrer un texte ou une question." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [
                    { role: "assistant", content: "" },
                    { role: "user", content: prompt },
                ],
                markdown: false,
                stream: false,
                model: "gemini-pro",
            });

            const id = result.data.id;
            let response = null;
            let data = true;

            while (data) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(id)}`);
                response = response.data;

                switch (response.status) {
                    case "pending":
                        data = true;
                        break;
                    case "error":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors du traitement de la requête." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return zk.sendMessage(dest.id, { text: response.message || "Aucune réponse générée." }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return zk.sendMessage(dest.id, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur Gemini-Pro :", error);
            return zk.sendMessage(dest.id, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);
