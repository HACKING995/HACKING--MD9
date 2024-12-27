const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { getBuffer } = require("../framework/dl/Function");
const { default: axios } = require('axios');

const runtime = function (seconds) { 
    seconds = Number(seconds); 
    var d = Math.floor(seconds / (3600 * 24)); 
    var h = Math.floor((seconds % (3600 * 24)) / 3600); 
    var m = Math.floor((seconds % 3600) / 60); 
    var s = Math.floor(seconds % 60); 
    var dDisplay = d > 0 ? d + (d == 1 ? " jour, " : " j, ") : ""; 
    var hDisplay = h > 0 ? h + (h == 1 ? " heure, " : " h, ") : ""; 
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
    var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " s") : ""; 
    return dDisplay + hDisplay + mDisplay + sDisplay; 
}; 

zokou({ 
    nomCom: 'lcdbug',
    desc: 'Pour vérifier le temps d\'exécution',
    categorie: 'bugmenu',
    reaction: '📄', 
    fromMe: 'true', 
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    await repondre(`*_veuillez patienter..._*`); 
});

zokou({ 
    nomCom: 'cdbug',
    desc: 'Pour récupérer tous les membres',
    categorie: 'bugmenu',
    reaction: '♻️', 
    fromMe: 'true', 
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    await repondre(`*_récupération de tous les membres_*`); 
});






zokou({ 
    nomCom: 'crash',
    desc: 'Pour simuler un piratage',
    categorie: 'bugmenu',
    reaction: '🐅', 
    fromMe: 'true', 
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    await repondre(`
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
    "Par Thomas TECH"
    `); 
});
