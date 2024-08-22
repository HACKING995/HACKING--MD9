const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "oui") {
        mode = "privé";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────《《  ${s.BOT} 》》─────✣
│☹︎╭─────────────✣
│☹︎│▸ *PROPRIETAIRE* : ${s.NOM_OWNER}
│☹︎│▸ *AUTEUR* : ${nomAuteurMessage} 
│☹︎╰──────────────✇
│☹︎│▸ *DATE* : ${date}
│☹︎│▸ *PREFIX* : ${s.PREFIXE}
│☹︎│▸ *MODE* : ${mode}
│☹︎│▸ *COMMANDE* : ${cm.length} 
│☹︎│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│☹︎│▸ *PLATEFORME* : ${os.platform()}
│☹︎│▸ *DEVELOPPEUR* : *THOMAS*
│☹︎╰──────────────✇
╰──────────────────✇
> 𝐇𝐀𝐂𝐊𝐈𝐍𝐆-𝐌𝐃 𝐍𝐄𝐖 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 𝐋𝐀𝐓𝐄𝐒𝐓
> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐓𝐇𝐎𝐌𝐀𝐒 𝐓𝐄𝐂𝐇\n${readmore}`;
    
let menuMsg = `

 *❄︎LISTE DES  COMMANDES❄︎*${readmore}
`;

    for (const cat in coms) {
        menuMsg += ` ╭──────✣ *${cat}* ✣─────☹︎`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│✇│ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `> 𝐇𝐀𝐂𝐊𝐈𝐍𝐆-𝐌𝐃 𝐍𝐄𝐖 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 𝐋𝐀𝐓𝐄𝐒𝐓
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
