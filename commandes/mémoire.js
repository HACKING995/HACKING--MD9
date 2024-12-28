const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { default: axios } = require('axios');
const os = require('os');

zokou({
    nomCom: 'fuck',
    desc: 'To check ping and system info',
    Categorie: 'Général',
    reaction: '🚀',
    fromMe: 'true',
},
async (dest, zk, commandeOptions) => {
    const { arg, repondre } = commandeOptions;

    
    const currentTime = moment().tz("Europe/Paris").format('LLLL');

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    
    const totalMemoryMb = (totalMemory / 1024 / 1024).toFixed(2);
    const freeMemoryMb = (freeMemory / 1024 / 1024).toFixed(2);
    const usedMemoryMb = (usedMemory / 1024 / 1024).toFixed(2);

    
    return repondre(`*Thomas tech!!!*\n` +
                    `*Heure actuelle:* ${currentTime}\n` +
                    `*Mémoire totale:* ${totalMemoryMb} Mo\n` +
                    `*Mémoire utilisée:* ${usedMemoryMb} Mo\n` +
                    `*Mémoire libre:* ${freeMemoryMb} Mo`);
});
