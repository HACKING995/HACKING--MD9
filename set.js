const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'HACKING-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUlvZDc4NVZJdjZ0WVFpbzZhU2ZTTFMrUkJSS3BSVXdyZGl6WnMvUGExMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXM2OHRDV2lxWXhPdHlXUE0yZis3SlJvSi9UWkZJNjVYby9Ta1ZXUFhtOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvT0xic2h1RFlIYk1Pb2VKcEZHM21oZ25BUG5pQnVlWE1VYUVBTS9McFh3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUkMwTmkycExOaUgwaVJrRDQzT0F6aHpNc0w3OExTZnZRVzRHeXR3d21FPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNMTDhnbXZjanY5c3A0eElVdEdRMWQxd3dseVpGSkF5T01XclptNUw0Rzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkcxbjIySU9PTnhPMVY1OFR1WGRNUDFuUzQ0SUlZV1VhakZ5enRHOHBiU1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUkzQ1ZaR3ZLNU0rUDRKM0hQQWNicDF5bkNlQ1cvNmxGOWtXZS9kL1BHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSlV2MERhd28rMk5qa0szK1pTdHJIQXNUQkI3OU4weVh6WDl0b3lpYWdVdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVrQ29LVHVldGdwcE42TmNsd0FEcGFRQUFObnBDM2JMMHdWaHpPYnNmVVdkbS94ZnZNTGc0VWluWExPSkM4cFVUMFhrZEliQUxoZzVVSTJtS1JjS2hnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJpaXloMmh0R2g3N253cEMxNncycnBCRFJ3L2RGeW5iRXZ3Z3A1Wld1ZEpVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoclhmamtVVVFIMmQyTThwMGp4Vm13IiwicGhvbmVJZCI6IjlkYzk3NWQwLWU5YzEtNDJmYi1hYTFkLTFjMWE1MDkzMTY4YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoSEVPbXRnY01reUZ2ZWJzSWxieG5zbUNheEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWFJKzlhZExCTFdxVUJndXAydzZ1c3hvaXo0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNNQzE4WFdTIiwibWUiOnsiaWQiOiIyNDM5NzI2ODE5NzQ6MjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiS8OLTsOETvOxoo8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p6emc5SURFSmkyc3JVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InJja2pCS21BSG5iMi84MXVPU21GWVN2UkZGSHJJMVFjbVVldTlJQU5obHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik1Fd1NScHJoODYwNDNENnlXQ2V4dzRrRkdMekZkTUtlTGtkNmZVQkV0UDlrMFRwbStKemU0U21nR0owUll0UHoxVkRYaDdtVWZ0UVZrWDdmamdVcURnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUbHZKUmZqQ2JFWk5iSVNQQ2RQSWJaTFY5K0dFWE14Q2F5dUpyejJlemlmRUtQRWo3QmMyeEhLZ0tjZlphTi82eTN4NjE3SVBaSTllN1RBdk16SnBndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0Mzk3MjY4MTk3NDoyN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhM0pJd1NwZ0I1Mjl2L05iamtwaFdFcjBSUlI2eU5VSEpsSHJ2U0FEWVpiIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNTg3OTQyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZoeSJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE:
    NOM_OWNER: process.env.NOM_OWNER || "KËNÄN",
    NUMERO_OWNER : process.env.NUMERO_OWNER,243972681974            
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'KENAN',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'oui',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "DATABASE_HOST=ep-royal-glitter-a2e495e1.eu-central-1.pg.koyeb.app
DATABASE_USER=koyeb-adm
DATABASE_PASSWORD=h4CaZFqkvL3c
DATABASE_NAME=koyebdb",
   DB: process.env.DB || DATABASE_HOST=ep-royal-glitter-a2e495e1.eu-central-1.pg.koyeb.app
DATABASE_USER=koyeb-adm
DATABASE_PASSWORD=h4CaZFqkvL3c
DATABASE_NAME=koyebdb
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
