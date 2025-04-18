const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });

const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL || databasePath;

module.exports = {
    session: process.env.SESSION_ID || 'zokk',
    ETAT: process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Hacking-Md",
    NUMERO_OWNER: process.env.NUMERO_OWNER,
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    CODE_PAYS: process.env.CODE_PAYS || '509',
    BOT: process.env.NOM_BOT || 'Hacking_MD',
    URL: process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY: process.env.HEROKU_APY_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    CHAT_BOT: process.env.CHAT_BOT || 'non',
    DP: process.env.STARTING_BOT_MESSAGE || 'oui',
    CHATBOT: process.env.PM_CHATBOT || "non",
    ATD: process.env.ANTI_DELETE_MESSAGE || 'non',
    ANTI_VV: process.env.ANTI_VUE_UNIQUE || 'non',
    LIKE_STATUS: process.env.LIKE_STATUS || 'non',
    DATABASE_URL,
    DATABASE:
        DATABASE_URL === databasePath
            ? "postgresql://thomas_k3lw_user:ePmbhxsGM9beyLb2Y0thgJO6WqkQvHGD@dpg-cvoqc1ngi27c73at2fmg-a.oregon-postgres.render.com/thomas_k3lw"
            : DATABASE_URL,
    DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
    
    /*sequelize: new Sequelize(DATABASE_URL, {
        dialect: DATABASE_URL === databasePath ? 'sqlite' : 'postgres',
        storage: DATABASE_URL === databasePath ? DATABASE_URL : undefined,
        ssl: DATABASE_URL !== databasePath,
        protocol: 'postgres',
        dialectOptions: DATABASE_URL !== databasePath
            ? {
                native: true,
                ssl: { require: true, rejectUnauthorized: false },
            }
            : undefined,
        logging: false,
    }), */
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
