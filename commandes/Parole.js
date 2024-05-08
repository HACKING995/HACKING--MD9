const {zokou} = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics"); 
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({ nomCom: "poll",
        reaction: "✨",
        categorie: "General" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 
    const polll = arg.join(' ');

    let [poll, opt] = polll.split("/");

    if (opt.split(",").length < 2) {
        return repondre(`Format incorrect.\nExemple : poll Quelle est la réponse/Option 1, Option 2`);
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

zokou({ nomCom: "fact",
        reaction: "✌️",
        categorie: "User" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 

    const response = await axios.get('https://nekos.life/api/v2/fact');
    const data = response.data;

    repondre(`◆━━━━━━✦FACT✦━━━━━━◆  
*◇* ${data.fact}

*◇* Powered by *Thomas*

╔═════◇
║◇ *KEEP USING HACKING-MD*
╚════════════════════>  `);
});

zokou({ nomCom: "quotes",
        reaction: "🗿",
        categorie: "User" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 

    const response = await axios.get('https://favqs.com/api/qotd');
    const data = response.data;

    const flashhh = `
◆━━━━━━✦QUOTE✦━━━━━━◆ 
◇ _${data.quote.body}_

◇ *AUTHOR:* ${data.quote.author}

◇ _Powered by:_ *Thomas*

╔═════◇
║◇ *KEEP USING HACKING-MD*
╚════════════════════> `;

    repondre(flashhh);
});

zokou({ nomCom: "define",
        reaction: "😁",
        categorie: "Search" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions;  
        
    if (!arg || arg.length === 0) {
        return repondre("Veuillez fournir un terme à définir.");
    }

    const ques = arg.join(' ');

    try {
        const { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${ques}`);
        const textt = `
        Mot : ${ques}
        Définition : ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
        Exemple : ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`;

        repondre(textt);
    } catch (error) {
        return repondre(`Aucun résultat pour ${ques}`);
    }
});

zokou({ nomCom: "lyrics2",
        reaction: "✨",
        categorie: "Search" }, async (dest, zk, commandeOptions) => {
    
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
