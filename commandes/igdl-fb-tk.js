const a34_0x2a09e7 = function () {
  let _0x215e06 = true;
  return function (_0x349603, _0x1d29c8) {
    const _0x509d48 = _0x215e06 ? function () {
      if (_0x1d29c8) {
        const _0x203e74 = _0x1d29c8.apply(_0x349603, arguments);
        _0x1d29c8 = null;
        return _0x203e74;
      }
    } : function () {};
    _0x215e06 = false;
    return _0x509d48;
  };
}();
const a34_0x48a767 = a34_0x2a09e7(this, function () {
  return a34_0x48a767.toString().search("(((.+)+)+)+$").toString().constructor(a34_0x48a767).search("(((.+)+)+)+$");
});
a34_0x48a767();
const {
  zokou: a34_0x1f41ea
} = require("../framework/zokou");
const a34_0x1bc283 = require("@xaviabot/fb-downloader");
const a34_0x19e977 = require('fs');
const {
  default: a34_0x44c044
} = require("axios");
const a34_0x3c7e2d = {
  "nomCom": "igdl",
  "categorie": "Téléchargement",
  "desc": "Télécharger une vidéo ou une image Instagram"
};
a34_0x1f41ea(a34_0x3c7e2d, async (_0x2c7ad1, _0x44c2d9, _0x99d5bf) => {
  const {
    ms: _0x270ec8,
    repondre: _0x277f9a,
    arg: _0x288658
  } = _0x99d5bf;
  let _0x35fdae = _0x288658.join(" ");
  if (!_0x288658[0x0]) {
    _0x277f9a("Veillez insérer un lien video instagramme");
    return;
  }
  ;
  try {
    let _0x26e00b = await a34_0x44c044("http://api.maher-zubair.tech/download/instagram?url=" + _0x35fdae);
    try {
      const _0xe567d3 = {
        url: _0x26e00b.data.result[0x0].url
      };
      const _0xed4cb1 = {
        "video": _0xe567d3,
        "caption": "ig video downloader powered by *Hacking-Md*",
        "gifPlayback": false
      };
      const _0x575253 = {
        "quoted": _0x270ec8
      };
      _0x44c2d9.sendMessage(_0x2c7ad1, _0xed4cb1, _0x575253);
    } catch (_0x33a489) {
      const _0x358b81 = {
        url: _0x26e00b.data.result[0x0].url
      };
      const _0x46d137 = {
        "image": _0x358b81,
        "caption": "ig image downloader powered by *Zokou-Md*"
      };
      _0x44c2d9.sendMessage(_0x2c7ad1, _0x46d137);
    }
  } catch (_0x2f159f) {
    _0x277f9a("erreur survenue lors du téléchargement \n " + _0x2f159f);
  }
});
const a34_0x584a8e = {
  "nomCom": "fbdl",
  "categorie": "Téléchargement",
  "reaction": "📽️",
  "desc": "Télécharger une vidéo ou une image Facebook en HD"
};
a34_0x1f41ea(a34_0x584a8e, async (_0x80b10a, _0x1fc3bd, _0x15f9fd) => {
  const {
    repondre: _0xa13998,
    ms: _0x2f4e21,
    arg: _0x590353
  } = _0x15f9fd;
  if (!_0x590353[0x0]) {
    _0xa13998("Veuillez fournir une URL vidéo publique de Facebook à télécharger !");
    return;
  }
  const _0x4fd683 = _0x590353.join(" ");
  try {
    a34_0x1bc283(_0x4fd683).then(_0x14aab5 => {
      let _0x344bda = "\n        titre: " + _0x14aab5.title + "\n        Lien: " + _0x14aab5.url + "\n      ";
      const _0x3f5e3c = {
        url: _0x14aab5.thumbnail
      };
      const _0x28f802 = {
        "image": _0x3f5e3c,
        "caption": _0x344bda
      };
      const _0x17381a = {
        "quoted": _0x2f4e21
      };
      _0x1fc3bd.sendMessage(_0x80b10a, _0x28f802, _0x17381a);
      const _0x248645 = {
        url: _0x14aab5.hd
      };
      const _0x13d640 = {
        "video": _0x248645,
        "caption": "Téléchargeur de vidéo Facebook, propulsé par *zokou-MD*"
      };
      const _0x3aab9a = {
        "quoted": _0x2f4e21
      };
      _0x1fc3bd.sendMessage(_0x80b10a, _0x13d640, _0x3aab9a);
    })["catch"](_0x1fd574 => {
      console.log("Error:", _0x1fd574);
      _0xa13998(_0x1fd574);
    });
  } catch (_0x23c284) {
    console.error("Erreur lors du téléchargement de la vidéo :", _0x23c284);
    _0xa13998("Erreur lors du téléchargement de la vidéo.", _0x23c284);
  }
});
const a34_0x523e6c = {
  "nomCom": "tiktok",
  "categorie": "Téléchargement",
  "reaction": '🎵',
  "desc": "Télécharger une vidéo Tiktok",
  "alias": ["ttv"]
};
a34_0x1f41ea(a34_0x523e6c, async (_0x296bb1, _0x46469d, _0x34b542) => {
  const {
    arg: _0x552ade,
    ms: _0x1f8fe2,
    prefixe: _0x191252,
    repondre: _0x27d06f
  } = _0x34b542;
  if (!_0x552ade[0x0]) {
    _0x27d06f("Voici comment utiliser la commande:\n " + _0x191252 + "tiktok lien_video_tiktok");
    return;
  }
  const _0xb0465f = _0x552ade.join(" ");
  try {
    let _0xf271a4 = await a34_0x44c044({
      'url': "https://test-api-apms.onrender.com/api/tiktokv2?url=" + _0xb0465f + "&apikey=BrunoSobrino",
      'method': "GET",
      'responseType': "arraybuffer"
    });
    a34_0x19e977.writeFileSync("./tiktokvideo.mp4", Buffer.from(_0xf271a4.data));
    const _0x9c5556 = {
      url: "./tiktokvideo.mp4"
    };
    const _0x396133 = {
      "video": _0x9c5556,
      "caption": "Et voila!",
      "gifPlayback": false
    };
    await _0x46469d.sendMessage(_0x296bb1, _0x396133);
    console.log("Done!");
  } catch (_0xff92c2) {
    _0x27d06f("Erreur lors du telechargement de la video");
    console.log(_0xff92c2);
  } finally {
    a34_0x19e977.unlinkSync("./tiktokvideo.mp4");
  }
});
const a34_0xcea3f5 = {
  "nomCom": "fbdl2",
  "categorie": "Téléchargement",
  "reaction": "📽️",
  "desc": "Télécharger une vidéo ou une image Facebook en faible qualité"
};
a34_0x1f41ea(a34_0xcea3f5, async (_0x48cf83, _0x3ee8a3, _0x57b870) => {
  const {
    repondre: _0x5c3d34,
    ms: _0x54e1b9,
    arg: _0x9bb73f
  } = _0x57b870;
  if (!_0x9bb73f[0x0]) {
    _0x5c3d34("Veuillez fournir une URL vidéo publique de Facebook à télécharger !");
    return;
  }
  const _0x4ceabd = _0x9bb73f.join(" ");
  try {
    a34_0x1bc283(_0x4ceabd).then(_0x33a624 => {
      let _0x102b8c = "\n        titre: " + _0x33a624.title + "\n        Lien: " + _0x33a624.url + "\n      ";
      const _0x3620a0 = {
        url: _0x33a624.thumbnail
      };
      const _0x2139d7 = {
        "image": _0x3620a0,
        "caption": _0x102b8c
      };
      const _0x3beebd = {
        "quoted": _0x54e1b9
      };
      _0x3ee8a3.sendMessage(_0x48cf83, _0x2139d7, _0x3beebd);
      const _0x22467c = {
        url: _0x33a624.sd
      };
      const _0x5d91b0 = {
        "video": _0x22467c,
        "caption": "Téléchargeur de vidéo Facebook, propulsé par *zokou-MD*"
      };
      const _0xab9093 = {
        "quoted": _0x54e1b9
      };
      _0x3ee8a3.sendMessage(_0x48cf83, _0x5d91b0, _0xab9093);
    })["catch"](_0x92f3a4 => {
      console.log("Error:", _0x92f3a4);
      _0x5c3d34(_0x92f3a4);
    });
  } catch (_0x4b5825) {
    console.error("Erreur lors du téléchargement de la vidéo :", _0x4b5825);
    _0x5c3d34("Erreur lors du téléchargement de la vidéo.", _0x4b5825);
  }
});
