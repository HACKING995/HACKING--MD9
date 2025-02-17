const { ovlcmd } = require("../framework/ovlcmd");
const axios = require("axios");

ovlcmd(
    {
        nom_cmd: "gpt",
        classe: "IA",
        react: "💬",
        desc: "Utilise GPT-4 pour répondre à des questions"
    },
    async (ms_org, ovl, cmd_options) => {
        const { arg, ms } = cmd_options;

        if (!arg.length) {
            return ovl.sendMessage(ms_org, { text: "Veuillez entrer un texte ou une description d'image." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/gpt";

        try {
            const result = await axios.post(apiUrl, {
                messages: [
                    { role: "user", content: prompt }
                ],
                prompt: "Répondre à l'utilisateur.",
                model: "GPT-4",
                markdown: false
            }, {
                headers: { 'Content-Type': 'application/json'}
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
                        return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors du traitement de la requête." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: response.gpt || "Aucune réponse générée." }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

ovlcmd(
    {
        nom_cmd: "dalle",
        classe: "IA",
        react: "🎨",
        desc: "Génère des images avec DALLE-E."
    },
    async (ms_org, ovl, cmd_options) => {
        const { arg, ms } = cmd_options;

        if (!arg.length) {
            return ovl.sendMessage(ms_org, { text: "Veuillez entrer une description pour générer une image." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/image/complements";

        try {
            const result = await axios.post(apiUrl, {
                prompt: prompt,
                model: "dalle2"
            }, {
                headers: { 'Content-Type': 'application/json'}
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
                        return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de la génération de l'image." }, { quoted: ms });
                    case "completed":
                        data = false;
                            return ovl.sendMessage(ms_org, { image: { url: response.images[0] }, caption: `\`\`\`Powered By OVL-MD\`\`\`` }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

ovlcmd(
    {
        nom_cmd: "bing",
        classe: "IA",
        react: "🔎",
        desc: "Utilise Bing pour répondre aux questions."
    },
    async (ms_org, ovl, cmd_options) => {
        const { arg, ms } = cmd_options;

        if (!arg.length) {
            return ovl.sendMessage(ms_org, { text: "Veuillez entrer un texte ou une question." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                conversation_style: "Balanced",
                markdown: false,
                stream: false,
                model: "Bing"
            }, {
                headers: { 'Content-Type': 'application/json'}
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
                        return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors du traitement de la requête." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: response.message || "Aucune réponse générée." }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

ovlcmd(
    {
        nom_cmd: "blackbox",
        classe: "IA",
        react: "🖤",
        desc: "Utilise Blackbox pour répondre aux questions."
    },
    async (ms_org, ovl, cmd_options) => {
        const { arg, ms } = cmd_options;

        if (!arg.length) {
            return ovl.sendMessage(ms_org, { text: "Veuillez entrer un texte ou une question." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [{ role: "user", content: prompt }],
                prompt: "Répondre à l'utilisateur.",
                websearch: false,
                stream: false,
                markdown: false,
                model: "blackbox"
            }, {
                headers: { 'Content-Type': 'application/json'}
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
                        return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors du traitement de la requête." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: response.message || "Aucune réponse générée." }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

ovlcmd(
    {
        nom_cmd: "gemini",
        classe: "IA",
        react: "🪐",
        desc: "Utilise Gemini-Pro pour répondre aux questions."
    },
    async (ms_org, ovl, cmd_options) => {
        const { arg, ms } = cmd_options;

        if (!arg.length) {
            return ovl.sendMessage(ms_org, { text: "Veuillez entrer un texte ou une question." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/chat/complements";

        try {
            const result = await axios.post(apiUrl, {
                messages: [
                    { role: "assistant", content: "" },
                    { role: "user", content: prompt }
                ],
                markdown: false,
                stream: false,
                model: "gemini-pro"
            }, {
                headers: { 'Content-Type': 'application/json' }
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
                        return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors du traitement de la requête." }, { quoted: ms });
                    case "completed":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: response.message || "Aucune réponse générée." }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);

/*ovlcmd(
    {
        nom_cmd: "midjourney",
        classe: "IA",
        react: "🎨",
        desc: "Génère des images avec Midjourney."
    },
    async (ms_org, ovl, cmd_options) => {
        const { arg, ms } = cmd_options;

        if (!arg.length) {
            return ovl.sendMessage(ms_org, { text: "Veuillez entrer un texte ou une description pour générer une image." }, { quoted: ms });
        }

        const prompt = arg.join(" ");
        const apiUrl = "https://nexra.aryahcr.cc/api/image/complements";

        try {
            const result = await axios.post(apiUrl, {
                prompt: prompt,
                model: "midjourney"
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const id = result.data.id;
            let response = null;
            let data = true;

            while (data) {
                response = await axios.get(`http://nexra.aryahcr.cc/api/image/complements/${encodeURIComponent(id)}`);
                response = response.data;

                switch (response.status) {
                    case "pending":
                        data = true;
                        break;
                    case "error":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de la génération de l'image." }, { quoted: ms });
                    case "completed":
                        data = false;
                            return ovl.sendMessage(ms_org, {
                                image: { url: response.images[0] },
                                caption: `\`\`\`Powered By OVL-MD\`\`\``
                            }, { quoted: ms });
                    case "not_found":
                        data = false;
                        return ovl.sendMessage(ms_org, { text: "Tâche introuvable. Veuillez réessayer." }, { quoted: ms });
                }
            }
        } catch (error) {
            console.error("Erreur :", error);
            return ovl.sendMessage(ms_org, { text: "Une erreur est survenue lors de l'appel à l'API." }, { quoted: ms });
        }
    }
);
*/
