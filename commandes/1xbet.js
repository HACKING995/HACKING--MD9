"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "1xbet", reaction: "🎉", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande promo saisie !");
    
    let z = '🎊 Bienvenue dans l\'univers des paris avec 1xbet ! 🎊\n\n';
    let d = 'Utilisez le code promo *FIXD1* pour bénéficier d\'offres exclusives et maximiser vos gains !\n';
    let encouragement = 'Ne manquez pas cette chance, rejoignez-nous maintenant et pariez avec confiance !\n';
    
    let img = 'https://iili.io/2OjZF4e.jpg';
    
    
    let varmess = z + d + encouragement;
    
    
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
});

console.log("Commande promo prête !");
