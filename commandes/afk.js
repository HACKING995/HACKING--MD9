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
        const { repondre, arg } = commandeOptions;

        if (!arg.length) {
            return repondre("Veuillez entrer un texte ou une description.");
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/gpt";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                model: "GPT-4",
                markdown: false,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const id = result.data.id;
            let response;
            let data = true;

            while (data) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(id)}`);
                response = response.data;

                switch (response.status) {
                    case "pending":
                        continue; // Continue to check
                    case "error":
                        data = false;
                        return repondre("Une erreur est survenue lors du traitement de la requête.");
                    case "completed":
                        data = false;
                        return repondre(response.gpt || "Aucune réponse générée."); // Vérifie si c'est response.gpt
                    case "not_found":
                        data = false;
                        return repondre("Tâche introuvable. Veuillez réessayer.");
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return repondre("Une erreur est survenue lors de l'appel à l'API.");
        }
    }
);












// Commande DALL-E
zokou(
    {
        nomCom: "dalle",
        categorie: "IA",
        reaction: "🎨",
        desc: "Génère des images avec DALL-E.",
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg.length) {
            return repondre("Veuillez entrer une description pour générer une image.");
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/image/complements";

        try {
            const result = await axios.post(apiUrl, { prompt: prompt, model: "dalle2" }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const id = result.data.id;
            let response;

            while (true) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/image/complements/${encodeURIComponent(id)}`);
                switch (response.data.status) {
                    case "pending":
                        continue;
                    case "error":
                        return repondre("Une erreur est survenue lors de la génération de l'image.");
                    case "completed":
                        return repondre({ image: { url: response.data.images[0] }, caption: `\`\`\`Powered By Thomas TECH \`\`\`` });
                    case "not_found":
                        return repondre("Tâche introuvable. Veuillez réessayer.");
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return repondre("Une erreur est survenue lors de l'appel à l'API.");
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
        const { repondre, arg, ms } = commandeOptions;

        if (!arg.length) {
            return repondre("Veuillez entrer un texte ou une question.");
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                model: "Bing",
                conversation_style: "Balanced",
                markdown: false,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const id = result.data.id;
            let response;

            while (true) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(id)}`);
                switch (response.data.status) {
                    case "pending":
                        continue;
                    case "error":
                        return repondre("Une erreur est survenue lors du traitement de la requête.");
                    case "completed":
                        return repondre(response.data.message || "Aucune réponse générée.");
                    case "not_found":
                        return repondre("Tâche introuvable. Veuillez réessayer.");
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return repondre("Une erreur est survenue lors de l'appel à l'API.");
        }
    }
);

// Commande Blackbox
zokou(
    {
        nomCom: "blackbox",
        categorie: "IA",
        reaction: "🖤",
        desc: "Utilise Blackbox pour répondre aux questions.",
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg.length) {
            return repondre("Veuillez entrer un texte ou une question.");
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                model: "blackbox",
                markdown: false,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const id = result.data.id;
            let response;

            while (true) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(id)}`);
                switch (response.data.status) {
                    case "pending":
                        continue;
                    case "error":
                        return repondre("Une erreur est survenue lors du traitement de la requête.");
                    case "completed":
                        return repondre(response.data.message || "Aucune réponse générée.");
                    case "not_found":
                        return repondre("Tâche introuvable. Veuillez réessayer.");
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return repondre("Une erreur est survenue lors de l'appel à l'API.");
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
        const { repondre, arg, ms } = commandeOptions;

        if (!arg.length) {
            return repondre("Veuillez entrer un texte ou une question.");
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                model: "gemini-pro",
                markdown: false,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const id = result.data.id;
            let response;

            while (true) {
                response = await axios.get(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(id)}`);
                switch (response.data.status) {
                    case "pending":
                        continue;
                    case "error":
                        return repondre("Une erreur est survenue lors du traitement de la requête.");
                    case "completed":
                        return repondre(response.data.message || "Aucune réponse générée.");
                    case "not_found":
                        return repondre("Tâche introuvable. Veuillez réessayer.");
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return repondre("Une erreur est survenue lors de l'appel à l'API.");
        }
    }
);
