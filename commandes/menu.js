const {
  zokou
} = require(__dirname + "/../framework/zokou");
const {
  format
} = require(__dirname + "/../framework/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + '/../set');
zokou({
  'nomCom': 'bugmenu',
  'reaction': '🔎',
  'categorie': "Général"
}, async (_0x5e027e, _0x7fdd83, _0x41f6a1) => {
  let {
    ms: _0x22e05d,
    repondre: _0x14b981,
    prefixe: _0x59b94f,
    nomAuteurMessage: _0x40fc7a,
    mybotpic: _0x22fda6
  } = _0x41f6a1;
  let {
    cm: _0x1b9578
  } = require(__dirname + '/../framework//zokou');
  var _0x2c2a4d = {};
  var _0x1861b0 = "public";
  if (s.MODE.toLowerCase() != 'oui') {
    _0x1861b0 = "privé";
  }
  _0x1b9578.map(async (_0x3fbb36, _0x563a37) => {
    if (!_0x2c2a4d[_0x3fbb36.categorie]) {
      _0x2c2a4d[_0x3fbb36.categorie] = [];
    }
    _0x2c2a4d[_0x3fbb36.categorie].push(_0x3fbb36.nomCom);
  });
  moment.tz.setDefault("Etc/GMT");
  const _0x315018 = moment().format("HH:mm:ss");
  const _0x3cb568 = moment().format("DD/MM/YYYY");
  let _0xf9bfe7 = "\n╭────✧" + s.BOT + "✧────◆\n┃💎╭──────────────\n│💎  _Préfixe_ : " + s.PREFIXE + "\n│💎 _Owner_ : " + s.NOM_OWNER + "\n│💎 _Mode_ : " + _0x1861b0 + "\n│💎 _Commandes_ : " + _0x1b9578.length + "\n│💎 _Date_ : " + _0x3cb568 + "\n│💎 _Heure_ : " + _0x315018 + "\n│💎 _Mémoire_ : " + format(os.totalmem() - os.freemem()) + '/' + format(os.totalmem()) + "\n│💎_Plateforme_ : " + os.platform() + "\n│💎 _Développeurs_ : Thomas \n│  & MD-HACKER \n│💎 _Version_ : V7.2\n│TH  ______________________________\n   *nouvelle version française Thomas*\n╰─────✧HG-BOT✧─────◆ \n\n";
  let _0x2f7cce = "\n👋 salut comment  allez vous " + _0x40fc7a + " 👋\n\n*Voici la liste de mes commandes HACKING :*\n◇                             ◇\n";
  for (const _0x5b0266 in _0x2c2a4d) {
    _0x2f7cce += "╭────❏ *" + _0x5b0266 + "* —————❏";
    for (const _0xb9d479 of _0x2c2a4d[_0x5b0266]) {
      _0x2f7cce += "\n*|❏│ " + _0xb9d479 + '*';
    }
    _0x2f7cce += "\n╰═════════════⊷ \n";
  }
  _0x2f7cce += "\n◇                ◇\n*»»————— --- ★ --- —————««*\nPour utiliser  une  commande, tapez  " + _0x59b94f + "\"nom de la commande\"\n \npowered by Hacking-md\n     **YouTube**: https://youtube.com/@KouameDjakiss?si=k2HqPPSmHBZe3ABd                                         \n*»»——————————★—————————««*\n";
  var _0x5d342a = _0x22fda6();
  if (_0x5d342a.match(/\.(mp4|gif)$/i)) {
    try {
      _0x7fdd83.sendMessage(_0x5e027e, {
        'video': {
          'url': _0x5d342a
        },
        'caption': _0xf9bfe7 + _0x2f7cce,
        'footer': "Je suis *Hacking-MD*, développé par Thomas",
        'gifPlayback': true
      }, {
        'quoted': _0x22e05d
      });
    } catch (_0x22e821) {
      console.log("🥵🥵 Menu erreur " + _0x22e821);
      _0x14b981("🥵🥵 Menu erreur " + _0x22e821);
    }
  } else {
    if (_0x5d342a.match(/\.(jpeg|png|jpg)$/i)) {
      try {
        _0x7fdd83.sendMessage(_0x5e027e, {
          'image': {
            'url': _0x5d342a
          },
          'caption': _0xf9bfe7 + _0x2f7cce,
          'footer': "Je suis *Hacking-MD*, développé par Thomas"
        }, {
          'quoted': _0x22e05d
        });
      } catch (_0x3cfbc4) {
        console.log("🥵🥵 Menu erreur " + _0x3cfbc4);
        _0x14b981("🥵🥵 Menu erreur " + _0x3cfbc4);
      }
    } else {
      _0x14b981(_0xf9bfe7 + _0x2f7cce);
    }
  }
});
