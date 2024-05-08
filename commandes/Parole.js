const {zokou} = require("../framework/zokou");
const axios = require("axios");
const traduire = require('../framework/traduction');
const Genius = require("genius-lyrics"); 
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({ nomCom: "sondage",
        reaction: "✨",
        categorie: "General" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 
    const polll = arg.join(' ');

    let [poll, opt] = polll.split("/");

    if (opt.split(",").length < 2) {
        return repondre(`Format incorrect.\nExemple : poll Quelle est la reponse/Option 1, Option 2`);
    }

    let options = [];
    for (let i of opt.split(',')) {
        options.push(i.trim());
    }

    await zk.sendMessage(dest, {
        poll: {
            name: poll.trim(),
            values: options
        }
    });
});

zokou({ nomCom: "faire",
        reaction: "✌️",
        categorie: "fun" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 

    const response = await axios.get('https://nekos.life/api/v2/fact');
    const data = response.data;

    repondre(`◆━━━━━━✦FAIRE✦━━━━━━◆  
*◇* ${data.fact}

*◇* Powered by *Thomas*

╔═════◇
║◇ *FAIRE PAR HACKING-MD*
╚════════════════════>  `);
});

zokou({ nomCom: "citation1",
        reaction: "🗿",
        categorie: "fun" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 

    const response = await axios.get('https://favqs.com/api/qotd');
    const data = response.data;

    const flashhh = `
◆━━━━━━✦CITA✦━━━━━━◆ 
◇ _${data.quote.body}_

◇ *AUTHOR:* ${data.quote.author}
💬 Citation: ${await traduire(quote.quote, { to: 'fr' })}
◇ _Powered by:_ *Thomas*

╔═════◇
║◇ *FAIRE PAR HACKING-MD*
╚════════════════════> `;

    repondre(flashhh);
});

zokou({ nomCom: "definir",
        reaction: "😁",
        categorie: "recherche" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions;  
        
    if (!arg || arg.length === 0) {
        return repondre("Veuillez fournir un terme à définir.");
    }

    const ques = arg.join(' ');

    try {
        const { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${ques}`);
        const textt = `
        Mot : ${ques}
        Définition: ${await traduire(definition.replace, { to: 'fr' })}
        Définition : ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
        Exemple : ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`;

        repondre(textt);
    } catch (error) {
        return repondre(`Aucun résultat pour ${ques}`);
    }
});

zokou({ nomCom: "lyrics",
        reaction: "✨",
        categorie: "recherche" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions;  
        
    try {
        if (!arg || arg.length === 0) {
            return repondre("Veuillez me fournir le nom de la chanson.");
        }

        const question = arg.join(' ');

        const searches = await Client.songs.search(question); 
        const firstSong = searches[0]; 
        const lyrics = await firstSong.lyrics(); 

        await zk.sendMessage(dest, { text: lyrics }, { quoted: ms }); 
    } catch (error) { 
        console.log(error);
        return repondre(`Je n'ai pas trouvé de paroles pour ${text}. Essayez de chercher une autre chanson.`);
    }
});
