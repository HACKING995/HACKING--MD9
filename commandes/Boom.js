const {zokou} = require("../framework/zokou");
const conf = require("../set");

zokou(
  {
    nomCom: 'bugboom',
    categorie: 'bugmenu',
    reaction: '😈',
  }, 

  async (dest, zk, commandeOptions) => {
    const {ms, arg, repondre, superUser} = commandeOptions;
    const limit = conf.BOOM_MESSAGE_LIMIT;

    if (!superUser) {
      repondre('Vous n\'êtes pas autorisé à utiliser cette commande !!!');
      return;
    } else {
      if (!arg[0] || !arg[1] || arg[0] < 0) {
        repondre(`
Erreur de format
> Essayez : ${conf.PREFIXE}bugboom 10 salut thomas`);
        return;
      } else if (parseInt(arg[0]) > limit) {
        repondre(`Impossible d'envoyer plus de ${limit} messages.`);
        return;
      } else {
        const tasks = [];

        for (let i = 0; i < parseInt(arg[0]); i++) {
          tasks.push(
            new Promise((resolve) => {
              setTimeout(function() {
                repondre(arg.slice(1).join(" "));
                resolve();
              }, 1000 * i);
            })
          );
        }

        await Promise.all(tasks);
        return;
      }
    }
  }
);
